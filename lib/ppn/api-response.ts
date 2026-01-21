import { NextResponse } from 'next/server';

export interface ApiSuccessResponse {
  ok: true;
  event_id?: string;
  received_at?: string;
  data?: unknown;
}

export interface ApiErrorResponse {
  ok: false;
  error: {
    code: string;
    message: string;
  };
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

// Error codes
export const ErrorCodes = {
  INVALID_SIGNATURE: 'INVALID_SIGNATURE',
  REPLAY_DETECTED: 'REPLAY_DETECTED',
  MISSING_HEADER: 'MISSING_HEADER',
  PRODUCT_NOT_FOUND: 'PRODUCT_NOT_FOUND',
  PRODUCT_INACTIVE: 'PRODUCT_INACTIVE',
  PARTNER_NOT_FOUND: 'PARTNER_NOT_FOUND',
  PARTNER_NOT_APPROVED: 'PARTNER_NOT_APPROVED',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  EVENT_DUPLICATE: 'EVENT_DUPLICATE',
  RATE_LIMITED: 'RATE_LIMITED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  BAD_REQUEST: 'BAD_REQUEST',
  COMMISSION_ERROR: 'COMMISSION_ERROR',
  PAYOUT_ERROR: 'PAYOUT_ERROR',
} as const;

export function successResponse(
  data?: unknown,
  eventId?: string,
  status = 200
): NextResponse<ApiSuccessResponse> {
  const response: ApiSuccessResponse = {
    ok: true,
    received_at: new Date().toISOString(),
  };

  if (eventId) {
    response.event_id = eventId;
  }

  if (data !== undefined) {
    response.data = data;
  }

  return NextResponse.json(response, { status });
}

export function errorResponse(
  code: string,
  message: string,
  status = 400
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      ok: false,
      error: { code, message },
    },
    { status }
  );
}

export function validationError(message: string): NextResponse<ApiErrorResponse> {
  return errorResponse(ErrorCodes.VALIDATION_ERROR, message, 400);
}

export function unauthorizedError(message = 'Unauthorized'): NextResponse<ApiErrorResponse> {
  return errorResponse(ErrorCodes.UNAUTHORIZED, message, 401);
}

export function forbiddenError(message = 'Forbidden'): NextResponse<ApiErrorResponse> {
  return errorResponse(ErrorCodes.FORBIDDEN, message, 403);
}

export function notFoundError(message = 'Not found'): NextResponse<ApiErrorResponse> {
  return errorResponse(ErrorCodes.NOT_FOUND, message, 404);
}

export function internalError(message = 'Internal server error'): NextResponse<ApiErrorResponse> {
  return errorResponse(ErrorCodes.INTERNAL_ERROR, message, 500);
}

export function rateLimitedError(): NextResponse<ApiErrorResponse> {
  return errorResponse(
    ErrorCodes.RATE_LIMITED,
    'Rate limit exceeded. Please try again later.',
    429
  );
}

export function duplicateEventResponse(eventId: string): NextResponse<ApiSuccessResponse> {
  return NextResponse.json(
    {
      ok: true,
      event_id: eventId,
      received_at: new Date().toISOString(),
      data: { duplicate: true },
    },
    { status: 200 }
  );
}
