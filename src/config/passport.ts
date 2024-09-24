import passport from 'passport'
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt'
import { Request, Response, NextFunction } from 'express'

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret',
}

passport.use(
  new JwtStrategy(options, (jwtPayload, done) => {
    console.log(jwtPayload)
    try {
      const user = { id: jwtPayload.sub, username: jwtPayload.username }
      return done(null, user)
    } catch (error) {
      return done(error, false)
    }
  }),
)

export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: unknown, user: Express.User | null) => {
      if (err) {
        return res
          .status(500)
          .json({ message: 'An error occurred during authentication' })
      }
      if (!user) {
        // 当用户不存在时处理无效令牌
        return res.status(401).json({ message: 'Unauthorized' })
      }
      req.user = user
      next()
    },
  )(req, res, next)
}

export default passport
