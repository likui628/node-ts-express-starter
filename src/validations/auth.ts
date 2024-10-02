import { z } from 'zod'
import { name, password, email } from './common'

export const userRegisterSchema = z.object({
  body: z.object({
    email,
    password,
    name,
  }),
})

export const userLoginSchema = z.object({
  body: z.object({
    email,
    password,
  }),
})
