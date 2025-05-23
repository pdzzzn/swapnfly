// apps/web/src/app/(app)/available-swaps/page.tsx
"use client"; // For tRPC hooks and client-side interactions

import DutyCard from "@/components/duty/DutyCard";
import type { Duty } from "@/components/duty/DutyCard"; // Or from its original definition if separate

import DutyFilters from "@/components/duty/DutyFilters";
import type { DutyFiltersState } from "@/components/duty/DutyFilters";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { trpc } from "@/utils/trpc"; // Your tRPC client
import { Skeleton } from "@/components/ui/skeleton"; // For loading state
// Import Dialog components for swap confirmation flow
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


export default function AvailableSwapsPage() {
  const [filters, setFilters] = useState<DutyFiltersState>({});
  const [selectedDutyForSwap, setSelectedDutyForSwap] = useState<Duty | null>(null);
  const [isSwapConfirmDialogOpen, setIsSwapConfirmDialogOpen] = useState(false);

  // Example: Fetching duties using tRPC
  // Replace 'dutyRouter.getAvailableDuties' with your actual tRPC procedure
  const { data: duties, isLoading, error } = trpc.dutyRouter.getAvailableDuties.useQuery(filters);
  
  // Example: tRPC mutation for requesting a swap
  const requestSwapMutation = trpc.dutyRouter.requestSwap.useMutation({
    onSuccess: () => {
      // Handle success (e.g., show notification, refetch duties)
      console.log("Swap requested successfully!");
      setIsSwapConfirmDialogOpen(false);
      // Potentially refetch or update UI optimistically
    },
    onError: (err: any) => {
      // Handle error
      console.error("Failed to request swap:", err);
    }
  });

  const handleFiltersChange = (newFilters: DutyFiltersState) => {
    setFilters(newFilters);
  };

  const handleRequestDuty = (dutyId: string) => {
    const dutyToSwap = duties?.find(d => d.id === dutyId);
    if (dutyToSwap) {
      setSelectedDutyForSwap(dutyToSwap);
      setIsSwapConfirmDialogOpen(true);
    }
  };
  
  const confirmSwapRequest = () => {
    if (selectedDutyForSwap) {
      // requestSwapMutation.mutate({ dutyId: selectedDutyForSwap.id, /* other necessary params */ });
      console.log("CONFIRMED SWAP FOR:", selectedDutyForSwap.id); // Replace with mutation
      // For now, just close
       setIsSwapConfirmDialogOpen(false);
       setSelectedDutyForSwap(null);
    }
  };


  if (error) return <div>Error loading duties: {error.message}</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Available Swaps</h1>
        <p className="text-muted-foreground">Browse and request duties offered by other crew members.</p>
      </div>
      
      <DutyFilters onFiltersChange={handleFiltersChange} />

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      ) : (
        <ScrollArea className="flex-grow pr-1"> {/* Adjust height or use flex-grow */}
          {duties && duties.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4"> {/* Responsive grid */}
                {duties.map((duty) => (
                <DutyCard key={duty.id} duty={duty as Duty} onRequestDuty={() => handleRequestDuty(duty.id as string)} />
                ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-60">
                <p className="text-lg font-semibold">No Duties Found</p>
                <p className="text-muted-foreground">Try adjusting your filters or check back later.</p>
            </div>
          )}
        </ScrollArea>
      )}

      {/* Swap Confirmation Dialog */}
      <Dialog open={isSwapConfirmDialogOpen} onOpenChange={setIsSwapConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Swap Request</DialogTitle>
            <DialogDescription>
              You are about to request the following duty:
              {selectedDutyForSwap && (
                <div className="mt-2 text-sm">
                  <p><strong>Type:</strong> {selectedDutyForSwap.type}</p>
                  <p><strong>Date:</strong> {selectedDutyForSwap.date}</p>
                  {/* Add more details of selectedDutyForSwap here */}
                  <p className="mt-4">The crew member offering this duty will be notified.
                     Their contact details will be shared upon your confirmation.</p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSwapConfirmDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmSwapRequest}>Confirm Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}