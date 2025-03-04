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

export default function OnboardingModal() {
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        // Check if user has seen onboarding
        const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
        if (!hasSeenOnboarding) {
            setOpen(true);
            localStorage.setItem("hasSeenOnboarding", "true");
        }
    }, []);

    const pages = [
        {
            title: "Welcome to Ramadan Garden! 🌸",
            description: "Your personal sahabat for helping you stay consistent with your sunnah during Ramadan.\nHere you can track your daily acts of sunnah and build good habits."
        },
        {
            title: "Raise Your Garden 🌱",
            description: "Grow your garden by doing more acts of sunnah. The more you do, the more your garden will grow."
        },
        {
            title: "Login to Sync Your Data 🔑",
            description: "Login to sync your data across all your devices."
        },
        {
            title: "Install This App 📱",
            description: "Install this app to your home screen to have a better experience."
        },
    ];

    const handleNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            setOpen(false);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] bg-slate-200 dark:border-slate-700 dark:bg-slate-950">
                <DialogHeader>
                    <DialogTitle>{pages[currentPage].title}</DialogTitle>
                    <DialogDescription className="space-y-3 pt-3">
                        {pages[currentPage].description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    {currentPage > 0 && (
                        <Button
                            variant="outline"
                            onClick={handlePrevious}
                            className="sm:w-full"
                        >
                            Previous
                        </Button>
                    )}
                    <Button
                        onClick={handleNext}
                        className="sm:w-full"
                    >
                        {currentPage === pages.length - 1 ? "Get Started" : "Next"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}