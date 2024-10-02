import { z } from 'zod'

export const paginationSchema = z.object({
  sortBy: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional().default('asc'),
  limit: z.number().int().optional().default(10),
  page: z.number().int().optional().default(1),
})
