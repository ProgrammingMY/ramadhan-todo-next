import { Moment } from "moment-hijri";

export async function fetchIsPeriod(date: Moment, userId: string) {
    try {
        const monthYear = date.format("iYYYY-iMM");
        const response = await fetch(`/api/period?userId=${userId}&monthYear=${monthYear}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching isPeriod:", error);
        return null;
    }
}