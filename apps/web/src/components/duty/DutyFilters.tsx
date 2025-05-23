// apps/web/src/components/duty/DutyFilters.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker"; // Assuming you'll create/add this
import { Search } from "lucide-react";

export interface DutyFiltersState {
  startDate?: Date;
  endDate?: Date;
  startLocation?: string;
  role?: string;
  // Add other filterable fields
}

interface DutyFiltersProps {
  onFiltersChange: (filters: DutyFiltersState) => void;
  initialFilters?: DutyFiltersState;
}

export default function DutyFilters({ onFiltersChange, initialFilters }: DutyFiltersProps) {
  // Use React state to manage filter values, initialized by initialFilters
  // const [startDate, setStartDate] = useState<Date | undefined>(initialFilters?.startDate);
  // ... etc.

  const handleApply = () => {
    // onFiltersChange({ startDate, startLocation, role ... });
  };

  return (
    <div className="mb-6 p-4 border rounded-lg bg-card shadow">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
        {/* Example: <DatePicker date={startDate} onDateChange={setStartDate} label="Start Date" /> */}
        <Input
          placeholder="Start Location (IATA)"
          // value={startLocation}
          // onChange={(e) => setStartLocation(e.target.value)}
          className="h-10"
        />
        <Select /* onValueChange={setRole} value={role} */ >
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CPT">Captain</SelectItem>
            <SelectItem value="FO">First Officer</SelectItem>
            <SelectItem value="PU">Purser</SelectItem>
            <SelectItem value="FA">Flight Attendant</SelectItem>
            <SelectItem value="ALL">All Roles</SelectItem>
          </SelectContent>
        </Select>
        {/* Add more filters as needed (Duty Type, End Location etc.) */}
        <Button onClick={handleApply} className="h-10 lg:col-start-4">
          <Search className="mr-2 h-4 w-4"/> Apply Filters
        </Button>
      </div>
    </div>
  );
}