import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'
import passport from 'passport'
import cookieParser from 'cookie-parser'

import routes from './routes/v1'
import {
  rateLimiter,
  errorHandler,
  notFound,
  responseMiddleware,
} from './middlewares'
import { jwtStrategy } from './config/passport'
import morgan from './config/morgan'

dotenv.config()

const app = express()

app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

app.use(morgan.successHandler)
app.use(morgan.errorHandler)

app.use(helmet())
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use(responseMiddleware)

if (process.env.NODE_ENV === 'production') {
  app.use('/v1/auth', rateLimiter)
  app.use('/v1/users', rateLimiter)
}
app.use('/v1', routes)

app.use(notFound)
app.use(errorHandler)

export default app
