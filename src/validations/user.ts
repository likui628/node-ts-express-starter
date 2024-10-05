import { z } from 'zod'
import { Role } from '@prisma/client'
import { paginationSchema, password, name, email } from './common'

export const getUsersSchema = z.object({
  query: z
    .object({
      name: z.string().optional(),
      role: z.enum([Role.ADMIN, Role.USER]).optional(),
      orderBy: z
        .enum(['name', 'email', 'role', 'createdAt', 'updatedAt'])
        .optional(),
      order: z.enum(['asc', 'desc']).optional(),
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

export const updateUserSchema = z.object({
  params: z.object({
    userId: z.string().uuid(),
  }),
  body: createUserSchema.shape.body.partial(),
})
