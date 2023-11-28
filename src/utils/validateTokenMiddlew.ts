import { JWTPayload, jwtVerify } from 'jose'
import { removeToken } from './token'

interface UserData {
  userId: string
  username: string
  role: string
  image: string
}

export default async function validateTokenMiddlew (token: string | undefined): Promise<UserData | undefined | false | JWTPayload> {
  try {
    if (token === undefined) return undefined
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.SECRET))
    return payload
  } catch (err) {
    removeToken()
    return false
  }
}
