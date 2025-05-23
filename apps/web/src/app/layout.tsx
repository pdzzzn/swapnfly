// apps/web/src/app/(app)/layout.tsx
import Header from "@/components/header"; // Your existing header
import Sidebar from "@/components/Sidebar"; // The new Sidebar

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        {/* Adjust left margin to account for sidebar width (w-60 -> ml-60) */}
        <main className="flex-1 py-6 px-4 md:ml-60">
          {children}
        </main>
      </div>
    </div>
  );
}
