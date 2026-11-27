import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Menu, UserRound } from "lucide-react";
import { useState } from "react";

import { Logo } from "@/components/logo";
import { PersonAvatar } from "@/components/person-avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useSession } from "@/hooks/use-session";

const links = [
  { to: "/opportunities", label: "Opportunities" },
  { to: "/mentorship", label: "Mentorship" },
  { to: "/network", label: "Network" },
] as const;

export function SiteHeader() {
  const { user, signOut } = useSession();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const onSignOut = () => {
    signOut();
    setMenuOpen(false);
    void navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" aria-label="TalentLink home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-secondary hover:text-primary"
              activeProps={{ className: "bg-secondary text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Account menu"
                  className="rounded-full outline-hidden ring-offset-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <PersonAvatar name={user.name} size="sm" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <span className="block truncate">{user.name}</span>
                  <span className="block truncate text-xs font-normal text-muted-foreground">
                    {user.email}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <UserRound /> My profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={onSignOut}>
                  <LogOut /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild variant="teal">
                <Link to="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-6">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <Logo />
            <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-foreground/80 hover:bg-secondary"
                  activeProps={{ className: "bg-secondary text-primary" }}
                >
                  {l.label}
                </Link>
              ))}
              {user ? (
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-foreground/80 hover:bg-secondary"
                  activeProps={{ className: "bg-secondary text-primary" }}
                >
                  My profile
                </Link>
              ) : null}
            </nav>
            <div className="mt-8 flex flex-col gap-2">
              {user ? (
                <Button variant="outline" onClick={onSignOut}>
                  <LogOut /> Sign out
                </Button>
              ) : (
                <>
                  <Button asChild variant="outline" onClick={() => setMenuOpen(false)}>
                    <Link to="/login">Sign in</Link>
                  </Button>
                  <Button asChild variant="teal" onClick={() => setMenuOpen(false)}>
                    <Link to="/register">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
