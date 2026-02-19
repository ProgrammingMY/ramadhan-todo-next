"use client";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import FeedbackForm from "./feedback-form";

export default function FeedbackPrompt() {
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        // Check if we've shown the prompt before
        const hasShownPrompt = localStorage.getItem("feedbackPromptShown");

        if (!hasShownPrompt) {
            setShowPrompt(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem("feedbackPromptShown", "true");
        setShowPrompt(false);
    };

    return (
        <AlertDialog open={showPrompt} onOpenChange={handleClose}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center text-xl mb-4">
                        Enjoying the app?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        We'd love to hear your thoughts! Would you like to give us some feedback?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <FeedbackForm onComplete={handleClose} />
                <AlertDialogFooter>
                    <AlertDialogCancel className="w-full" onClick={handleClose}>Maybe later</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}