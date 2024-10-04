import { NextFunction, Request, Response } from 'express'

export const responseMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.jsonSuccess = <T>(data: T, code = 200, message = 'Success'): void => {
    res.status(code)
    res.json({
      code,
      message,
      data,
    })
  }

  res.jsonFail = (
    code,
    message = 'An error occurred',
    error?: unknown,
  ): void => {
    res.status(code)
    res.json({
      code,
      message,
      error,
    })
  }

  next()
}
