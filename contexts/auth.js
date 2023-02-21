import { createContext, useEffect, useCallback, useState } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const auth = getAuth()
  const [user, setUser] = useState(auth?.currentUser || null)

  useEffect(() => {
    const unsub = auth.onIdTokenChanged(authStateChanged)
    return unsub
  }, [])

  const authStateChanged = useCallback(async u => {
    setUser(u)
  }, [])

  const signin = useCallback(
    ({ email, password }) => signInWithEmailAndPassword(auth, email, password),
    [auth]
  )

  const signinWithGoogle = useCallback(() => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }, [auth])

  const signup = useCallback(
    ({ email, password }) =>
      createUserWithEmailAndPassword(auth, email, password),
    [auth]
  )
  const signout = useCallback(() => signOut(auth), [auth])

  return (
    <AuthContext.Provider
      value={{ signin, signinWithGoogle, signout, signup, user }}
    >
      {children}
    </AuthContext.Provider>
  )
}
