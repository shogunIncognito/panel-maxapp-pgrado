import { create } from 'zustand'

interface Session {
  _id: string
  name: string
  role: string
}
interface SessionState {
  session: Session | null
  setSession: (session: Session | null) => void
}

const useSessionStore = create<SessionState>((set) => ({
  session: null,
  setSession: (session) => set({ session })
}))

export default useSessionStore
