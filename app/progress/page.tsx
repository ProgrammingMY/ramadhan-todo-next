"use client";

import { useState, useEffect } from "react";
import { TaskProgress } from "../libs/types";
import { DayProgress } from "../libs/types";
import { calculateCompletionRate } from "../libs/completion-rate";

// emoji codes
// 🌿 - Seedling
// 🌱 - Growing plant
// 🌸 - Blooming flower
const PLANT_STAGES = [
  { emoji: "🌿", minCompletionRate: 1, maxCompletionRate: 66 },
  { emoji: "🌱", minCompletionRate: 66, maxCompletionRate: 99 },
  { emoji: "🌸", minCompletionRate: 99, maxCompletionRate: 100 },
];

export default function Progress() {
  const [monthProgress, setMonthProgress] = useState<DayProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  // Function to generate initial progress data
  const generateInitialProgress = () => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const totalDays = lastDay.getDate();

    return Array.from({ length: totalDays }, (_, index) => ({
      date: new Date(firstDay.getFullYear(), firstDay.getMonth(), index + 1)
        .toISOString()
        .split("T")[0],
      completionRate: 0,
    }));
  };

  // Function to fetch progress data
  const fetchProgressData = async () => {
    try {
      // get user from local storage
      const user = localStorage.getItem("user");

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
        const { id } = JSON.parse(user as string);

        // Try to fetch from API
        const response = await fetch(
          `/api/progress?yearMonth=${yearMonth}&id=${id}`
        );
        if (!response.ok) throw new Error("API fetch failed");
        tasks = await response.json();
      } else {
        // Try to get from localStorage
        tasks = JSON.parse(localStorage.getItem("monthProgress") || "[]");
      }

      // Calculate completion rates for each day
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      const totalDays = lastDay.getDate();

      const progress = Array.from({ length: totalDays }, (_, index) => {
        const date = new Date(
          firstDay.getFullYear(),
          firstDay.getMonth(),
          index + 1
        )
          .toISOString()
          .split("T")[0];

        return {
          date,
          completionRate: calculateCompletionRate(tasks, date),
        };
      });

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
    const loadProgress = async () => {
      setIsLoading(true);
      const progress = await fetchProgressData();
      setMonthProgress(progress);
      setIsLoading(false);
    };

    loadProgress();
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
          <span className="text-2xl transform group-hover:scale-110 transition-transform drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
            {stage.emoji}
          </span>
          {/* Flower pot */}
          <div className="h-2 w-6 bg-orange-800/70 rounded-full mt-1" />
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center group" title="Empty plot">
        {/* Empty pot */}
        <span className="invisible text-2xl">🌿</span>
        <div className="h-2 w-6 bg-orange-800/70 rounded-full mt-1" />
      </div>
    );
  };

  // Function to generate garden grid with tiers
  const generateGardenGrid = () => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const totalDays = lastDay.getDate();

    // Organize days into rows (tiers)
    const tiersOfPots = [];
    const potsPerRow = 7;
    const numberOfTiers = Math.ceil(totalDays / potsPerRow);

    for (let tier = 0; tier < numberOfTiers; tier++) {
      const tierPots = [];
      for (let pot = 0; pot < potsPerRow; pot++) {
        const dayIndex = tier * potsPerRow + pot;
        if (dayIndex < totalDays) {
          const dateStr = new Date(
            firstDay.getFullYear(),
            firstDay.getMonth(),
            dayIndex + 1
          )
            .toISOString()
            .split("T")[0];

          const dayProgress = monthProgress.find((p) => p.date === dateStr);
          tierPots.push(
            <div
              key={dateStr}
              className="w-12 h-16 flex items-center justify-center relative group"
              title={`${dateStr}: ${dayProgress?.completionRate || 0
                }% completed`}
            >
              {getPlantStage(Number(dayProgress?.completionRate) || 0)}
              <span className="absolute -top-5 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white/90 bg-black/50 px-2 rounded">
                Day {dayIndex + 1}
              </span>
            </div>
          );
        }
      }
      tiersOfPots.push(
        <div
          key={`tier-${tier}`}
          className="flex justify-center items-end relative"
        >
          {/* Shelf decoration */}
          <div className="absolute -bottom-3 w-full h-1 bg-emerald-900/30 rounded-md shadow-md" />
          {tierPots}
        </div>
      );
    }

    return tiersOfPots;
  };

  return (
    <div className="container mx-auto flex flex-col items-center gap-6 p-8">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white/90">My Ramadhan Garden</h1>

      <div className="mb-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-900/30 rounded-md flex items-center justify-center border border-emerald-700/30">
              <div className="h-1 w-3 bg-emerald-800/50 rounded-full" />
            </div>
            <span className="text-white/90">Empty Plot</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <span className="text-white/90">33%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌱</span>
            <span className="text-white/90">66%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌸</span>
            <span className="text-white/90">100%</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="p-4 text-white/90">Loading your garden...</div>
      ) : (
        <div className="flex flex-col gap-8 p-8 bg-emerald-900/20 rounded-xl border border-emerald-700/30 backdrop-blur-sm shadow-lg">
          {generateGardenGrid()}
        </div>
      )}
    </div>
  );
}
