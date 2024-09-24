import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'

import routes from './routes/v1'
import { errorHandler, notFound } from './middlewares'
import passport, { authenticateJwt } from './config/passport'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken';

dotenv.config()

const app = express()

app.use(passport.initialize())
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.use('/v1', routes)

app.get('/protected', authenticateJwt, (_req: Request, res: Response) => {
  res.json({ message: 'This is a protected route!' })
})

app.use(notFound)
app.use(errorHandler)



const user = { id: 1, username: 'testUser' }; // 假设这是从数据库中查找的用户
const token = jwt.sign({ sub: user.id, username: user.username }, 'your_jwt_secret', {
  expiresIn: '1h', // 设置令牌过期时间
});

console.log('Generated JWT:', token);

export default app
