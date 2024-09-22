import { Request, Response } from 'express'
import { asyncHandler, successResponse } from '../utils'
import { userService } from '../services'

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body)
  successResponse(res, user, 201)
})
