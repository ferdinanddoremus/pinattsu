import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    set => ({
      user: 0,
      setUser: user => set({ user }),
    }),
    {
      name: 'pinattsu-auth-storage',
    }
  )
)
