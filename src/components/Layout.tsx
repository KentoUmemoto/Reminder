import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function Layout({ children }: Props) {
  return (
    <>
      <main>
        <div className='container mx-auto px-4'>{children}</div>
      </main>
    </>
  )
}
