import { authOptions } from "@/app/server/auth";
import NextAuth from "next-auth";
import { NextRequest } from "next/server";
import { loginSchema } from "@/app/validations/auth";
import { RateLimiter } from "@/lib/rate-limiter";
import { authConfig } from "@/config/auth.config";

// Initialize rate limiter
const rateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Security headers configuration
const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
};

// Create a reusable error response helper
const createErrorResponse = (message: string, status: number = 500, details?: any) => {
  return new Response(
    JSON.stringify({ 
      error: message,
      details,
      timestamp: new Date().toISOString()
    }),
    { 
      status,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
        ...securityHeaders
      }
    }
  );
};

// Create a reusable success response helper
const createSuccessResponse = (data: any, status: number = 200) => {
  return new Response(
    JSON.stringify({
      ...data,
      timestamp: new Date().toISOString()
    }),
    { 
      status,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, max-age=0',
        ...securityHeaders
      }
    }
  );
};

// Initialize NextAuth handler with custom error handling
const handler = NextAuth({
  ...authOptions,
  pages: {
    ...authOptions.pages,
    error: '/auth/error', // توجيه الأخطاء إلى صفحة الخطأ المخصصة
  },
  callbacks: {
    ...authOptions.callbacks,
    async redirect({ url, baseUrl }) {
      // التحقق من أن عنوان URL آمن
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },
});

// Middleware for rate limiting and security checks
async function withSecurityMiddleware(request: NextRequest, handler: Function) {
  try {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit
    const isRateLimited = await rateLimiter.check(ip);
    if (isRateLimited) {
      return createErrorResponse('Too many requests', 429);
    }

    // Validate request method
    if (!['GET', 'POST'].includes(request.method)) {
      return createErrorResponse('Method not allowed', 405);
    }

    // Check content type for POST requests
    if (request.method === 'POST') {
      const contentType = request.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        return createErrorResponse('Invalid content type', 415);
      }
    }

    return await handler(request);
  } catch (error) {
    console.error('Security Middleware Error:', error);
    return createErrorResponse(authConfig.messages.errors.default);
  }
}

export async function GET(request: NextRequest) {
  return withSecurityMiddleware(request, async (req: NextRequest) => {
    try {
      const response = await handler(req);
      
      // Add security headers
      Object.entries(securityHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });

      return response;
    } catch (error) {
      console.error('Auth GET Error:', error);
      if (error instanceof Error && error.message.includes('configuration')) {
        return createErrorResponse(
          authConfig.messages.errors.configuration,
          500,
          { error: error.message }
        );
      }
      return createErrorResponse(authConfig.messages.errors.default);
    }
  });
}

export async function POST(request: NextRequest) {
  return withSecurityMiddleware(request, async (req: NextRequest) => {
    try {
      // Validate request body
      const body = await req.json();
      const validationResult = loginSchema().safeParse(body);
      
      if (!validationResult.success) {
        return createErrorResponse(
          'Invalid request data',
          400,
          validationResult.error.format()
        );
      }

      // Process the request
      const response = await handler(req);
      
      // Add security headers
      Object.entries(securityHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
      
      return response;
    } catch (error) {
      console.error('Auth POST Error:', error);
      let errorMessage = authConfig.messages.errors.default;
      let errorDetails = {};

      if (error instanceof Error) {
        try {
          // Attempt to parse JSON error message from authorize callback
          const parsedError = JSON.parse(error.message);
          if (parsedError.validationError) {
            errorMessage = 'خطأ في التحقق من الصحة:'; // Placeholder, will refine in error page
            errorDetails = { validation: parsedError.validationError };
          } else if (parsedError.responseError) {
            errorMessage = parsedError.responseError; // Use the message from the login response
          } else if (error.message.includes('configuration')) {
             errorMessage = authConfig.messages.errors.configuration;
          } else {
            errorMessage = error.message;
          }
        } catch (parseError) {
          // If parsing fails, use the original error message or a default
           if (error.message.includes('configuration')) {
             errorMessage = authConfig.messages.errors.configuration;
          } else {
            errorMessage = error.message;
          }
        }
      }

      // Redirect to the error page with specific error details
      const errorUrl = new URL(`/auth/error`, request.url);
      errorUrl.searchParams.set('error', 'CredentialsSignin'); // Use a general error type
       if (errorMessage !== authConfig.messages.errors.default) {
           errorUrl.searchParams.set('message', errorMessage);
       }

      // Note: Passing complex objects like validation errors via URL params can be tricky.
      // For simplicity here, we pass the main message. A more robust solution might involve
      // storing error details server-side and passing an ID, or using client-side state.

      return new Response(null, {
        status: 302, // Found
        headers: { Location: errorUrl.toString() },
      });
    }
  });
}