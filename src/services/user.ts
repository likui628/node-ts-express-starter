import { paginate, prisma } from '../utils'
import { Prisma, User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { logger } from '../config/logger'
import { QueryUsers } from '../types'

export const createUser = async (user: User) => {
  try {
    const hashedPwd = await bcrypt.hash(user.password, 10)
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashedPwd,
        isVerified: false,
        role: user.role,
      },
    })
    return newUser
  } catch (err: unknown) {
    logger.error(`Failed to create user: ${JSON.stringify(err)}`)
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        throw new Error('Failed to create user: email occupied')
      }
    }
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
    logger.error(`Failed to get user by email: ${JSON.stringify(err)}`)
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
    logger.error(`Failed to get user by id: ${JSON.stringify(err)}`)
    throw new Error('Failed to get user by id')
  }
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

  const result = await paginate({
    modelName: 'User',
    page,
    pageSize: limit,
    where: whereConditions,
    orderBy: orderByConditions,
  })

  return result
}

export const deleteUserById = async (id: string) => {
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    })
  } catch (err: unknown) {
    logger.error(`Failed to delete user by id: ${JSON.stringify(err)}`)
    throw new Error('Failed to delete user by id')
  }
}

export const updateUser = async (
  id: string,
  user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...user,
      },
    })
    return updatedUser
  } catch (err: unknown) {
    logger.error(`Failed to update user by id: ${JSON.stringify(err)}`)
    throw new Error('Failed to update user by id')
  }
}
