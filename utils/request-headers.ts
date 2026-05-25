import type { Request } from "express"

export function getRequestHeaders(req: Request): Headers {
  const headers = new Headers()

  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === "string") {
      headers.set(key, value)
    }

    if (Array.isArray(value)) {
      headers.set(key, value.join(","))
    }
  }

  return headers
}
