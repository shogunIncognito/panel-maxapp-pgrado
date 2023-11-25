import { jwtVerify } from 'jose'
import { removeToken } from './token'

export default async function validateTokenMiddlew (token) {
  try {
    const { payload } = await jwtVerify(token?.value, new TextEncoder().encode(process.env.SECRET))
    return payload
  } catch (err) {
    removeToken()
    return false
  }
}
