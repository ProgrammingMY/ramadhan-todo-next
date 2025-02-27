"use client";

import { useState, useEffect } from "react";
import { TaskProgress } from "../libs/types";
import { DayProgress } from "../libs/types";
import { calculateCompletionRate } from "../libs/completion-rate";
import Image from "next/image";
import level1 from "/public/flowers/1.png";
import level2 from "/public/flowers/2.png";
import level3 from "/public/flowers/3.png";
import level4 from "/public/flowers/4.png";
import level5 from "/public/flowers/5.png";
import { Card } from "@/components/ui/card";


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
  const [name, setName] = useState("");

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
    const user = localStorage.getItem("user");
    if (user) {
      setName(JSON.parse(user).username);
    }


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
            <Image src={stage.plant} alt="Plant" width={48} height={48} />
          </span>
          {/* Flower pot */}
          <div className="h-2 w-6 bg-orange-800/70 rounded-full mt-[-1px] z-10" />
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center group" title="Empty plot">
        {/* Empty pot */}
        <Image src={level1} className="invisible" alt="Empty pot" width={48} height={48} />
        <div className="h-2 w-6 bg-orange-800/70 rounded-full mt-[-1px] z-10" />
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
              className="w-12 h-16 flex flex-col items-center justify-center relative group"
              title={`${dateStr}: ${dayProgress?.completionRate || 0
                }% completed`}
            >
              {getPlantStage(Number(dayProgress?.completionRate) || 0)}
              {/* Day number - positioned below the pot */}
              <span className="text-xs text-primary mt-1">
                {dayIndex + 1}
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
          {tierPots}
        </div>
      );
    }

    return tiersOfPots;
  };

  return (
    <div className="container mx-auto flex flex-col items-center gap-6 p-8">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-background">{name ? `${name}'s` : "My"} Ramadan Garden</h1>

      <div className="mb-4 bg-emerald-50 p-4 rounded-lg">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex flex-col items-center gap-2">
            <Image src={level1} alt="Plant" width={36} height={36} />
            <span className="text-primary">20%</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image src={level2} alt="Plant" width={36} height={36} />
            <span className="text-primary">40%</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image src={level3} alt="Plant" width={36} height={36} />
            <span className="text-primary">60%</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image src={level4} alt="Plant" width={36} height={36} />
            <span className="text-primary">80%</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Image src={level5} alt="Plant" width={36} height={36} />
            <span className="text-primary">100%</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="p-4 text-primary">Loading your garden...</div>
      ) : (
        <Card className="container border-0 flex flex-col gap-8 p-4 bg-emerald-50 shadow-lg">
          {generateGardenGrid()}
        </Card>
      )}
    </div>
  );
}
