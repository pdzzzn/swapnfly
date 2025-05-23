// apps/web/src/components/duty/DutyCard.tsx
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
  } from "@/components/ui/card"; // Correct path
  import { Button } from "@/components/ui/button"; // Correct path
  import { Plane, Clock, MapPin, UserCheck, CalendarDays, Edit } from "lucide-react";
  
  // Duty interface (consider placing in a shared types folder if used by server too, or redefine for frontend)
  export interface Duty {
    id: string;
    type: "Flight" | "Standby";
    date: string;
    roleAvailable: string;
    time: string;
    startLocation?: string;
    endLocation?: string;
    standbyLocation?: string;
    flightNo?: string;
    aircraftType?: string;
    notes?: string;
    // Add other relevant fields from your Prisma schema
    // userId: string; // ID of the user offering the duty
    // status: string; // e.g., "AVAILABLE", "PENDING_CONFIRMATION"
  }
  
  interface DutyCardProps {
    duty: Duty;
    onOfferSwap?: (dutyId: string) => void;
    onRequestDuty?: (dutyId: string) => void;
    isMyDuty?: boolean;
  }
  
  export default function DutyCard({ duty, onOfferSwap, onRequestDuty, isMyDuty }: DutyCardProps) {
    const handleRequest = () => {
      if (onRequestDuty) {
        onRequestDuty(duty.id);
        // Here, you'd likely open a Dialog (modal) for confirmation
        // The Dialog would then show user details and make the tRPC call
      }
    };
  
    return (
      <Card className="mb-4 w-full"> {/* Ensure cards take appropriate width */}
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center text-lg">
                {duty.type === "Flight" ? <Plane className="mr-2 h-5 w-5 text-blue-600" /> : <Clock className="mr-2 h-5 w-5 text-orange-500" />}
                {duty.type === "Flight" ? duty.flightNo || "Flight" : "Standby Duty"}
              </CardTitle>
              <CardDescription className="flex items-center mt-1">
                <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" /> {duty.date} (UTC)
              </CardDescription>
            </div>
            <div className="text-sm text-muted-foreground flex items-center bg-accent p-1.5 rounded-md">
               <UserCheck className="mr-2 h-4 w-4" /> {duty.roleAvailable}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p className="flex items-center"><Clock className="mr-2 h-4 w-4 text-muted-foreground" /> {duty.time}</p>
            {duty.type === "Flight" && duty.startLocation && duty.endLocation && (
              <p className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                {duty.startLocation} → {duty.endLocation}
              </p>
            )}
            {duty.type === "Standby" && duty.standbyLocation && (
               <p className="flex items-center"><MapPin className="mr-2 h-4 w-4 text-muted-foreground" /> At: {duty.standbyLocation}</p>
            )}
            {duty.aircraftType && <p className="text-xs text-muted-foreground">Aircraft: {duty.aircraftType}</p>}
            {duty.notes && <p className="mt-2 text-xs italic border-l-2 pl-2">Notes: {duty.notes}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end pt-4">
          {isMyDuty && onOfferSwap && (
            <Button variant="outline" size="sm" onClick={() => onOfferSwap(duty.id)}>
              <Edit className="mr-2 h-4 w-4" /> Offer for Swap
            </Button>
          )}
          {!isMyDuty && ( // onRequestDuty prop can be removed if action is in modal
            <Button size="sm" onClick={handleRequest}>Request This Duty</Button>
          )}
        </CardFooter>
      </Card>
    );
  }