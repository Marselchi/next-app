import type { Request, Response } from "express"

import { successResponse } from "@/utils/api-response"
import { AuthService } from "../service/auth.service"

export class AuthController {
  static async signUp(req: Request, res: Response) {
    const result = await AuthService.signUp(req.body, req)

    return res.status(201).json(successResponse(result, "User created"))
  }

  static async signIn(req: Request, res: Response) {
    const result = await AuthService.signIn(req.body, req)

    return res.status(200).json(successResponse(result, "Signed in"))
  }

  static async signOut(req: Request, res: Response) {
    await AuthService.signOut(req)

    return res.status(200).json(successResponse(null, "Signed out"))
  }
}
