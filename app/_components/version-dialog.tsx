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

export default function VersionDialog() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Check for version announcement after onboarding check
        const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
        const hasSeenVersion = localStorage.getItem("lastSeenVersion");

        // Only show version dialog if user has completed onboarding
        if (hasSeenOnboarding && hasSeenVersion !== "1.1") {
            setOpen(true);
            localStorage.setItem("lastSeenVersion", "1.1");
        }
    }, []);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>What's New in Ramadan Garden v1.1 🪴</DialogTitle>
                    <DialogDescription asChild>
                        <div className="space-y-3 pt-3">
                            <p>One new feature to help you stay istiqamah:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Notification reminders for your daily sunnah</li>
                                <li>Go to profile &gt; notification to manage your notifications</li>
                            </ul>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        onClick={() => setOpen(false)}
                        className="w-full"
                    >
                        Got it
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}