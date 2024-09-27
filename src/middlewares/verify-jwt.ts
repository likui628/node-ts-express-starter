import { NextFunction, Request, Response } from 'express'
import passport from 'passport'
import { errorResponse } from '../utils'

const verifyCallback =
  (req: Request, res: Response, next: NextFunction) =>
  async (err: unknown, user: Express.User | null) => {
    if (err) {
      return errorResponse(res, err, 500, 'Unauthorized')
    }
    if (!user) {
      return errorResponse(res, err, 401, 'Unauthorized')
    }
    req.user = user
    next()
  }

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'jwt',
    { session: false },
    verifyCallback(req, res, next),
  )(req, res, next)
}
