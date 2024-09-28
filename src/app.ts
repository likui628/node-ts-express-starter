import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'
import passport from 'passport'
import cookieParser from 'cookie-parser'

import routes from './routes/v1'
import { errorHandler, notFound } from './middlewares'
import { jwtStrategy } from './config/passport'

dotenv.config()

const app = express()

app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/v1', routes)

app.use(notFound)
app.use(errorHandler)

export default app
