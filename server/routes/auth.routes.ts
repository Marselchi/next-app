import { Router } from "express"

import { asyncHandler } from "@/utils/async-handler"

import { validateBody } from "@/middleware/validate-body"
import { signUpDto, signInDto } from "@/types/dto/auth.dto"
import { AuthController } from "../controller/auth.controller"

const router = Router()

router.post(
  "/sign-up",
  validateBody(signUpDto),
  asyncHandler(AuthController.signUp)
)

router.post(
  "/sign-in",
  validateBody(signInDto),
  asyncHandler(AuthController.signIn)
)

router.post("/sign-out", asyncHandler(AuthController.signOut))

export default router
