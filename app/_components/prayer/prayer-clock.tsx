"use client";

import { useEffect, useState } from "react";
import { PrayerTime } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

interface PrayerClockProps {
    prayerTimes: PrayerTime | null;
    isLoading: boolean;
}

export function PrayerClock({ prayerTimes, isLoading }: PrayerClockProps) {
    const [countdown, setCountdown] = useState<string>("");
    const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string } | null>(null);

    const getNextPrayer = (now: Date) => {
        if (!prayerTimes) return null;

        const currentTimestamp = now.getTime();
        const prayers = [
            { name: "Subuh", time: prayerTimes.fajr },
            { name: "Zohor", time: prayerTimes.dhuhr },
            { name: "Asar", time: prayerTimes.asr },
            { name: "Maghrib", time: prayerTimes.maghrib },
            { name: "Isyak", time: prayerTimes.isha },
        ];

        for (const prayer of prayers) {
            const prayerTime = new Date(parseInt(prayer.time));
            if (prayerTime.getTime() > currentTimestamp) {
                return prayer;
            }
        }

        return prayers[0];
    };

    const formatPrayerTime = (timestamp: string) => {
        return new Date(parseInt(timestamp)).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kuala_Lumpur'
        });
    };

    const calculateCountdown = (now: Date, nextPrayerTime: string) => {
        const prayerTime = new Date(parseInt(nextPrayerTime));
        let diff = prayerTime.getTime() - now.getTime();

        if (diff < 0) {
            diff += 24 * 60 * 60 * 1000;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const next = getNextPrayer(now);
            if (next) {
                setNextPrayer(next);
                setCountdown(calculateCountdown(now, next.time));
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [prayerTimes]);

    if (!prayerTimes || !nextPrayer || !countdown || isLoading) {
        return (
            <div className="text-center my-8">
                <Skeleton className="h-12 w-48 bg-emerald-700 mx-auto mb-2" />
                <Skeleton className="h-4 w-32 bg-emerald-700 mx-auto" />
            </div>
        );
    }

    return (
        <div className="text-center my-8">
            <h2 className="text-slate-100 text-5xl font-bold">
                {countdown}
            </h2>
            <p className="text-slate-200 text-md font-semibold">
                {nextPrayer?.name} {nextPrayer?.time ? formatPrayerTime(nextPrayer.time) : ''}
            </p>
        </div>
    );
}