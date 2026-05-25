import type { Request, Response } from "express"
import { successResponse } from "@/utils/api-response"
import { ManyEntityService } from "../service/many-entity.service"
import { ManyFilterService } from "../service/many-filter.service"

export class ManyFilterController {
  static async create(req: Request, res: Response) {
    const result = await ManyFilterService.create(req.body)

    return res.status(201).json(successResponse(result, "Entity created"))
  }

  static async findAll(req: Request, res: Response) {
    const result = await ManyFilterService.findAll()
    return res.json(successResponse(result))
  }

  static async findById(req: Request, res: Response) {
    const result = await ManyFilterService.findById(Number(req.params.id))
    return res.json(successResponse(result))
  }

  static async update(req: Request, res: Response) {
    const result = await ManyFilterService.update(
      Number(req.params.id),
      req.body
    )

    return res.json(successResponse(result, "Entity updated"))
  }

  static async delete(req: Request, res: Response) {
    await ManyEntityService.delete(Number(req.params.id))

    return res.json(successResponse(null, "Entity deleted"))
  }
}
