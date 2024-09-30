import { userService } from '.'
import bcrypt from 'bcrypt'

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  const user = await userService.getUserByEmail(email)
  if (!user) {
    throw new Error('User is not exist')
  }
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw new Error('Password is incorrect')
  }

  return user
}
