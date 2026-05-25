import { z, flattenError } from "zod"
import { NextFunction, Request, Response } from "express"

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  console.error(error)

  if (error instanceof z.ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: flattenError(error),
    })
  }

  if (error instanceof Error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    })
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  })
}
