import '@/styles/globals.css'
import { useEffect } from 'react'
import DefaultLayout from '@/layouts/default'
import { initFirebase } from '@/services/firebase'
import { AuthProvider } from '@/contexts/auth'

const EmptyLayout = ({ children }) => children

initFirebase()

export default function Pinattsu({ Component, pageProps }) {
  const Layout = !Component.skipLayout
    ? Component.layout || DefaultLayout
    : EmptyLayout

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}
