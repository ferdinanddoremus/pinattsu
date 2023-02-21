import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Components
import GoogleSignIn from '@/components/auth/GoogleSignIn'

const SignIn = () => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Signup</title>
      </Head>
      <div className="py-5">
        <h1 className="text-xl font-bold tracking-tight">Sign in</h1>
        <GoogleSignIn
          onSuccess={() => router.push('/')}
          onFail={err => console.error(err)}
        />
        <Link
          href="/signup"
          className="text-sm text-slate-800 hover:text-indigo-500"
        >
          No account yet ?
        </Link>
      </div>
    </>
  )
}

export default SignIn
