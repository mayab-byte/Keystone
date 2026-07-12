"use client";

import { usePathname } from "next/navigation";

/* Gentle page-entrance: keyed by route so it replays on every navigation.
   Opacity-only (no transform) so it never creates a containing block that
   would disturb the sticky header / scroll-driven hero. */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
