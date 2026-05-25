import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/api-response"

export function successResponse<T>(
  data: T,
  message?: string
): ApiSuccessResponse<T> {
  return {
    success: true,
    data,
    message,
  }
}

export function errorResponse(
  message: string,
  errors?: unknown
): ApiErrorResponse {
  return {
    success: false,
    message,
    errors,
  }
}
