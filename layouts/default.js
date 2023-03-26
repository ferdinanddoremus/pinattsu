import Link from 'next/link'
import { UserIcon } from '@heroicons/react/24/solid'

// Hooks
import useAuth from '@/hooks/useAuth'

const DefaultLayout = ({ children }) => {
  const { user, signout } = useAuth()

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="container py-2 flex justify-between items-center border-b border-gray-200">
        <Link
          href="/"
          className="font-bold text-lg tracking-tight text-black hover:text-indigo-500"
        >
          shlag
        </Link>
        {user ? (
          <button
            className="rounded-full border border-gray-200 p-2 flex items-center shadow-sm hover:shadow-md"
            onClick={() => signout()}
          >
            logout
          </button>
        ) : (
          <Link
            href={'/signin'}
            className="rounded-full border border-gray-200 p-2 flex items-center shadow-sm hover:shadow-md"
          >
            <UserIcon className="text-indigo-500" width="24" height="24" />
          </Link>
        )}
      </nav>
      <main className="container grow">{children}</main>
      <footer className="py-5">
        <div className="container">
          <p className="text-sm text-gray-500 text-center">🚴‍♂️ 🚴‍♂️ 🚴‍♂️</p>
        </div>
      </footer>
    </div>
  )
}

export default DefaultLayout
