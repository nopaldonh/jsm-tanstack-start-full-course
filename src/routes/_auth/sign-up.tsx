import { createFileRoute } from '@tanstack/react-router'
import { SignInForm } from '#/components/auth/SignInForm'

export const Route = createFileRoute('/_auth/sign-up')({
  component: SignUpPage,
})

function SignUpPage() {
  return (
    <section id="sign-up">
      <SignInForm mode="sign-up" />
    </section>
  )
}
