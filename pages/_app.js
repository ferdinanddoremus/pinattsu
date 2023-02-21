import '@/styles/globals.css'
import { SWRConfig } from 'swr'
import DefaultLayout from '@/layouts/default'
import { initFirebase } from '@/services/firebase'
import { AuthProvider } from '@/contexts/auth'
import axios from 'axios'

const EmptyLayout = ({ children }) => children

initFirebase()

const fetcher = url => axios.get(url).then(res => res.data)

export default function Pinattsu({ Component, pageProps }) {
  const Layout = !Component.skipLayout
    ? Component.layout || DefaultLayout
    : EmptyLayout

  return (
    <SWRConfig value={{ fetcher }}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </SWRConfig>
  )
}
