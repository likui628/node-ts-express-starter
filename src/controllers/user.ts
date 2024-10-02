import { Request, Response } from 'express'
import { asyncHandler, successResponse } from '../utils'
import { userService } from '../services'

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.queryUsers({ ...req.query })
  successResponse(res, users)
})

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const newUser = req.body
  const user = await userService.createUser(newUser)
  successResponse(res, user)
})
