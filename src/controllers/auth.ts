import { Request, Response } from 'express'
import { asyncHandler, successResponse } from '../utils'
import { userService, authService } from '../services'

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body)
  successResponse(res, user, 201)
})

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await authService.loginUserWithEmailAndPassword(email, password)
  successResponse(res, user, 200)
})
