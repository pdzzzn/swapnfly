// In: apps/web/src/app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; //
import Loader from "@/components/loader"; //

export default function HomePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending) {
      if (session) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    }
  }, [session, isPending, router]);

  // Display a loader or a minimal message while redirecting
  // to avoid flashing content or a 404 if rendering is too fast.
  return <Loader />; // Or any other loading indicator you prefer
}