import { ReactNode } from 'react'
import type { NextComponentType } from 'next'
import type { AppProps } from 'next/app'
import { Layout } from '@/components/Layout'
import { Spinner } from '@/components/Spinner'
import '@/styles/globals.css'
import { SessionProvider, useSession } from 'next-auth/react'

type CustomAppProps = AppProps & {
  Component: NextComponentType & { auth?: boolean }
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </SessionProvider>
  )
}

interface Props {
  children: ReactNode
}

function Auth({ children }: Props) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === 'loading') {
    return <Spinner />
  }

  return children
}
