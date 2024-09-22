import { userService } from '.'

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  const user = await userService.getUserByEmail(email)
  if (!user || user.password !== password) {
    throw new Error('password is incorrect')
  }
  return user
}
