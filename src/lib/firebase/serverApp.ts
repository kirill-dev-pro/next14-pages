import { headers } from 'next/headers'
import { initializeServerApp } from 'firebase/app'

import { firebaseConfig } from './config'
import { getAuth } from 'firebase/auth'
import { IncomingHttpHeaders } from 'http'

export async function getAuthenticatedAppForUser(headers: IncomingHttpHeaders) {
  const idToken = headers.authorization?.split('Bearer ')[1]

  const firebaseServerApp = initializeServerApp(
    firebaseConfig,
    idToken
      ? {
          authIdToken: idToken,
        }
      : {},
  )

  const auth = getAuth(firebaseServerApp)
  await auth.authStateReady()

  return { firebaseServerApp, currentUser: auth.currentUser }
}
