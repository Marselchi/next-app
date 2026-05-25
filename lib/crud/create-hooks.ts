import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createApi } from "./create-api"
import { ApiQuery } from "@/types/api-response"

export function createCrudHooks<TEntity, TCreate, TUpdate, TDetail = TEntity>(
  key: string,
  api: ReturnType<typeof createApi<TEntity, TCreate, TUpdate, TDetail>>
) {
  function useList(params?: ApiQuery) {
    return useQuery({
      queryKey: [key, params],
      queryFn: () => api.getAll(params),
    })
  }

  function useDetail(id: number | string) {
    return useQuery<TDetail>({
      queryKey: [key, id],
      queryFn: () => api.getById(id),
      enabled: !!id,
    })
  }

  function useCreate() {
    const qc = useQueryClient()

    return useMutation({
      mutationFn: api.create,
      onSuccess: () =>
        qc.invalidateQueries({
          queryKey: [key],
        }),
    })
  }

  function useUpdate() {
    const qc = useQueryClient()

    return useMutation({
      mutationFn: ({ id, body }: { id: number | string; body: TUpdate }) =>
        api.update(id, body),

      onSuccess: () =>
        qc.invalidateQueries({
          queryKey: [key],
        }),
    })
  }

  function useDelete() {
    const qc = useQueryClient()

    return useMutation({
      mutationFn: api.delete,
      onSuccess: () =>
        qc.invalidateQueries({
          queryKey: [key],
        }),
    })
  }

  return {
    useList,
    useDetail,
    useCreate,
    useUpdate,
    useDelete,
  }
}
