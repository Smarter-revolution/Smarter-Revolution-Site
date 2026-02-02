import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { FAQ_SYSTEM_PROMPT } from '@/lib/constants/faq-system-prompt';
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Maximum message length to prevent abuse
const MAX_MESSAGE_LENGTH = 2000;

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting (20 requests per minute per IP)
    const rateLimit = checkRateLimit(request, RATE_LIMITS.chat);
    if (!rateLimit.success) {
      return rateLimit.error;
    }

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

    // Validate message length to prevent token abuse
    if (message.length > MAX_MESSAGE_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Message must be ${MAX_MESSAGE_LENGTH} characters or less` }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY environment variable is not configured');
      return new Response(
        JSON.stringify({ error: 'Chat service is not configured' }),
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
            if (chunk.type === 'content_block_delta' && 'text' in chunk.delta) {
              const text = chunk.delta.text;
              if (text) {
                controller.enqueue(new TextEncoder().encode(text));
              }
            }
          }

          controller.close();
        } catch (error) {
          // Log error without exposing API details
          console.error('Error streaming from Claude API:', error instanceof Error ? error.message : 'Unknown error');
          controller.enqueue(
            new TextEncoder().encode(
              JSON.stringify({ error: 'An error occurred while processing your request' })
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
        'Connection': 'keep-alive',
        'X-RateLimit-Limit': String(RATE_LIMITS.chat.limit),
        'X-RateLimit-Remaining': String(rateLimit.remaining),
      },
    });
  } catch (error) {
    console.error('Error processing chat request:', error instanceof Error ? error.message : 'Unknown error');
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
