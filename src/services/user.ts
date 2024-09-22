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
