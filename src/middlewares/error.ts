import { NextFunction, Request, Response } from 'express'
import ErrorResponse from '../interfaces/error-response'
import { errorResponse } from '../utils'

export function notFound(req: Request, res: Response, _next: NextFunction) {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  return errorResponse(res, error, 404, 'Not Found')
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction,
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500
  return errorResponse(res, err.message, statusCode, 'Unhandled error')
}
