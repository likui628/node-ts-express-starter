import { ZodError, ZodSchema } from 'zod'
import { NextFunction, Request, Response } from 'express'
import { errorResponse } from '../utils'
import { logger } from '../config/logger'

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedRequest = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      })
      const { params, query, body } = validatedRequest
      Object.assign(req, { params, query, body })
      next()
    } catch (err: unknown) {
      if (err instanceof ZodError) {
        logger.error(`Validation Errors: ${JSON.stringify(err.issues)}`)
      }
      errorResponse(res, err, 400, 'Validation Error')
    }
  }
}
