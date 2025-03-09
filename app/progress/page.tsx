"use client";

import { useState, useEffect } from "react";
import { TaskProgress, User } from "../libs/types";
import { DayProgress } from "../libs/types";
import Image from "next/image";
import level1 from "/public/flowers/1.png";
import level2 from "/public/flowers/2.png";
import level3 from "/public/flowers/3.png";
import level4 from "/public/flowers/4.png";
import level5 from "/public/flowers/5.png";
import Profile from "@/_components/profile";
import Cabinet from "@/_components/cabinets/cabinet";
import { generateInitialProgress } from "@/lib/generate-default-progress";
import { getMonthProgress } from "@/lib/get-month-progress";
import { HIJRI_MONTHS, hijriToday } from "@/constant/hijri";
import { useUser } from "@/_context/user-context";

const PLANT_STAGES = [
  { plant: level5, minCompletionRate: 99 },
  { plant: level4, minCompletionRate: 60 },
  { plant: level3, minCompletionRate: 40 },
  { plant: level2, minCompletionRate: 20 },
  { plant: level1, minCompletionRate: 1 },
];

export default function Progress() {
  const [monthProgress, setMonthProgress] = useState<DayProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { periodDates, handleMonthProgressChange } = useUser();

  // Function to fetch progress data
  const fetchProgressData = async (user: User | null) => {
    try {
      let tasks: TaskProgress[] = [];

      const yearMonth = hijriToday().format("iYYYY-iMM");

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
      const progress = getMonthProgress(tasks, periodDates);

      // save in context
      handleMonthProgressChange(progress);

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
        rate >= stage.minCompletionRate
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


      <div className="mb-4 w-full bg-card shadow-md  p-4 rounded-lg">
        <div className="flex flex-col items-center gap-2 text-sm">
          {user && !user.isAnonymous && <Profile user={user} />}
          <div className="text-primary font-bold text-lg">
            {hijriToday().iDate()}
            {" "}
            {HIJRI_MONTHS[hijriToday().iMonth()]}
            {" "}
            {hijriToday().iYear()}
          </div>
          {monthProgress.length > 0 && (
            <div className="text-primary text-sm">
              {(() => {
                const todayProgress = monthProgress[hijriToday().iDate() - 1]?.completionRate || 0;
                if (todayProgress >= 100) {
                  return "🎉 Congratulations! Your flower has fully bloomed today!";
                } else if (todayProgress >= 80) {
                  return "🌸 Almost there! Your flower is about to bloom!";
                } else if (todayProgress >= 60) {
                  return "🌱 Great progress! Your flower is growing steadily!";
                } else if (todayProgress >= 40) {
                  return "🌿 You're doing well! Keep nurturing your flower!";
                } else if (todayProgress > 0) {
                  return "🪴 Good start! Keep it up!";
                } else {
                  return "Start your day by doing your sunnah to grow your flower!";
                }
              })()}
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="p-4 text-primary">Loading your garden...</div>
      ) : (
        <div className="relative container">
          <Cabinet
            monthProgress={monthProgress}
            currentDay={hijriToday().iDate()}
            plantStages={PLANT_STAGES}
            getPlantStage={getPlantStage}
          />
        </div>
      )}
    </div>
  );
}
