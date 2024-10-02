import { Request, Response } from 'express'
import { successResponse } from '../utils'
import { userService } from '../services'

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.queryUsers({ ...req.query })
  successResponse(res, users)
}
