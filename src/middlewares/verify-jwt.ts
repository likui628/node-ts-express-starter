import { NextFunction, Request, Response } from 'express'
import passport from 'passport'

const verifyCallback =
  (req: Request, res: Response, next: NextFunction) =>
  async (err: unknown, user: Express.User | null) => {
    if (err) {
      res.jsonFail(500, 'An error occurred', err)
      return
    }
    if (!user) {
      res.jsonFail(401, 'Unauthorized')
      return
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
