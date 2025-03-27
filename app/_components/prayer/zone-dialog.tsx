"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LocateIcon } from "lucide-react";
import { useState, useMemo } from "react";
import { ZONES } from "@/constant/zones";

interface ZoneDialogProps {
    currentZone: string;
    onZoneChange: (zoneId: string) => void;
}

export function ZoneDialog({ currentZone, onZoneChange }: ZoneDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const currentZoneName = ZONES.find(zone => zone.id === currentZone)?.negeri || "Select Zone";

    // Group zones by negeri
    const groupedZones = useMemo(() => {
        return ZONES.reduce((acc, zone) => {
            if (!acc[zone.negeri]) {
                acc[zone.negeri] = [];
            }
            acc[zone.negeri].push(zone);
            return acc;
        }, {} as Record<string, typeof ZONES>);
    }, []);

    const handleZoneChange = (zoneId: string) => {
        onZoneChange(zoneId);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 bg-card rounded-full py-1 px-4">
                    <LocateIcon className="h-4 w-4 flex-shrink-0" />
                    <p className="text-foreground text-sm font-semibold truncate max-w-[150px]">
                        {ZONES.find(zone => zone.id === currentZone)?.daerah || currentZoneName}
                    </p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Choose Zone</DialogTitle>
                </DialogHeader>
                <div className="py-4 max-w-sm mx-auto">
                    <Select value={currentZone} onValueChange={handleZoneChange}>
                        <SelectTrigger className="max-w-full">
                            <SelectValue placeholder="Select zone" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px] max-w-sm mx-auto bg-card">
                            {Object.entries(groupedZones).map(([negeri, zones]) => (
                                <SelectGroup key={negeri}>
                                    <SelectLabel className="font-semibold">{negeri}</SelectLabel>
                                    {zones.map((zone) => (
                                        <SelectItem
                                            key={zone.id}
                                            value={zone.id}
                                            className="pl-6"
                                        >
                                            {zone.daerah}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </DialogContent>
        </Dialog>
    );
}