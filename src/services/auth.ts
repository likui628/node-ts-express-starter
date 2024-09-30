import { userService } from '.'
import bcrypt from 'bcrypt'
import { logger } from '../config/logger'

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  const user = await userService.getUserByEmail(email)
  if (!user) {
    throw new Error('User is not exist')
  }

  try {
  }

  return user
}
