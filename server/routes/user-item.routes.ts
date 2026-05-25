import { validateBody } from "@/middleware/validate-body"
import { validateQuery } from "@/middleware/validate-query"
import { paginationDto } from "@/types/dto/pagination.dto"
import { asyncHandler } from "@/utils/async-handler"
import { Router } from "express"
import { UserItemController } from "../controller/user-item.controller"
import { createUserItemDto, updateUserItemDto } from "@/types/dto/user-item.dto"

const router = Router()

router.post(
  "/",
  validateBody(createUserItemDto),
  asyncHandler(UserItemController.create)
)

router.get(
  "/",
  validateQuery(paginationDto),
  asyncHandler(UserItemController.findAll)
)

router.get("/:id", asyncHandler(UserItemController.findById))

router.patch(
  "/:id",
  validateBody(updateUserItemDto),
  asyncHandler(UserItemController.update)
)

router.delete("/:id", asyncHandler(UserItemController.delete))

export default router
