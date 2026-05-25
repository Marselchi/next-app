import { z } from "zod"

export const createManyEntityDto = z.object({
  name: z.string().min(1),
  filterFieldDate: z.coerce.date(),
  userIds: z.array(z.string()),
})

export const updateManyEntityDto = createManyEntityDto.partial()

export type CreateManyEntityDto = z.infer<typeof createManyEntityDto>

export type UpdateManyEntityDto = z.infer<typeof updateManyEntityDto>
