import { ZodSchema } from 'zod'
import { NextFunction, Request, Response } from 'express'
import { errorResponse } from '../utils'

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (err: unknown) {
      errorResponse(res, err, 400, 'Validation Error')
    }
  }
}
