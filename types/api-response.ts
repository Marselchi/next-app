import { PaginationDto } from "./dto/pagination.dto"

export type ApiSuccessResponse<T> = {
  success: true
  data: T
  message?: string
}

export type ApiErrorResponse = {
  success: false
  message: string
  errors?: unknown
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse

export type QueryParams<TFilters = object> = {
  pagination?: PaginationDto
  filters?: TFilters
}

export type ApiQuery = Record<
  string,
  string | number | boolean | Array<string | number> | undefined
>
