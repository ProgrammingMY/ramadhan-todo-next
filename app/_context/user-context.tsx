"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  username?: string;
  picture?: string;
  isAnonymous: boolean;
  gender?: string;
}

interface MonthProgress {
  date: string;
  completionRate: number;
}

type PeriodDates = Record<string, boolean>;

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  monthProgress: MonthProgress[];
  setMonthProgress: (progress: MonthProgress[]) => void;
  periodDates: PeriodDates;
  setPeriodDates: (dates: PeriodDates) => void;
  handlePeriodChange: (newPeriodDates: PeriodDates) => void;
  handleMonthProgressChange: (newMonthProgress: MonthProgress[]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [monthProgress, setMonthProgress] = useState<MonthProgress[]>([]);
  const [periodDates, setPeriodDates] = useState<PeriodDates>({});

  useEffect(() => {
    // Initialize user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      const anonymousUser = {
        id: crypto.randomUUID(),
        isAnonymous: true,
      };
      localStorage.setItem("user", JSON.stringify(anonymousUser));
      setUser(anonymousUser);
    }

    // Initialize month progress from localStorage
    const storedProgress = localStorage.getItem("monthProgress");
    if (storedProgress) {
      setMonthProgress(JSON.parse(storedProgress));
    }

    // Initialize period dates from localStorage
    const storedPeriodDates = localStorage.getItem("periodDates");
    if (storedPeriodDates) {
      setPeriodDates(JSON.parse(storedPeriodDates));
    }
  }, []);

  const handlePeriodChange = (newPeriodDates: PeriodDates) => {
    if (!newPeriodDates || Object.keys(newPeriodDates).length === 0) {
      localStorage.removeItem("periodDates");
      setPeriodDates({});
    } else {
      setPeriodDates(newPeriodDates);
      localStorage.setItem("periodDates", JSON.stringify(newPeriodDates));
    }
  }

  const handleMonthProgressChange = (newMonthProgress: MonthProgress[]) => {
    if (!newMonthProgress || newMonthProgress.length === 0) {
      localStorage.removeItem("monthProgress");
      setMonthProgress([]);
    } else {
      setMonthProgress(newMonthProgress);
      localStorage.setItem("monthProgress", JSON.stringify(newMonthProgress));
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        monthProgress,
        setMonthProgress,
        periodDates,
        setPeriodDates,
        handlePeriodChange,
        handleMonthProgressChange
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}