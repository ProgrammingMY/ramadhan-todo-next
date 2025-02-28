"use client";

import { useState, useEffect } from "react";
import { TaskProgress, User } from "../libs/types";
import { DayProgress } from "../libs/types";
import { calculateCompletionRate } from "../libs/completion-rate";
import Image from "next/image";
import level1 from "/public/flowers/1.png";
import level2 from "/public/flowers/2.png";
import level3 from "/public/flowers/3.png";
import level4 from "/public/flowers/4.png";
import level5 from "/public/flowers/5.png";
import { Card } from "@/components/ui/card";
import Profile from "@/_components/profile";
import Cabinet from "@/_components/cabinets/cabinet";
import { generateInitialProgress } from "@/lib/generate-default-progress";
import { getMonthProgress } from "@/lib/get-month-progress";

const PLANT_STAGES = [
  { plant: level1, minCompletionRate: 1, maxCompletionRate: 20 },
  { plant: level2, minCompletionRate: 20, maxCompletionRate: 40 },
  { plant: level3, minCompletionRate: 40, maxCompletionRate: 60 },
  { plant: level4, minCompletionRate: 60, maxCompletionRate: 99 },
  { plant: level5, minCompletionRate: 99, maxCompletionRate: 100 },

];

export default function Progress() {
  const [monthProgress, setMonthProgress] = useState<DayProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);


  // Function to fetch progress data
  const fetchProgressData = async (user: User | null) => {
    try {
      let tasks: TaskProgress[] = [];

      // get today's date
      const today = new Date();
      const yearMonth = today
        .toISOString()
        .split("T")[0]
        .split("-")
        .slice(0, 2)
        .join("-");

      if (navigator.onLine && user) {
        const { id } = user;

        // Try to fetch from API
        const response = await fetch(
          `/api/progress?yearMonth=${yearMonth}&id=${id}`
        );
        if (!response.ok) throw new Error("API fetch failed");
        tasks = await response.json();
      } else {
        // Try to get from localStorage
        return JSON.parse(localStorage.getItem("monthProgress") || "[]");
      }

      // Calculate completion rates for each day
      const progress = getMonthProgress(tasks);

      // Save to localStorage as backup
      localStorage.setItem("monthProgress", JSON.stringify(progress));
      return progress;
    } catch (error) {
      console.error("Failed to fetch from API:", error);

      // Try to get from localStorage
      const cached = localStorage.getItem("monthProgress");
      if (cached) {
        return JSON.parse(cached);
      }

      // Return initial data if both API and localStorage fail
      return generateInitialProgress();
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");

    const loadProgress = async (user: User | null) => {
      setIsLoading(true);
      const progress = await fetchProgressData(user);
      setMonthProgress(progress);
      setIsLoading(false);
    };

    loadProgress(JSON.parse(userData ?? "null"));

    if (userData) {
      setUser(JSON.parse(userData));
    }

  }, []);

  // Function to get plant stage based on completion rate
  const getPlantStage = (rate: number) => {
    const stage = PLANT_STAGES.find(
      (stage) =>
        rate >= stage.minCompletionRate && rate <= stage.maxCompletionRate
    );

    if (stage) {
      return (
        <div className="flex flex-col items-center group">
          <span className="text-2xl transform group-hover:scale-110 transition-transform drop-shadow-md">
            <Image src={stage.plant} alt="Plant" width={48} height={48} />
          </span>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center group" title="Empty plot">
        {/* Empty pot */}
        <Image src={level1} className="invisible" alt="Empty pot" width={48} height={48} />
      </div>
    );
  };


  return (
    <div className="container mx-auto flex flex-col items-center gap-6 p-8">
      {user && <Profile user={user} />}

      <div className="mb-4 bg-emerald-50 p-2 rounded-lg">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex flex-col items-center gap-2">
            <Image src={level1} alt="Plant" width={32} height={32} />
            <span className="text-primary text-xs">20%</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image src={level2} alt="Plant" width={32} height={32} />
            <span className="text-primary text-xs">40%</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image src={level3} alt="Plant" width={32} height={32} />
            <span className="text-primary text-xs">60%</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image src={level4} alt="Plant" width={32} height={32} />
            <span className="text-primary text-xs">80%</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image src={level5} alt="Plant" width={32} height={32} />
            <span className="text-primary text-xs">100%</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="p-4 text-primary">Loading your garden...</div>
      ) : (
        <div className="relative container">
          <Cabinet
            monthProgress={monthProgress}
            currentDay={new Date().getDate()}
            plantStages={PLANT_STAGES}
            getPlantStage={getPlantStage}
          />
        </div>
      )}
    </div>
  );
}
