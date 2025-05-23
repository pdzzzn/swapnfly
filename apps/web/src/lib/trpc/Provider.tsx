// apps/web/src/lib/trpc/Provider.tsx (or choose a path like apps/web/src/components/trpc-provider.tsx)
"use client"; // This component must be a Client Component

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import React, { useState } from "react";
import { trpc } from "@/utils/trpc"; // Assuming this is your tRPC client hook setup

// Function to get the base URL (can be in a utils file)
function getBaseUrl() {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export function TRPCReactQueryProvider({ children }: { children: React.ReactNode }) {
  // Create a new QueryClient instance for each session for SSR/SSG
  // (prevent data sharing between users and requests)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // You can set default options for queries here
            staleTime: 1 * 60 * 1000, // 1 minute
          },
        },
      })
  );

  const [trpcClient] = useState(()
     =>
    trpc.createClient({
      transformer: superjson, // Make sure this matches your server setup if using superjson
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`, // Ensure this URL points to your tRPC endpoint
          headers() {
            const headers = new Headers();
            headers.set("x-trpc-source", "client");
            return headers;
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}