import { Role } from '@prisma/client'

export interface Pagination {
  orderBy?: 'name' | 'email' | 'createdAt' | 'updatedAt'
  order?: 'asc' | 'desc'
  limit?: number
  page?: number
}

export interface QueryUsers extends Pagination {
  name?: string
  role?: Role
}
