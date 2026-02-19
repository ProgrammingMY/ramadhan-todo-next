import { Moment } from "moment-hijri";

export async function fetchIsPeriod(date: Moment, userId: string) {
    try {
        const monthYear = date.format("iYYYY-iMM");
        console.log("monthYear", monthYear);
        console.log("userId", userId);
        const response = await fetch(`/api/period?userId=${userId}&date=${monthYear}`);

        if (!response.ok) {
            throw new Error("Failed to fetch isPeriod");
        }

        const data = await response.json() as { date: string, isPeriod: boolean }[];

        // Convert array of objects into a single object with date keys
        const periodDates = data.reduce((acc, item) => {
            acc[item.date] = item.isPeriod;
            return acc;
        }, {} as Record<string, boolean>);

        return periodDates;
    } catch (error) {
        console.error("Error fetching isPeriod:", error);
        return null;
    }
}