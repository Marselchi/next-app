import { ApiQuery } from "@/types/api-response"
import { api } from "../api-client"

export function createApi<TEntity, TCreate, TUpdate, TDetail = TEntity>(
  endpoint: string
) {
  return {
    getAll: (params?: ApiQuery) =>
      api.get<{
        items: TEntity[]
        meta: unknown
      }>(endpoint, params),

    getById: (id: number | string) => api.get<TDetail>(`${endpoint}/${id}`),

    create: (body: TCreate) => api.post<TEntity>(endpoint, body),

    update: (id: number | string, body: TUpdate) =>
      api.patch<TEntity>(`${endpoint}/${id}`, body),

    delete: (id: number | string) => api.delete<void>(`${endpoint}/${id}`),
  }
}
