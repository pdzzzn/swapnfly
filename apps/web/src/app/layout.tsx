// In: apps/web/src/app/layout.tsx
import Header from "@/components/header";
import Sidebar from "@/components/Sidebar";
import Providers from "@/components/providers"; //
import "@/index.css"; //

export const metadata = {
  title: "SwapDuty",
  description: "Aviation Crew Duty Swap Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers> {/* This should make QueryClient available to all children */}
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 py-6 px-4 md:ml-60">
                {children} {/* page.tsx will be rendered here */}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}