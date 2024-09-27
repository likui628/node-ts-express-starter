import { NextFunction, Request, Response } from 'express'
import { Role } from '@prisma/client'
import { errorResponse } from '../utils'

export const verifyRoles = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req?.roles) {
      return errorResponse(res, null, 401, 'Unauthorized')
    }
    const rolesArray = [...allowedRoles]
    const hasRole = req.roles.some((role) => rolesArray.includes(role))
    if (!hasRole) {
      return errorResponse(res, null, 403, 'Forbidden')
    }
    next()
  }
}
