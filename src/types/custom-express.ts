import { Role } from '@prisma/client'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      id: string
      username: string
      role: Role
    }

    interface Request {
      user?: User
    }

    interface Response {
      jsonSuccess<T>(data: T, code?: number, message?: string): void
      jsonFail(code: number, message?: string, error?: unknown): void
    }
  }
}
