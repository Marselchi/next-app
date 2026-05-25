import type { Request, Response } from "express"
import { successResponse } from "@/utils/api-response"
import { UserItemService } from "../service/user-item.service"

export class UserItemController {
  static async create(req: Request, res: Response) {
    const result = await UserItemService.create(req.body)

    return res.status(201).json(successResponse(result, "Entity created"))
  }

  static async findAll(req: Request, res: Response) {
    const result = await UserItemService.findAll(req.query as unknown as string)
    return res.json(successResponse(result))
  }

  static async findById(req: Request, res: Response) {
    const result = await UserItemService.findById(Number(req.params.id))
    return res.json(successResponse(result))
  }

  static async update(req: Request, res: Response) {
    const result = await UserItemService.update(Number(req.params.id), req.body)

    return res.json(successResponse(result, "Entity updated"))
  }

  static async delete(req: Request, res: Response) {
    await UserItemService.delete(Number(req.params.id))

    return res.json(successResponse(null, "Entity deleted"))
  }
}
