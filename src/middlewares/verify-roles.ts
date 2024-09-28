import { NextFunction, Request, Response } from 'express'
import { Role } from '@prisma/client'
import { errorResponse } from '../utils'
import { roleRights } from '../config/roles'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      role?: Role
    }
  }
}

export const verifyRoles = (...requiredRights: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (requiredRights.length) {
      const userRole = req.user?.role
      if (!userRole) {
        return errorResponse(res, null, 403, 'Forbidden')
      }
      const userRights = roleRights.get(userRole) || []
      const hasRequiredRights = requiredRights.every((r) =>
        userRights.includes(r),
      )
      if (!hasRequiredRights) {
        return errorResponse(res, null, 403, 'Forbidden')
      }
    }
    next()
  }
}
