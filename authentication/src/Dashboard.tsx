import { useState } from 'react'
import { signOut, type User } from 'firebase/auth'
import { auth } from './firebase'

type DashboardProps = {
  user: User
}

const providerLabels: Record<string, string> = {
  'google.com': 'Google',
  password: 'Email and password',
}

function getProviderLabel(user: User) {
  const providerId = user.providerData[0]?.providerId

  return providerId ? providerLabels[providerId] ?? providerId : 'Unknown provider'
}

function getDisplayName(user: User) {
  if (user.displayName?.trim()) {
    return user.displayName
  }

  if (user.email) {
    return user.email.split('@')[0]
  }

  return 'Authenticated user'
}

function getInitials(value: string) {
  return value
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

function formatTimestamp(value?: string) {
  if (!value) {
    return 'Unavailable'
  }

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function Dashboard({ user }: DashboardProps) {
  const [signingOut, setSigningOut] = useState(false)
  const [error, setError] = useState('')

  const displayName = getDisplayName(user)
  const provider = getProviderLabel(user)
  const createdAt = formatTimestamp(user.metadata.creationTime)
  const lastSeenAt = formatTimestamp(user.metadata.lastSignInTime)

  const handleSignOut = async () => {
    setSigningOut(true)
    setError('')

    try {
      await signOut(auth)
    } catch {
      setError('Sign-out failed. Please try again.')
    } finally {
      setSigningOut(false)
    }
  }

  return (
    <main className="min-h-screen px-6 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="glass-panel flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-700">
              Session Active
            </span>
            <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-slate-950">
              Welcome back, {displayName}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              The authentication flow is now wired up cleanly: public login, protected
              dashboard, persisted session handling, and a clear sign-out path.
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-[24px] border border-slate-200/80 bg-white/80 p-4 shadow-[0_20px_50px_-32px_rgba(15,23,42,0.55)]">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-lg font-semibold text-white">
              {getInitials(displayName)}
            </div>
            <div>
              <p className="font-semibold text-slate-950">{displayName}</p>
              <p className="text-sm text-slate-500">{user.email ?? 'No email available'}</p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="glass-panel p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
                  Account Overview
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-slate-950">
                  Your sign-in experience is ready for the next feature
                </h2>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {signingOut ? 'Signing out...' : 'Sign out'}
              </button>
            </div>

            {error ? (
              <p className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </p>
            ) : null}

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="stat-card">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Provider
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-950">{provider}</p>
              </article>
              <article className="stat-card">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Created
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-950">{createdAt}</p>
              </article>
              <article className="stat-card">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Last sign-in
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-950">{lastSeenAt}</p>
              </article>
            </div>
          </div>

          <aside className="glass-panel p-6 sm:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">
              Suggested Next Steps
            </p>
            <div className="mt-5 space-y-4">
              <article className="rounded-[24px] border border-slate-200/80 bg-white/75 p-4">
                <h3 className="font-semibold text-slate-950">Connect Firestore or your API</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Now that auth is stable, this page is a good place to load user-specific
                  data after sign-in.
                </p>
              </article>
              <article className="rounded-[24px] border border-slate-200/80 bg-white/75 p-4">
                <h3 className="font-semibold text-slate-950">Add form validation rules</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Client-side rules can give faster feedback before Firebase rejects weak
                  passwords or malformed emails.
                </p>
              </article>
              <article className="rounded-[24px] border border-slate-200/80 bg-white/75 p-4">
                <h3 className="font-semibold text-slate-950">Move secrets to env files</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  The app works as-is, but `VITE_` environment variables are the cleaner
                  way to manage Firebase config long-term.
                </p>
              </article>
            </div>
          </aside>
        </section>
      </div>
    </main>
  )
}

export default Dashboard
