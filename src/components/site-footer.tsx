import { Link } from "@tanstack/react-router";

import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="bg-navy-gradient text-primary-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">
            Connecting local talent to opportunities — students, graduates, job seekers, mentors
            and employers on one platform.
          </p>
          <p className="mt-4 text-sm text-primary-foreground/70">
            Supporting UN Sustainable Development Goals 8, 10 and 17.
          </p>
        </div>
        <nav aria-label="Explore" className="flex flex-col gap-2.5 text-sm">
          <p className="font-display font-bold">Explore</p>
          <Link to="/opportunities" className="text-primary-foreground/70 hover:text-teal">
            Opportunities
          </Link>
          <Link to="/mentorship" className="text-primary-foreground/70 hover:text-teal">
            Mentorship
          </Link>
          <Link to="/network" className="text-primary-foreground/70 hover:text-teal">
            Network
          </Link>
        </nav>
        <nav aria-label="Account" className="flex flex-col gap-2.5 text-sm">
          <p className="font-display font-bold">Account</p>
          <Link to="/register" className="text-primary-foreground/70 hover:text-teal">
            Create an account
          </Link>
          <Link to="/login" className="text-primary-foreground/70 hover:text-teal">
            Sign in
          </Link>
          <Link to="/profile" className="text-primary-foreground/70 hover:text-teal">
            My profile
          </Link>
        </nav>
      </div>
      <div className="border-t border-primary-foreground/10">
        <p className="container-page py-5 text-xs text-primary-foreground/60">
          © 2026 TalentLink. Made in Kenya.
        </p>
      </div>
    </footer>
  );
}
