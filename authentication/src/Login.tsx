import { useState, type FormEvent } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import hero from './assets/hero.png'
import { auth } from './firebase'

const authErrorMessages: Record<string, string> = {
  'auth/email-already-in-use': 'That email is already in use. Try signing in instead.',
  'auth/invalid-email': 'Enter a valid email address.',
  'auth/invalid-credential': 'The email or password is incorrect.',
  'auth/missing-password': 'Enter your password to continue.',
  'auth/popup-closed-by-user': 'The Google sign-in popup was closed before finishing.',
  'auth/too-many-requests': 'Too many attempts were made. Please wait and try again.',
  'auth/user-not-found': 'No account was found with that email.',
  'auth/weak-password': 'Use a password with at least 6 characters.',
  'auth/wrong-password': 'The password is incorrect.',
}

function getAuthErrorMessage(error: unknown) {
  if (typeof error === 'object' && error && 'code' in error) {
    const code = String(error.code)
    return authErrorMessages[code] ?? 'Authentication failed. Check your Firebase provider settings and try again.'
  }

  return 'Authentication failed. Please try again.'
}

function Login() {
  const navigate = useNavigate()

  const [mode, setMode] = useState<'sign-in' | 'create-account'>('sign-in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const isCreatingAccount = mode === 'create-account'

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setBusy(true)
    setError('')

    try {
      if (isCreatingAccount) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }

      navigate('/dashboard', { replace: true })
    } catch (nextError) {
      setError(getAuthErrorMessage(nextError))
    } finally {
      setBusy(false)
    }
  }

  const handleGoogleLogin = async () => {
    setBusy(true)
    setError('')

    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
      navigate('/dashboard', { replace: true })
    } catch (nextError) {
      setError(getAuthErrorMessage(nextError))
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="min-h-screen px-6 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="glass-panel relative overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(249,115,22,0.18),_transparent_65%)]" />
          <div className="relative flex h-full flex-col justify-between gap-8">
            <div>
              <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-700">
                Firebase Auth
              </span>
              <h1 className="mt-6 max-w-xl font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                A polished login flow instead of a placeholder screen
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                This project now supports email/password sign-in, Google sign-in,
                protected routing, and session-aware redirects so the authentication
                story feels complete.
              </p>
            </div>

            <div className="grid gap-5">
              <div className="relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-slate-950 px-6 py-8 text-white shadow-[0_30px_80px_-40px_rgba(15,23,42,0.9)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_40%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.24),_transparent_35%)]" />
                <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-md">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-200">
                      Ready to Extend
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-semibold">
                      The auth shell is built for real app features now
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      Add profile data, role checks, or protected API calls on top of
                      this without untangling the basics again.
                    </p>
                  </div>
                  <img
                    src={hero}
                    alt="Layered authentication illustration"
                    className="mx-auto h-44 w-auto drop-shadow-[0_16px_32px_rgba(0,0,0,0.35)] md:mx-0"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <article className="stat-card">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Routing
                  </p>
                  <p className="mt-3 text-sm font-medium text-slate-700">
                    Public login and a protected dashboard stay in sync with auth state.
                  </p>
                </article>
                <article className="stat-card">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Providers
                  </p>
                  <p className="mt-3 text-sm font-medium text-slate-700">
                    Email/password and Google are both wired in with friendly errors.
                  </p>
                </article>
                <article className="stat-card">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Sessions
                  </p>
                  <p className="mt-3 text-sm font-medium text-slate-700">
                    Refreshing the page keeps the user in the right place automatically.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="glass-panel flex items-center justify-center p-6 sm:p-8 lg:p-10">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
                  Access
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold text-slate-950">
                  {isCreatingAccount ? 'Create account' : 'Welcome back'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() =>
                  setMode((currentMode) =>
                    currentMode === 'sign-in' ? 'create-account' : 'sign-in',
                  )
                }
                className="rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                {isCreatingAccount ? 'Use sign in' : 'Create account'}
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Use the email flow below or continue with Google. Make sure those
              providers are enabled in your Firebase project.
            </p>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete={isCreatingAccount ? 'new-password' : 'current-password'}
                  placeholder={isCreatingAccount ? 'At least 6 characters' : 'Enter your password'}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950"
                  minLength={6}
                  required
                />
              </label>

              {error ? (
                <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-full bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {busy
                  ? 'Working...'
                  : isCreatingAccount
                    ? 'Create account'
                    : 'Sign in with email'}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Or
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={busy}
              className="w-full rounded-full border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-slate-950 hover:text-slate-950 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400"
            >
              {busy ? 'Working...' : 'Continue with Google'}
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Login
