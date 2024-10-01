import { Request, Response } from 'express'
import { asyncHandler, successResponse } from '../utils'
import { userService, authService, tokenService } from '../services'
import { User } from '@prisma/client'

async function handleTokens(user: User, res: Response) {
  const { token, refreshToken } = await tokenService.generateAuthTokens(user)

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
  })
  return token
}

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body)
  const token = await handleTokens(user, res)

  successResponse(res, { ...user, password: undefined, token }, 201)
})

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await authService.loginUserWithEmailAndPassword(email, password)
  const token = await handleTokens(user, res)

  successResponse(res, { ...user, password: undefined, token }, 200)
})

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const cookies = req.cookies
  if (!cookies?.refreshToken) {
    return successResponse(res, null, 200)
  }
  const refreshToken = cookies.refreshToken as string

  const foundToken = await tokenService.getTokenInfo(refreshToken)
  if (!foundToken) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
    return successResponse(res, null, 200)
  }

  await tokenService.deleteToken(refreshToken)
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })
  return successResponse(res, null, 200)
})
