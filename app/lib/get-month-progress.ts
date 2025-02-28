import { calculateCompletionRate } from "@/libs/completion-rate";
import { TaskProgress } from "@/libs/types";

export const getMonthProgress = (tasks: TaskProgress[]) => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const totalDays = lastDay.getDate();

    const progress = Array.from({ length: totalDays }, (_, index) => {
        const date = new Date(
            firstDay.getFullYear(),
            firstDay.getMonth(),
            index + 2
        )
            .toISOString()
            .split("T")[0];

        return {
            date,
            completionRate: calculateCompletionRate(tasks, date),
        };
    });

    return progress;
};