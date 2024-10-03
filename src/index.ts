import app from './app'
import env from './config/env'
import { logger } from './config/logger'

const port = env.PORT || 5000
app.listen(port, () => {
  logger.info(`Listening to port ${port}`)
})

import { Role, User } from '@prisma/client'

declare module 'express-serve-static-core' {
  interface CustomUser extends Express.User {
    id?: User['id']
    username?: User['name']
    role?: Role
  }
  interface Request {
    user?: CustomUser
  }

  interface Response {
    jsonSuccess: <T>(data: T, statusCode?: number, message?: string) => void
    jsonFail: (code: number, message?: string) => void
  }
}
