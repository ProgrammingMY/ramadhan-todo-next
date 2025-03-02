import { hijriToday } from "@/constant/hijri";
import { calculateCompletionRate } from "@/libs/completion-rate";
import { TaskProgress } from "@/libs/types";

export const getMonthProgress = (tasks: TaskProgress[]) => {
    const firstDay = hijriToday().startOf("iMonth");
    const totalDays = hijriToday().iDaysInMonth();

    const progress = Array.from({ length: totalDays }, (_, index) => {
        const date = firstDay.clone().add(index, "day").format("iYYYY-iMM-iDD");

        return {
            date,
            completionRate: calculateCompletionRate(tasks, date),
        };
    });

    return progress;
};