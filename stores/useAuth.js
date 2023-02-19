import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: 0,
      setUser: user => set({ user }),
    }),
    {
      name: 'pinattsu-auth-storage',
    }
  )
)
