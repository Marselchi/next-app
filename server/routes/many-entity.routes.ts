import { validateBody } from "@/middleware/validate-body"
import { validateQuery } from "@/middleware/validate-query"
import {
  createManyEntityDto,
  updateManyEntityDto,
} from "@/types/dto/many-entity.dto"
import { paginationDto } from "@/types/dto/pagination.dto"
import { asyncHandler } from "@/utils/async-handler"
import { Router } from "express"
import { ManyEntityController } from "../controller/many-entity.controller"

const router = Router()

router.post(
  "/",
  validateBody(createManyEntityDto),
  asyncHandler(ManyEntityController.create)
)

router.get(
  "/",
  validateQuery(paginationDto),
  asyncHandler(ManyEntityController.findAll)
)

router.get("/:id", asyncHandler(ManyEntityController.findById))

router.patch(
  "/:id",
  validateBody(updateManyEntityDto),
  asyncHandler(ManyEntityController.update)
)

router.delete("/:id", asyncHandler(ManyEntityController.delete))

export default router
