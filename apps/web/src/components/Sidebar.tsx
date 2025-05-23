// apps/web/src/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutDashboard, ListChecks, ListPlus, CalendarDays, Settings } from "lucide-react";

const navItems = [
  { href: "/available-swaps", label: "Available Swaps", icon: LayoutDashboard },
  { href: "/my-schedule", label: "My Schedule", icon: CalendarDays },
  { href: "/my-offered-duties", label: "My Offered Duties", icon: ListPlus },
  { href: "/my-swap-requests", label: "My Swap Requests", icon: ListChecks },
  { href: "/account-settings", label: "Account Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    // Adjust top positioning based on your header's height (h-16 -> top-16)
    <aside className="fixed top-16 left-0 z-30 hidden h-[calc(100vh-4rem)] w-60 border-r bg-background md:block">
      <ScrollArea className="h-full py-4 px-3">
        <nav className="grid items-start gap-1 text-sm font-medium">
          {navItems.map((item) => (
            <Link key={item.label} href={`/(app)${item.href}`}> {/* Ensure Link href matches route structure */}
              <Button
                variant={pathname === `/app${item.href}` || pathname === item.href ? "secondary" : "ghost"} // Adjust pathname matching
                className="w-full justify-start"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}