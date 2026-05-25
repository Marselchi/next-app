import type { ApiResponse, QueryParams } from "@/types/api-response"

const API_URL = process.env.NEXT_PUBLIC_API_URL

type RequestOptions = RequestInit & {
  auth?: boolean
}

function buildQuery(params?: QueryParams) {
  if (!params) return ""

  const search = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue

    if (Array.isArray(value)) {
      for (const v of value) {
        search.append(key, String(v))
      }
    } else {
      search.append(key, String(value))
    }
  }

  const str = search.toString()
  return str ? `?${str}` : ""
}

async function request<T>(
  endpoint: string,
  options?: RequestOptions & { params?: QueryParams }
): Promise<T> {
  const url = `${API_URL}${endpoint}` + buildQuery(options?.params)

  const response = await fetch(url, {
    ...options,

    credentials: "include",

    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  })

  const data: ApiResponse<T> = await response.json()

  if (!response.ok || !data.success) {
    throw new Error(data.message)
  }

  return data.data
}

export const api = {
  get: <T>(url: string, params?: QueryParams) => request<T>(url, { params }),

  post: <T>(url: string, body?: unknown) =>
    request<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(url: string, body?: unknown) =>
    request<T>(url, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  patch: <T>(url: string, body?: unknown) =>
    request<T>(url, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: <T>(url: string) =>
    request<T>(url, {
      method: "DELETE",
    }),
}
