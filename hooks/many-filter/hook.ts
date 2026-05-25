import { ManyFilter } from "@/generated/prisma/client"
import { createApi } from "@/lib/crud/create-api"
import { createCrudHooks } from "@/lib/crud/create-hooks"
import {
  CreateManyFilterDto,
  UpdateManyFilterDto,
} from "@/types/dto/many-filter.dto"

const apiLocal = createApi<
  ManyFilter,
  CreateManyFilterDto,
  UpdateManyFilterDto
>("/many-filters")

export const manyFilter = createCrudHooks("many-filters", apiLocal)
