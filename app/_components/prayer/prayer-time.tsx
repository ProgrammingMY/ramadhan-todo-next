"use client";

import { useEffect, useState } from "react";
import { PrayerTime } from "@/lib/types";
import { useUser } from "@/_context/user-context";
import { Skeleton } from "@/components/ui/skeleton";

const API_URL = "https://solat.sunnahgarden.my/prayer-times";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function PrayerTimeComponent({
    prayerTimes,
    setPrayerTimes,
    setIsPrayerTimesLoading,
    isPrayerTimesLoading,
}: {
    prayerTimes: PrayerTime | null;
    setPrayerTimes: (prayerTimes: PrayerTime | null) => void;
    setIsPrayerTimesLoading: (isLoading: boolean) => void;
    isPrayerTimesLoading: boolean;
}) {
    const { zone } = useUser();

    const formatTime = (epochTime: string) => {
        const timestamp = parseInt(epochTime);
        const date = new Date(timestamp);

        // Format to HH:MM
        return date.toLocaleTimeString('en-US', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Kuala_Lumpur'
        });
    };

    useEffect(() => {
        const fetchPrayerTimes = async () => {
            try {
                setIsPrayerTimesLoading(true);
                // Get current date in DD-MM-YYYY format
                const today = new Date();
                const formattedDate = `${String(today.getDate()).padStart(2, '0')}-${months[today.getMonth()]}-${today.getFullYear()}`;

                const response = await fetch(
                    `${API_URL}?zone=${zone}&date=${formattedDate}`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch prayer times');
                }

                const data = await response.json() as PrayerTime[];
                setPrayerTimes(data[0]);
            } catch (error) {
                console.error('Error fetching prayer times:', error);
            } finally {
                setIsPrayerTimesLoading(false);
            }
        };

        fetchPrayerTimes();
    }, [zone]);

    if (isPrayerTimesLoading) {
        return (
            <div className="flex justify-between mb-8">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="bg-card border border-emerald-200 dark:border-emerald-700 rounded-full p-2 w-18 h-18 md:w-20 md:h-20" >
                        <Skeleton className="w-full h-full" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex justify-between mb-8">
            {[
                { name: "Subuh", time: formatTime(prayerTimes?.fajr || "") },
                { name: "Zohor", time: formatTime(prayerTimes?.dhuhr || "") },
                { name: "Asar", time: formatTime(prayerTimes?.asr || "") },
                { name: "Maghrib", time: formatTime(prayerTimes?.maghrib || "") },
                { name: "Isyak", time: formatTime(prayerTimes?.isha || "") },
            ].map((prayer) => (
                <div
                    key={prayer.name}
                    className="flex flex-col items-center justify-center bg-card border border-emerald-200 dark:border-emerald-700 rounded-full p-2 w-18 h-18 md:w-20 md:h-20"
                >
                    <h2 className="text-xs md:text-sm font-semibold">{prayer.name}</h2>
                    <p className="text-[0.6rem] md:text-xs mt-1">{prayer.time}</p>
                </div>
            ))}
        </div>
    );
}