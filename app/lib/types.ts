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
  totalTasksCompleted: number;
  totalPerfectDays: number;
  topTasks: Array<{ task: string; count: number }>;
  strugglingTasks: Array<{ task: string; completionRate: number }>;
}