import { useRouter } from '@tanstack/react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { authClient } from '@/lib/auth-client'
import { LogOutIcon } from 'lucide-react'

export function UserButton() {
  const router = useRouter()
  const { data: session } = authClient.useSession()

  if (!session) return null
  const { user } = session

  async function handleSignOut() {
    await authClient.signOut()
    await router.invalidate()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Avatar>
          <AvatarImage src={user.image ?? undefined} alt={user.name} />
          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-56">
        <DropdownMenuLabel>
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOutIcon size={16} /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
