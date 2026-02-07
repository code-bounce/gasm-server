/**
 * Generic error response structure
 */
export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    statusCode: number;
  };
}

/**
 * Generic success response structure
 */
export interface SuccessResponse<T> {
  success: true;
  data: T;
}

/**
 * Create a standardized error response
 */
export function createErrorResponse(
  message: string,
  statusCode: number = 500,
  code?: string,
): ErrorResponse {
  return {
    success: false,
    error: {
      message,
      code,
      statusCode,
    },
  };
}

/**
 * Create a standardized success response
 */
export function createSuccessResponse<T>(data: T): SuccessResponse<T> {
  return {
    success: true,
    data,
  };
}
