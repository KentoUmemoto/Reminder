import { signIn, signOut, useSession } from 'next-auth/react'

const IndexPage = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <p>loading...</p>
  }
  if (status === 'unauthenticated') {
    return (
      <div>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    )
  }
  if (status === 'authenticated') {
    return (
      session && (
        <>
          Signed in as {session.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )
    )
  }
}

export default IndexPage
