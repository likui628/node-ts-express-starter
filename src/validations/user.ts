import { z } from 'zod'
import { Role } from '@prisma/client'
import { paginationSchema, password, name, email } from './common'

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
    email,
    password,
    name,
    role: z.enum([Role.ADMIN, Role.USER]),
  }),
})

export const getUserSchema = z.object({
  params: z.object({
    userId: z.string().uuid(),
  }),
})

export const deleteUserSchema = getUserSchema