import { getUserInfo } from '@/services/api'
import { getToken } from './token'

export default async function getSession (): Promise<any> {
  const token = getToken()
  if (token === undefined) return null
  try {
    return await getUserInfo()
  } catch (error) {
    console.log(error)
    return null
  }
}
