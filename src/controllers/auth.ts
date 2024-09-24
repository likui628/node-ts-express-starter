import { Request, Response } from 'express'
import { asyncHandler, successResponse } from '../utils'
import { userService, authService, tokenService } from '../services'
import { User } from '@prisma/client'

function handleTokens(user: User, res: Response) {
  const { token, refreshToken } = tokenService.generateAuthTokens(user)

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
  })
  return token
}

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body)
  const token = handleTokens(user, res)

  successResponse(res, { ...user, password: undefined, token }, 201)
})

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await authService.loginUserWithEmailAndPassword(email, password)
  const token = handleTokens(user, res)

  successResponse(res, { ...user, password: undefined, token }, 200)
})
