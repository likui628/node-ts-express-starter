import { z } from 'zod'
import { password } from './common'

export const userRegisterSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password,
    name: z.string(),
  }),
})

export const userLoginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
})
