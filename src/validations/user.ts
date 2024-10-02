import { z } from 'zod'
import { Role } from '@prisma/client'
import { paginationSchema, password } from './common'

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
    email: z.string().email().max(255),
    password,
    name: z.string().min(1, 'Name cannot be empty').max(100),
    role: z.enum([Role.ADMIN, Role.USER]),
  }),
})
