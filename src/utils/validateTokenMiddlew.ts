import { jwtVerify } from 'jose'
import { removeToken } from './token'

export default async function validateTokenMiddlew (token: { value: string }): Promise<object | boolean> {
  try {
    const { payload } = await jwtVerify(token?.value, new TextEncoder().encode(process.env.SECRET))
    return payload
  } catch (err) {
    removeToken()
    return false
  }
}
