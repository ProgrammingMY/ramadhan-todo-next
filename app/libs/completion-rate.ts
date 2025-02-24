import { TaskProgress } from "./types";

// Function to calculate completion rate for a specific date
export const calculateCompletionRate = (tasks: TaskProgress[], date: string) => {
  const dayTasks = tasks.filter((task) => task.date === date);
  if (dayTasks.length === 0) return 0;

  const completedTasks = dayTasks.filter((task) => task.completed).length;
  return Math.round((completedTasks / 8) * 100);
};
