import { z } from 'zod'

export const paginationSchema = z.object({
  sortBy: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional().default('asc'),
  limit: z.number().int().min(1).optional().default(10),
  page: z.number().int().min(1).optional().default(1),
})

export const password = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(100)
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  )
