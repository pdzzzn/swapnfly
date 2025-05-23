"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { PlusCircle, Bell } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

export default function Header() {
  const links = [
    { to: "/", label: "Home" },
      { to: "/dashboard", label: "Dashboard" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* <Icons.logo className="h-6 w-6" /> */}
            <span className="hidden font-bold sm:inline-block">
              SwapDuty {/* Or your app name */}
            </span>
          </Link>
          {/* You can add main navigation links here if not all in sidebar */}
        </div>

        <div className="flex flex-1 items-center justify-end space-x-3">
          {/* TODO: Implement AddDutyDialog or similar modal trigger */}
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Duty
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <ModeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
