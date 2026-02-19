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
import { LocateIcon, Loader2 } from "lucide-react";
import { useState, useMemo } from "react";
import { ZONES } from "@/constant/zones";
import { useUser } from "@/_context/user-context";
import { getZoneFromCoordinates } from "@/lib/utils";
import { toast } from "sonner";

export function ZoneDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLocating, setIsLocating] = useState(false);
    const { zone, setZone } = useUser();
    const currentZoneName = ZONES.find(z => z.id === zone)?.negeri || "Select Zone";

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
        setZone(zoneId);
        setIsOpen(false);
    };

    const handleGetLocation = async () => {
        setIsLocating(true);
        try {
            console.log('[handleGetLocation] Requesting location...');

            // Request location permission
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    resolve,
                    reject,
                    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
                );
            });

            console.log('[handleGetLocation] Position received:', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy
            });

            // Get zone from coordinates
            const zoneId = await getZoneFromCoordinates(
                position.coords.latitude,
                position.coords.longitude
            );

            console.log('[handleGetLocation] Zone ID:', zoneId);

            if (zoneId) {
                setZone(zoneId);
                setIsOpen(false);
                toast.success("Location detected successfully!");
            } else {
                toast.error("Could not determine zone from your location. Please select manually.");
            }
        } catch (error: any) {
            console.error("[handleGetLocation] Error:", error);

            // Handle specific geolocation errors
            if (error.code === 1) {
                toast.error("Location permission denied. Please allow location access.");
            } else if (error.code === 2) {
                toast.error("Location unavailable. Please wait a few minutes and try again, or select your zone manually.");
            } else if (error.code === 3) {
                toast.error("Location request timed out. Please try again.");
            } else {
                toast.error("Failed to get your location. Please select your zone manually.");
            }
        } finally {
            setIsLocating(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 bg-card rounded-full py-1 px-4">
                    <LocateIcon className="h-4 w-4 flex-shrink-0" />
                    <p className="text-foreground text-sm font-semibold truncate max-w-[150px]">
                        {ZONES.find(z => z.id === zone)?.daerah || currentZoneName}
                    </p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Choose Zone</DialogTitle>
                </DialogHeader>
                <div className="py-4 max-w-sm mx-auto">
                    <div className="flex flex-col gap-4">
                        <Button
                            variant="default"
                            className="w-full"
                            onClick={handleGetLocation}
                            disabled={isLocating}
                        >
                            {isLocating ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                                <LocateIcon className="h-4 w-4 mr-2" />
                            )}
                            {isLocating ? "Detecting..." : "Use My Location"}
                        </Button>
                        <Select value={zone} onValueChange={handleZoneChange}>
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
                </div>
            </DialogContent>
        </Dialog>
    );
}