import { prisma } from '../utils'
import { User } from '@prisma/client'

export const createUser = async (user: User) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
        isVerified: false,
      },
    })
    return newUser
  } catch (_err: unknown) {
    throw new Error('create user failed')
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
  } catch (_err: unknown) {
    throw new Error('get user failed')
  }
}
