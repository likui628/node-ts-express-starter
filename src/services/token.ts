import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import config from '../config/config'

export const generateAuthTokens = (user: User) => {
  const payload = { id: user.id, username: user.name }
  const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' })

  const refreshToken = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '7d' })
  return { token, refreshToken }
}
