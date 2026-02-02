import { NextRequest } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { FAQ_SYSTEM_PROMPT } from '@/lib/constants/faq-system-prompt';
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit';
import { chatMessageSchema, validateData } from '@/lib/validation';
import { checkPromptInjection, wrapUserMessage } from '@/lib/prompt-security';
import { logError, logWarn } from '@/lib/logger';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting (20 requests per minute per IP)
    const rateLimit = checkRateLimit(request, RATE_LIMITS.chat);
    if (!rateLimit.success) {
      return rateLimit.error;
    }

    const body = await request.json();

    // Validate message using Zod schema
    const validation = validateData(chatMessageSchema, body);
    if (!validation.success) {
      return new Response(
        JSON.stringify({ error: 'Validation failed', details: validation.errors }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const { message } = validation.data;

    // Check for prompt injection attempts
    const securityCheck = checkPromptInjection(message);
    if (securityCheck.blocked) {
      logWarn('Blocked chat request due to prompt injection attempt');
      return new Response(
        JSON.stringify({
          error: 'Your message could not be processed. Please rephrase your question.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Use sanitized message with boundary wrapper
    const safeMessage = wrapUserMessage(securityCheck.sanitized);

    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      logError('ANTHROPIC_API_KEY environment variable is not configured');
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
                content: safeMessage,
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
          logError(
            'Error streaming from Claude API',
            {},
            error instanceof Error ? error : new Error('Unknown error')
          );
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
    logError(
      'Error processing chat request',
      {},
      error instanceof Error ? error : new Error('Unknown error')
    );
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
