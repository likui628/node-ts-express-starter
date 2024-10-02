import { prisma } from '../utils'
import { Role, User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { logger } from '../config/logger'

export const createUser = async (user: User) => {
  try {
    const hashedPwd = await bcrypt.hash(user.password, 10)
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashedPwd,
        isVerified: false,
      },
    })
    return newUser
  } catch (err: unknown) {
    logger.error('Failed to create user:', err)
    throw new Error('Failed to create user')
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  } catch (err: unknown) {
    logger.error('Failed to get user by email:', err)
    throw new Error('Failed to get user by email')
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  } catch (err: unknown) {
    logger.error('Failed to get user by id:', err)
    throw new Error('Failed to get user by id')
  }
}

interface Pagination {
  orderBy?: string
  order?: 'asc' | 'desc'
  limit?: number
  page?: number
}

interface QueryUsers extends Pagination {
  name?: string
  role?: Role
}

export const queryUsers = async ({
  name,
  role,
  order,
  orderBy,
  limit = 10,
  page = 1,
}: QueryUsers) => {
  const whereConditions: Record<string, unknown> = {}
  if (name) {
    whereConditions.name = {
      contains: name,
    }
  }
  if (role) {
    whereConditions.role = role
  }

  const orderByConditions: Record<string, unknown> = {}
  if (orderBy) {
    orderByConditions[orderBy] = order
  }

  const users = await prisma.user.findMany({
    where: whereConditions,
    orderBy: orderBy ? orderByConditions : undefined,
    take: limit,
    skip: (page - 1) * limit,
  })
  return users
}
