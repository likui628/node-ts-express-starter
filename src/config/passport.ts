import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt'
import { prisma } from '../utils'
import env from './env'

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.ACCESS_TOKEN_SECRET,
}

export const jwtStrategy = new JwtStrategy(
  options,
  async (jwtPayload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: jwtPayload.id },
      })
      if (!user) {
        throw new Error('User not found')
      }
      return done(null, user)
    } catch (error) {
      return done(error, false)
    }
  },
)
