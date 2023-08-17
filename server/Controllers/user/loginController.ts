import usersFindOne from '@/Database/operations/User/findOne'
import { isPasswordValid, userDoesNotExistsError } from '@/Errors/user'
import { loginInput } from '@/Types/User'
import { signToken } from '@/services/authJwt'
export default async (input: loginInput) => {
  try {
    const user = await usersFindOne({ email: input.email })
    const userNoExist = userDoesNotExistsError(user)
    if (userNoExist) return userNoExist
    const passwordValid = isPasswordValid(input.password, user.password)
    if (passwordValid) return passwordValid
    const token = signToken(user)
    return {
      user,
      token,
    }
  } catch (error) {
    return error
  }
}
