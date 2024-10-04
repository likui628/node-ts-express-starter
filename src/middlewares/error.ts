import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export function notFound(req: Request, res: Response, _next: NextFunction) {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.jsonFail(404, 'Not Found', error)
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  let errorMessage
  if (err instanceof ZodError) {
    errorMessage = err.errors
      .map((e) => ({
        path: e.path,
        message: e.message,
      }))
      .join('')
  } else if (err instanceof Error) {
    errorMessage = err.message
  }
  res.jsonFail(500, errorMessage || 'Unhandled error', err)
}
