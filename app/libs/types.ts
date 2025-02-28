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
}

export interface User {
  username: string;
  id: string;
  picture: string;
}