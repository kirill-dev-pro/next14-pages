import { signInWithPassword } from '@/lib/firebase/auth'
import { getAuthenticatedAppForUser } from '@/lib/firebase/serverApp'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { headers } = req
  const { currentUser } = await getAuthenticatedAppForUser(headers)
  console.log('GET /login', currentUser?.uid || 'no user')
  if (currentUser) {
    return { props: {}, redirect: { destination: '/' } }
  }
  return { props: {} }
}

export default function Login() {
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const email = form.email.value
    const password = form.password.value
    signInWithPassword(email, password).then(() => {
      console.log('Signed in')
      setTimeout(() => router.push('/'), 500)
    })
  }

  return (
    <form
      className='flex flex-col items-center justify-center min-h-screen py-2'
      onSubmit={handleSubmit}
    >
      <input
        type='email'
        name='email'
        placeholder='Email'
        defaultValue='test@test.test'
        className='p-2 m-2 border border-gray-300 rounded-md'
      />
      <input
        type='password'
        name='password'
        placeholder='Password'
        defaultValue='test123'
        className='p-2 m-2 border border-gray-300 rounded-md'
      />
      <button type='submit' className='p-2 m-2 border border-gray-300 rounded-md'>
        Login
      </button>
    </form>
  )
}
