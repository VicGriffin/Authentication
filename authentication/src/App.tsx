import { useEffect, useState } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import ProtectedRoute from './ProtectedRoute'
import { auth } from './firebase'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
      setCheckingAuth(false)
    })

    return unsubscribe
  }, [])

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 py-10">
        <div className="glass-panel w-full max-w-md p-8 text-center">
          <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
            Checking Session
          </span>
          <h1 className="mt-6 font-display text-3xl font-semibold text-slate-950">
            Bringing your workspace back online
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Firebase is verifying the current session before we choose where to send
            you.
          </p>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-slate-950" />
          </div>
        </div>
      </main>
    )
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate replace to={user ? '/dashboard' : '/login'} />}
      />
      <Route
        path="/login"
        element={user ? <Navigate replace to="/dashboard" /> : <Login />}
      />
      <Route
        path="/dashboard"
        element={
          user ? (
            <ProtectedRoute user={user}>
              <Dashboard user={user} />
            </ProtectedRoute>
          ) : (
            <Navigate replace to="/login" />
          )
        }
      />
      <Route
        path="*"
        element={<Navigate replace to={user ? '/dashboard' : '/login'} />}
      />
    </Routes>
  )
}

export default App
