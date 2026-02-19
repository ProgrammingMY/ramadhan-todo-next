"use client";

import React, { createContext, useContext, useRef, useState } from 'react';

type ProgressContextType = {
    progressBarRef: React.RefObject<HTMLDivElement | null>;
    triggerProgressAnimation: () => void;
    isAnimating: boolean;
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
    const progressBarRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const triggerProgressAnimation = () => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
    };

    return (
        <ProgressContext.Provider value={{ progressBarRef, triggerProgressAnimation, isAnimating }}>
            {children}
        </ProgressContext.Provider>
    );
}

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};