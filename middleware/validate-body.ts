import { flattenError, z } from "zod"
import { NextFunction, Request, Response } from "express"

export function validateBody(schema: z.ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: flattenError(result.error),
      })
    }

    next()
  }
}
