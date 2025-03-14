export interface DayProgress {
  date: string;
  completionRate: number;
}

export interface TaskProgress {
  date: string;
  completed: boolean;
}

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  isPeriodCan: boolean;
}

export interface User {
  username?: string;
  id: string;
  picture?: string;
  isAnonymous: boolean;
  gender?: string;
}

export interface UserStats {
  name: string;
  userId: string;
  startDate: string;
  mode: "weekly" | "monthly";
  totalTasksCompleted: number;
  totalPerfectDays: number;
  strugglingTasks: Array<{ name: string; completionRate: string }>;
}