import { getUserInfo } from '@/services/api'
import { getToken } from './token'
import { jwtVerify } from 'jose'
import { SECRET } from './envconfig'

export default async function getSession () {
  const token = getToken()
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET))
    const user = await getUserInfo(payload.userId)
    return user
  } catch (error) {
    console.log(error)
    return null
  }
}
