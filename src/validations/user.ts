import { z } from 'zod'
import { Role } from '@prisma/client'
import { paginationSchema } from './common'

export const getUsersSchema = z.object({
  query: z
    .object({
      name: z.string().optional(),
      role: z.enum([Role.ADMIN, Role.USER]).optional(),
    })
    .merge(paginationSchema),
})

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
    role: z.enum([Role.ADMIN, Role.USER]),
  }),
})
