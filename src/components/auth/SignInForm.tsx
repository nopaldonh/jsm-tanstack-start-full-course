import { Link, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { cn } from 'cn'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'

export function SignInForm({
  mode = 'sign-in',
  className,
  ...props
}: React.ComponentProps<'div'> & { mode?: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const isSignInMode = mode === 'sign-in'

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const form = new FormData(e.currentTarget)
    const email = String(form.get('email'))
    const password = String(form.get('password'))
    const name = String(form.get('name') ?? '')

    const result = isSignInMode
      ? await authClient.signIn.email({ email, password })
      : await authClient.signUp.email({ email, password, name })

    setLoading(false)
    if (result.error)
      return setError(result.error.message ?? 'Something went wrong')

    // Refresh route context, then go to the app
    await router.invalidate()
    router.navigate({ to: '/' })
  }

  return (
    <div
      className={cn('flex flex-col gap-6 mx-auto w-full max-w-sm', className)}
      {...props}
    >
      <Card className="bg-zinc-800">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {isSignInMode ? 'Sign In' : 'Sign Up'} to Skild
          </CardTitle>
          <CardDescription>
            {isSignInMode
              ? 'Welcome back! Please sign in to continue.'
              : 'Create an account to get started.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {!isSignInMode && (
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input id="name" name="name" required />
                </Field>
              )}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  minLength={8}
                  required
                />
              </Field>
              <Field>
                {error && <FieldError>{error}</FieldError>}
                <Button type="submit" disabled={loading}>
                  {isSignInMode ? 'Sign in' : 'Create account'}
                </Button>
                <FieldDescription className="text-center">
                  {isSignInMode ? (
                    <span>
                      Don't have an account? <Link to="/sign-up">Sign up</Link>
                    </span>
                  ) : (
                    <span>
                      Already have an account?{' '}
                      <Link to="/sign-in">Sign in</Link>
                    </span>
                  )}
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
