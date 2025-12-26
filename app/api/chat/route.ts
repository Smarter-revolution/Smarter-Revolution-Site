import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { FAQ_SYSTEM_PROMPT } from '@/lib/constants/faq-system-prompt';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    // Validate message
    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Message is required and must be a string' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'Anthropic API key is not configured' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Create a streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const messageStream = await anthropic.messages.create({
            model: 'claude-3-haiku-20240307',
            max_tokens: 500,
            system: FAQ_SYSTEM_PROMPT,
            messages: [
              {
                role: 'user',
                content: message,
              },
            ],
            stream: true,
          });

          // Process the stream
          for await (const chunk of messageStream) {
            if (chunk.type === 'content_block_delta') {
              const text = chunk.delta.text;
              if (text) {
                controller.enqueue(new TextEncoder().encode(text));
              }
            }
          }

          controller.close();
        } catch (error) {
          console.error('Error streaming from Claude API:', error);
          const errorMessage =
            error instanceof Error ? error.message : 'Unknown error occurred';
          controller.enqueue(
            new TextEncoder().encode(
              JSON.stringify({ error: `Claude API error: ${errorMessage}` })
            )
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error processing chat request:', error);
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : 'Failed to process chat request',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

