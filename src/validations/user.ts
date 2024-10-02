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
