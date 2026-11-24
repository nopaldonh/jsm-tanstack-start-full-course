import type { ReactNode } from 'react'
import { authClient } from '@/lib/auth-client'

type ShowProps = {
  when: 'signed-in' | 'signed-out'
  fallback?: ReactNode
  children: ReactNode
}

export function Show({ when, fallback = null, children }: ShowProps) {
  const { data: session, isPending } = authClient.useSession()

  // Avoid flashing the wrong state while the session is loading
  if (isPending) return null

  const isSignedIn = !!session
  return (when === 'signed-in') === isSignedIn ? children : fallback
}
