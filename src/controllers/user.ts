import { Request, Response } from 'express'
import { asyncHandler, errorResponse, successResponse } from '../utils'
import { userService } from '../services'

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.queryUsers({ ...req.query })
  successResponse(res, users)
})

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const newUser = req.body
  const existingUser = await userService.getUserByEmail(newUser.email)
  if (existingUser) {
    return errorResponse(res, 'User already exists', 409)
  }
  const user = await userService.createUser(newUser)
  successResponse(res, user, 201)
})

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.getUserById(req.params.userId)
  successResponse(res, users)
})

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.deleteUserById(req.params.userId)
  successResponse(res, users)
})