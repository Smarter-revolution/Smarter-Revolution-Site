/**
 * Secure logging system with PII redaction and structured logging
 *
 * SECURITY FEATURES:
 * - PII redaction for sensitive data
 * - Log levels for different severity
 * - Request context tracking
 * - Production-safe error handling
 */

import { NextRequest } from 'next/server';

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

interface LogContext {
  requestId?: string;
  ip?: string;
  userAgent?: string;
  method?: string;
  path?: string;
  statusCode?: number;
  duration?: number;
  [key: string]: unknown;
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: LogContext;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

/**
 * Logger class with PII redaction
 */
class Logger {
  private static instance: Logger;
  private isProduction = process.env.NODE_ENV === 'production';
  private logLevel = process.env.LOG_LEVEL || (this.isProduction ? LogLevel.INFO : LogLevel.DEBUG);

  // PII patterns to redact
  private readonly piiPatterns = [
    { pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, replacement: '[REDACTED_EMAIL]' },
    { pattern: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, replacement: '[REDACTED_CARD]' },
    { pattern: /\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/g, replacement: '[REDACTED_SSN]' },
    { pattern: /Bearer\s+[A-Za-z0-9\-._~+\/]+=*/g, replacement: 'Bearer [REDACTED_TOKEN]' },
    { pattern: /sk-[A-Za-z0-9]+/g, replacement: '[REDACTED_API_KEY]' },
    { pattern: /ghp_[A-Za-z0-9]+/g, replacement: '[REDACTED_GITHUB_TOKEN]' },
    { pattern: /cal_live_[A-Za-z0-9]+/g, replacement: '[REDACTED_CAL_KEY]' },
  ];

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Redact PII from log data
   */
  private redactPII(data: string): string {
    let redacted = data;
    for (const { pattern, replacement } of this.piiPatterns) {
      redacted = redacted.replace(pattern, replacement);
    }
    return redacted;
  }

  /**
   * Redact PII from objects recursively
   */
  private redactObject(obj: unknown): unknown {
    if (typeof obj === 'string') {
      return this.redactPII(obj);
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.redactObject(item));
    }

    if (obj && typeof obj === 'object') {
      const redacted: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(obj)) {
        // Redact sensitive fields
        if (this.isSensitiveField(key)) {
          redacted[key] = '[REDACTED]';
        } else {
          redacted[key] = this.redactObject(value);
        }
      }
      return redacted;
    }

    return obj;
  }

  /**
   * Check if a field name suggests sensitive data
   */
  private isSensitiveField(fieldName: string): boolean {
    const sensitiveFields = [
      'password',
      'token',
      'secret',
      'apiKey',
      'authorization',
      'creditCard',
      'ssn',
      'socialSecurity',
    ];

    return sensitiveFields.some((field) =>
      fieldName.toLowerCase().includes(field.toLowerCase())
    );
  }

  /**
   * Generate request ID for tracking
   */
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Create log entry
   */
  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: Error
  ): LogEntry {
    const entry: LogEntry = {
      level,
      message: this.redactPII(message),
      timestamp: new Date().toISOString(),
      context: context ? (this.redactObject(context) as LogContext) : undefined,
    };

    if (error) {
      entry.error = {
        name: error.name,
        message: this.redactPII(error.message),
        stack: error.stack ? this.redactPII(error.stack) : undefined,
      };
    }

    return entry;
  }

  /**
   * Write log entry
   */
  private writeLog(entry: LogEntry): void {
    // Check log level
    const levels = [LogLevel.ERROR, LogLevel.WARN, LogLevel.INFO, LogLevel.DEBUG];
    const currentLevelIndex = levels.indexOf(this.logLevel as LogLevel);
    const entryLevelIndex = levels.indexOf(entry.level);

    if (entryLevelIndex > currentLevelIndex && this.isProduction) {
      return;
    }

    // Format for console output
    const logOutput = {
      ...entry,
      service: 'smarter-revolution-api',
    };

    // Use appropriate console method
    switch (entry.level) {
      case LogLevel.ERROR:
        console.error(JSON.stringify(logOutput));
        break;
      case LogLevel.WARN:
        console.warn(JSON.stringify(logOutput));
        break;
      case LogLevel.INFO:
        console.info(JSON.stringify(logOutput));
        break;
      case LogLevel.DEBUG:
        console.debug(JSON.stringify(logOutput));
        break;
      default:
        console.log(JSON.stringify(logOutput));
    }
  }

  /**
   * Public logging methods
   */
  public error(message: string, context?: LogContext, error?: Error): void {
    this.writeLog(this.createLogEntry(LogLevel.ERROR, message, context, error));
  }

  public warn(message: string, context?: LogContext): void {
    this.writeLog(this.createLogEntry(LogLevel.WARN, message, context));
  }

  public info(message: string, context?: LogContext): void {
    this.writeLog(this.createLogEntry(LogLevel.INFO, message, context));
  }

  public debug(message: string, context?: LogContext): void {
    this.writeLog(this.createLogEntry(LogLevel.DEBUG, message, context));
  }

  /**
   * Request-specific logging
   */
  public logRequest(request: NextRequest, requestId?: string): LogContext {
    const context: LogContext = {
      requestId: requestId || this.generateRequestId(),
      method: request.method,
      path: new URL(request.url).pathname,
      userAgent: request.headers.get('user-agent') || undefined,
    };

    // Extract IP from various headers
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const vercelIP = request.headers.get('x-vercel-forwarded-for');

    if (forwardedFor) {
      context.ip = forwardedFor.split(',')[0].trim();
    } else if (realIP) {
      context.ip = realIP;
    } else if (vercelIP) {
      context.ip = vercelIP.split(',')[0].trim();
    }

    this.info(`${request.method} ${context.path}`, {
      requestId: context.requestId,
      method: context.method,
      path: context.path,
    });

    return context;
  }

  public logResponse(requestId: string, statusCode: number, duration?: number): void {
    this.info('Request completed', {
      requestId,
      statusCode,
      duration,
    });
  }

  public logApiCall(endpoint: string, method: string, context?: LogContext): void {
    this.info(`API call: ${method} ${endpoint}`, {
      endpoint,
      method,
      ...context,
    });
  }
}

// Export singleton instance
export const logger = Logger.getInstance();

// Export convenience functions
export const logError = (message: string, context?: LogContext, error?: Error) =>
  logger.error(message, context, error);

export const logWarn = (message: string, context?: LogContext) =>
  logger.warn(message, context);

export const logInfo = (message: string, context?: LogContext) =>
  logger.info(message, context);

export const logDebug = (message: string, context?: LogContext) =>
  logger.debug(message, context);

export const logRequest = (request: NextRequest, requestId?: string) =>
  logger.logRequest(request, requestId);

export const logResponse = (requestId: string, statusCode: number, duration?: number) =>
  logger.logResponse(requestId, statusCode, duration);

export const logApiCall = (endpoint: string, method: string, context?: LogContext) =>
  logger.logApiCall(endpoint, method, context);
