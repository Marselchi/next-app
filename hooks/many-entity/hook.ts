import { ManyEntity, ManyFilter, User } from "@/generated/prisma/client"
import { createApi } from "@/lib/crud/create-api"
import { createCrudHooks } from "@/lib/crud/create-hooks"
import {
  CreateManyEntityDto,
  UpdateManyEntityDto,
} from "@/types/dto/many-entity.dto"

type ManyEntityDetail = ManyEntity & {
  users: User[]
  filters: ManyFilter[]
}

const apiLocal = createApi<
  ManyEntity,
  CreateManyEntityDto,
  UpdateManyEntityDto,
  ManyEntityDetail
>("/many-entities")

export const manyEntity = createCrudHooks("many-entities", apiLocal)
