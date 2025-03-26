"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VERSION_UPDATE_LOG } from "@/constant/version-update-log";
import { Moon } from "lucide-react";
import { useRouter } from "next/navigation";

const CURRENT_VERSION = "1.4.1";

export default function VersionDialog() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    useEffect(() => {
        // Check for version announcement after onboarding check
        const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
        const hasSeenVersion = localStorage.getItem("lastSeenVersion");

        // Only show version dialog if user has completed onboarding
        if (hasSeenOnboarding && hasSeenVersion !== CURRENT_VERSION) {
            setOpen(true);
            localStorage.setItem("lastSeenVersion", CURRENT_VERSION);
        }
    }, []);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <div className="flex justify-center w-full mb-4">
                    <div className="w-16 h-16 flex items-center justify-center bg-slate-300 dark:bg-slate-800 rounded-full">
                        <Moon className="h-8 w-8 " />
                    </div>
                </div>
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-bold">Persiapan 10 Hari Terakhir Ramadan 💫</DialogTitle>
                    <DialogDescription asChild>
                        <div className="space-y-3 pt-3">
                            <p>{VERSION_UPDATE_LOG[CURRENT_VERSION].subject}</p>
                            <ul className="list-disc pl-5 space-y-1 text-left">
                                {VERSION_UPDATE_LOG[CURRENT_VERSION].changes.map((change) => (
                                    <li key={change}>{change}</li>
                                ))}
                            </ul>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        onClick={() => {
                            setOpen(false);
                            router.push("/handbook");
                        }}
                        className="w-full"
                    >
                        Got it
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}