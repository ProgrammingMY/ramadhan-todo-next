import { hijriToday } from "@/constant/hijri";

export const generateInitialProgress = () => {
  // get first day of the month

  const firstDay = hijriToday().startOf("iMonth");
  const totalDays = hijriToday().iDaysInMonth();

  return Array.from({ length: totalDays }, (_, index) => ({
    date: firstDay.add(index, "day").format("iYYYY-iMM-iDD"),
    completionRate: 0,
  }));
};
