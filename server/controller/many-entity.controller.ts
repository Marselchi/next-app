import type { Request, Response } from "express"
import { successResponse } from "@/utils/api-response"
import { ManyEntityService } from "../service/many-entity.service"
import { paginationDto } from "@/types/dto/pagination.dto"

export class ManyEntityController {
  static async create(req: Request, res: Response) {
    const result = await ManyEntityService.create(req.body)

    return res.status(201).json(successResponse(result, "Entity created"))
  }

  static async findAll(req: Request, res: Response) {
    const query = paginationDto.parse(req.query)
    const result = await ManyEntityService.findAll(query)
    return res.json(successResponse(result))
  }

  static async findById(req: Request, res: Response) {
    const result = await ManyEntityService.findById(Number(req.params.id))
    return res.json(successResponse(result))
  }

  static async update(req: Request, res: Response) {
    const result = await ManyEntityService.update(
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
