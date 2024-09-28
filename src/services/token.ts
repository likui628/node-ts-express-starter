import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import env from '../config/env'

export const generateAuthTokens = (user: User) => {
  const payload = { id: user.id, username: user.name, role: user.role }
  const token = jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  })

  const refreshToken = jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  })
  return { token, refreshToken }
}
