import getSession from '@/utils/getSession'
import { create } from 'zustand'

interface Session {
  _id: string
  username: string
  role: string
  image?: string
}
interface SessionState {
  session: Session | null
  validateSession: () => Promise<void>
  deleteSession: () => void
}

const useSessionStore = create<SessionState>((set) => ({
  session: null,
  validateSession: async () => {
    const userInfo = await getSession()
    console.log(userInfo)
    return set({ session: userInfo })
  },
  deleteSession: () => set({ session: null })
}))

export default useSessionStore
