import { createFileRoute } from '@tanstack/react-router'
import { SignInForm } from '#/components/auth/SignInForm'

export const Route = createFileRoute('/_auth/sign-in')({
  component: SignInPage,
})

function SignInPage() {
  return (
    <section id="sign-in">
      <SignInForm />
    </section>
  )
}
