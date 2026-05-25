import { validateBody } from "@/middleware/validate-body"
import { validateQuery } from "@/middleware/validate-query"
import { paginationDto } from "@/types/dto/pagination.dto"
import { asyncHandler } from "@/utils/async-handler"
import { Router } from "express"
import { ManyFilterController } from "../controller/many-filter.controller"
import {
  createManyFilterDto,
  updateManyFilterDto,
} from "@/types/dto/many-filter.dto"

const router = Router()

router.post(
  "/",
  validateBody(createManyFilterDto),
  asyncHandler(ManyFilterController.create)
)

router.get(
  "/",
  validateQuery(paginationDto),
  asyncHandler(ManyFilterController.findAll)
)

router.get("/:id", asyncHandler(ManyFilterController.findById))

router.patch(
  "/:id",
  validateBody(updateManyFilterDto),
  asyncHandler(ManyFilterController.update)
)

router.delete("/:id", asyncHandler(ManyFilterController.delete))

export default router
