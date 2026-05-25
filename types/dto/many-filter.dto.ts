import { z } from "zod"

export const createManyFilterDto = z.object({
  name: z.string().min(1),
})

export const updateManyFilterDto = createManyFilterDto.partial()

export type CreateManyFilterDto = z.infer<typeof createManyFilterDto>

export type UpdateManyFilterDto = z.infer<typeof updateManyFilterDto>
