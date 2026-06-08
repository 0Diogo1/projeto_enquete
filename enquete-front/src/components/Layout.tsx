import type { ReactNode } from 'react'
import Navbar from './Navbar'

interface Props {
  children: ReactNode
}

function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <div className="p-4">
        {children}
      </div>
    </>
  )
}

export default Layout