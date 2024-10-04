import { NextFunction, Request, Response } from 'express'
import { roleRights } from '../config/roles'

export const verifyRoles = (...requiredRights: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (requiredRights.length) {
      const userRole = req.user?.role
      if (!userRole) {
        res.jsonFail(403, 'Forbidden')
        return
      }
      const userRights = roleRights.get(userRole) || []
      const hasRequiredRights = requiredRights.every((r) =>
        userRights.includes(r),
      )
      if (!hasRequiredRights) {
        res.jsonFail(403, 'Forbidden')
      }
    }
    next()
  }
}
