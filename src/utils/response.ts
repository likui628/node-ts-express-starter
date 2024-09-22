import { Response } from 'express'
import { ZodError } from 'zod'

export function successResponse<T>(
  res: Response,
  data: T,
  statusCode = 200,
  message = 'Success',
) {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data,
  })
}

export function errorResponse(
  res: Response,
  error: unknown,
  statusCode = 500,
  message = 'Error',
) {
  let errorMessage

  if (error instanceof ZodError) {
    errorMessage = error.errors.map((e) => ({
      path: e.path,
      message: e.message,
    }))
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else {
    errorMessage = error
  }

  return res.status(statusCode).json({
    status: 'error',
    message,
    error: errorMessage,
  })
}
