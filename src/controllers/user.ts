import { Request, Response } from 'express'
import { asyncHandler } from '../utils'
import { userService } from '../services'

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.queryUsers({ ...req.query })
  res.jsonSuccess(users, 200)
})

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const newUser = req.body
  const existingUser = await userService.getUserByEmail(newUser.email)
  if (existingUser) {
    res.jsonFail(409, 'User already exists')
    return
  }
  const user = await userService.createUser(newUser)
  res.jsonSuccess(user, 201)
})

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.userId)
  if (!user) {
    res.jsonFail(404, 'User not found')
    return
  }
  res.jsonSuccess(user, 200)
})

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params

  const existingUser = await userService.getUserById(userId)
  if (!existingUser) {
    res.jsonFail(404, 'User not found')
    return
  }
  await userService.deleteUserById(userId)
  res.jsonSuccess(undefined, 200, 'Delete the user successfully')
})

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params

  const existingUser = await userService.getUserById(userId)
  if (!existingUser) {
    res.jsonFail(404, 'User not found')
    return
  }
  const user = await userService.updateUser(userId, req.body)
  res.jsonSuccess(user)
})
