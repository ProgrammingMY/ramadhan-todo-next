import { hijriToday } from "@/constant/hijri";
import { DEFAULT_TODOS } from "@/constant/todo";
import { calculateCompletionRate } from "@/lib/completion-rate";
import { TaskProgress } from "@/lib/types";

export const getMonthProgress = (tasks: TaskProgress[], periodDates: Record<string, boolean>) => {
    const firstDay = hijriToday().startOf("iMonth");
    const totalDays = hijriToday().iDaysInMonth();

    const totalPeriodTasks = DEFAULT_TODOS.filter(task => task.isPeriodCan).length;
    const totalAllTasks = DEFAULT_TODOS.length;

    const progress = Array.from({ length: totalDays }, (_, index) => {
        const date = firstDay.clone().add(index, "day").format("iYYYY-iMM-iDD");

        const totalTask = periodDates && periodDates[date] ? totalPeriodTasks : totalAllTasks;

        return {
            date,
            completionRate: calculateCompletionRate(tasks, date, totalTask),
        };
    });

    return progress;
};