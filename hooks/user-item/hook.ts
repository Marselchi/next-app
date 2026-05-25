import { ManyFilter, User, UserItem } from "@/generated/prisma/client"
import { createApi } from "@/lib/crud/create-api"
import { createCrudHooks } from "@/lib/crud/create-hooks"
import { CreateUserItemDto, UpdateUserItemDto } from "@/types/dto/user-item.dto"

type UserItemDetail = UserItem & {
  user: User
  filters: ManyFilter[]
}

const apiLocal = createApi<
  UserItem,
  CreateUserItemDto,
  UpdateUserItemDto,
  UserItemDetail
>("/user-item")

export const userItem = createCrudHooks("user-item", apiLocal)
