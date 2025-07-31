import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/state/session";
import { Skeleton } from "@/components/ui/skeleton";
import useSignOut from "@/hooks/useSignOut";

export default function NavUserMenu({ onNavigate }: { onNavigate?: () => void }) {
  const { session, isLoading } = useSessionStore();
  const { signOut } = useSignOut();
  const router = useRouter();

  if (isLoading) {
    return <Skeleton className="h-10 w-[80px] bg-primary" />;
  }

  if (!session?.user) {
    return (
      <Button asChild onClick={onNavigate}>
        <Link href="/sign-in">Sign In</Link>
      </Button>
    );
  }

  const { user } = session;
  const displayName =
    user.nickname ||
    (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email);
  const avatarUrl = `https://api.dicebear.com/7.x/thumbs/svg?seed=${user.id}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 px-2" onClick={onNavigate}>
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={displayName ?? ''} />
            <AvatarFallback>{displayName?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="ml-2 max-w-[120px] truncate">{displayName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/account" as Route}>My account</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut().then(() => {
              router.push("/");
            });
          }}
          className="cursor-pointer"
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
