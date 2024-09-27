import { Role } from '@prisma/client'

declare global {
  namespace Express {
    interface Request {
      roles?: Role[]
    }
  }
}
