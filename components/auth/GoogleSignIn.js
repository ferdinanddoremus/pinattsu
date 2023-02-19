import useAuth from '@/hooks/useAuth'

const GoogleSignIn = ({ onSuccess, onFail }) => {
  const { signinWithGoogle } = useAuth()

  return (
    <button
      type="button"
      className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      onClick={() => {
        signinWithGoogle()
          .then((data) => {
            onSuccess?.(data)
          })
          .catch((err) => {
            onFail?.(err)
          })
      }}
    >
      Continue with Google
    </button>
  )
}

export default GoogleSignIn
