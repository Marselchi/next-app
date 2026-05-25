import { z } from "zod"

export const paginationDto = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  before: z.date().optional,
  after: z.date().optional,
  order: z.enum(["asc", "desc"]).default("desc"),
})

export type PaginationDto = z.infer<typeof paginationDto>
