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
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw new Error('Password is incorrect')
    }
  } catch (error) {
    logger.error('Error during password comparison:', error)
    throw new Error('An error occurred during authentication')
  }

  return user
}
