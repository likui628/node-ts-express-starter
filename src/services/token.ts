import { TokenType, User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import env from '../config/env'
import { prisma } from '../utils'
import { getTokenExpiration } from '../utils/misc'

export const saveToken = async (
  token: string,
  userId: User['id'],
  expires: Date,
  type: TokenType = TokenType.REFRESH,
) => {
  const newToken = await prisma.token.create({
    data: {
      userId,
      token,
      type,
      expires,
    },
  })
  return newToken
}

export const generateAuthTokens = async (user: User) => {
  const payload = { id: user.id, username: user.name, role: user.role }
  const token = jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  })

  const refreshToken = jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  })
  await saveToken(
    refreshToken,
    user.id,
    getTokenExpiration(7, 'days'),
    TokenType.REFRESH,
  )

  return { token, refreshToken }
}
