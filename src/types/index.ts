import { Role, User } from '@prisma/client'

export interface Pagination {
  orderBy?: string
  order?: 'asc' | 'desc'
  pageSize?: number
  page?: number
}

export interface QueryUsers extends Pagination {
  name?: string
  role?: Role
}

export interface UserData extends User {
  token: string
}
