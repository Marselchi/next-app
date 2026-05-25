import { z } from "zod"

export const createUserItemDto = z.object({
  name: z.string().min(1),
  userId: z.string(),
  filterIds: z.array(z.number()).optional(),
})

export const updateUserItemDto = createUserItemDto.partial()

export type CreateUserItemDto = z.infer<typeof createUserItemDto>

export type UpdateUserItemDto = z.infer<typeof updateUserItemDto>
