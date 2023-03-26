import { createContext, useEffect, useCallback, useState } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import axios from 'axios'
import { useAuthStore } from '@/stores/useAuth'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const auth = getAuth()
  const [user, setUser] = useState(auth?.currentUser || null)
  const setStoreUser = useAuthStore(state => state.setUser)

  const authStateChanged = useCallback(u => setUser(u), [])

  const signin = useCallback(
    ({ email, password }) => signInWithEmailAndPassword(auth, email, password),
    [auth]
  )

  const signinWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider).then(({ user }) => {
      axios
        .post('/api/users', user)
        .then(({ data }) => setStoreUser(data))
        .catch(err => console.error(err))
    })
  }, [auth, setStoreUser])

  const signup = useCallback(
    ({ email, password }) =>
      createUserWithEmailAndPassword(auth, email, password),
    [auth]
  )

  const signout = useCallback(() => signOut(auth), [auth])

  useEffect(() => {
    const unsub = auth.onIdTokenChanged(authStateChanged)
    return unsub
  }, [])

  useEffect(() => {
    if (user) {
      auth.currentUser
        .getIdToken(true)
        .then(idToken => {
          axios.defaults.headers.common.Authorization = idToken
        })
        .catch(err => console.error(err))
    }
  }, [user, auth])

  return (
    <AuthContext.Provider
      value={{ signin, signinWithGoogle, signout, signup, user }}
    >
      {children}
    </AuthContext.Provider>
  )
}
