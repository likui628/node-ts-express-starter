import { Request, Response } from 'express'
import { asyncHandler } from '../utils'
import { userService, authService, tokenService } from '../services'
import { User } from '@prisma/client'
import { UserData } from '../types'

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

  res.jsonSuccess<UserData>({ ...user, token }, 201)
})

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await authService.loginUserWithEmailAndPassword(email, password)
  const token = await handleTokens(user, res)

  res.jsonSuccess<UserData>({ ...user, token }, 200)
})

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const cookies = req.cookies
  if (!cookies?.refreshToken) {
    res.jsonSuccess(undefined, 200)
  }
  const refreshToken = cookies.refreshToken as string

  const foundToken = await tokenService.getTokenInfo(refreshToken)
  if (!foundToken) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
    res.jsonSuccess(undefined, 200)
  }

  await tokenService.deleteToken(refreshToken)
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })
  res.jsonSuccess(undefined, 200)
})

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const cookies = req.cookies
  if (!cookies?.refreshToken) {
    res.jsonFail(401, 'Unauthorized')
  }
  const refreshToken = cookies.refreshToken as string
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })

  const tokenInfo = await tokenService.verifyToken(refreshToken)
  if (!tokenInfo) {
    res.jsonFail(401, 'Unauthorized')
  }

  const user = await userService.getUserById(tokenInfo.userId)
  if (!user) {
    res.jsonFail(401, 'Unauthorized')
  }

  const token = await handleTokens(user!, res)
  res.jsonSuccess<string>(token, 200)
})
