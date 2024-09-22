import { z } from 'zod'

export const userRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
})

export const userLoginSchema = userRegisterSchema.pick({
  email: true,
  password: true,
})
