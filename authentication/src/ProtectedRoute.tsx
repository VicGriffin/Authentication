import type { ReactNode } from 'react'
import type { User } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

type ProtectedRouteProps = {
  children: ReactNode
  user: User | null
}

function ProtectedRoute({ children, user }: ProtectedRouteProps) {
  if (!user) {
    return <Navigate replace to="/login" />
  }

  return <>{children}</>
}

export default ProtectedRoute
