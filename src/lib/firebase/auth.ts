import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'

import { auth } from '@/lib/firebase/clientApp'

export function onAuthStateChanged(cb: (user: any) => void) {
  return _onAuthStateChanged(auth, cb)
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider()

  try {
    await signInWithPopup(auth, provider)
  } catch (error) {
    console.error('Error signing in with Google', error)
  }
}

export async function signOut() {
  try {
    return auth.signOut()
  } catch (error) {
    console.error('Error signing out with Google', error)
  }
}

export const signInWithPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.error('Error signing in with email and password', error)
  }
}
