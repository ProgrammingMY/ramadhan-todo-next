"use client";


import OnboardingModal from "./_components/onboarding-modal";
import { TodoList } from "./_components/todo-list";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import VersionDialog from "./_components/version-dialog";
import FeedbackPrompt from "./_components/feedback/feedback-prompt";
import { Bell, Book, Volume2, Compass, Gift, Grid, Sprout, Flower } from "lucide-react"; // Import icons
import { Progress } from "@/components/ui/progress";


// Add this type for sunnah progress
type SunnahProgress = {
  name: string;
  current: number;
  total: number;
  description: string;
};
const sunnahProgress: SunnahProgress[] = [
  {
    name: "Daily Dhikr",
    current: 33,
    total: 100,
    description: "Morning & Evening adhkar"
  },
  {
    name: "Duha Prayer",
    current: 0,
    total: 100,
    description: "2-4 rakaat daily"
  },
  {
    name: "Tahajjud",
    current: 75,
    total: 100,
    description: "Night prayer"
  },
  {
    name: "Fasting Monday",
    current: 50,
    total: 100,
    description: "Weekly sunnah fast"
  },
  {
    name: "Reading Quran",
    current: 25,
    total: 100,
    description: "Daily reading goal"
  },
  {
    name: "Good Deeds",
    current: 60,
    total: 100,
    description: "Daily acts of kindness"
  }
];


export default function Page() {
  const [username, setUsername] = useState<string>("");
  const [picture, setPicture] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      const anonymousUser = {
        id: crypto.randomUUID(),
        isAnonymous: true,
      }
      localStorage.setItem("user", JSON.stringify(anonymousUser));
    } else if (user && !JSON.parse(user).isAnonymous) {
      const { username: storedUsername, picture: storedPicture } = JSON.parse(user);
      setUsername(storedUsername);
      setPicture(storedPicture);
    }
    setMounted(true);
  }, []);

  // Don't render anything until after client-side hydration
  if (!mounted) {
    return null;
  }


  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-emerald-600 to-emerald-100 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-900 relative overflow-hidden">
      {/* Stars background - add via CSS */}
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-30" />

      {/* Main Content */}
      <div className="relative">
        {/* Header Section */}
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarImage src={picture} />
                <AvatarFallback>{username?.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-slate-100 text-sm">Assalamualaikum</p>
                <h1 className="text-white text-2xl font-semibold">{username}</h1>
              </div>
            </div>
            <div className="text-right">
              <p className="text-slate-100 text-md font-semibold">15 Ramadan</p>
              <p className="text-slate-200 text-xs font-semibold">1445 H</p>
            </div>
          </div>

          {/* Current Time */}
          <div className="text-center my-8">
            <h2 className="text-slate-100 text-5xl font-bold">1:57:10</h2>
            <p className="text-slate-200 text-md font-semibold">Zohor 1:22 PM</p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-background rounded-t-[2.5rem] min-h-screen p-6">
          {/* Prayer Times */}
          <div className="flex justify-between mb-8">
            {[
              { name: "Fajr", time: "5:25", image: "/prayer-times/fajr.jpg" },
              { name: "Dhuhr", time: "1:30", image: "/prayer-times/dhuhr.jpg" },
              { name: "Asr", time: "4:45", image: "/prayer-times/asr.jpg" },
              { name: "Maghrib", time: "5:36", image: "/prayer-times/maghrib.jpg" },
              { name: "Isha", time: "7:45", image: "/prayer-times/isha.jpg" },
            ].map((prayer) => (
              <div key={prayer.name} className="text-center">
                <div className="w-14 h-14 rounded-full mb-1 overflow-hidden">
                  <img
                    src={prayer.image}
                    alt={prayer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs font-medium">{prayer.time}</p>
                <p className="text-xs text-gray-600">{prayer.name}</p>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="space-y-4 mb-8 bg-card rounded-xl p-4 text-card-foreground shadow-lg">
            <h3 className="font-medium text-lg">Garden Progress</h3>
            <div className="relative">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Sprout className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-2">
                  <Flower className="h-5 w-5" />
                </div>
              </div>
              <Progress
                value={35}
                className="h-3 bg-emerald-50 dark:bg-emerald-800 border-emerald-200 dark:border-emerald-700 border"
                indicatorClassName="bg-gradient-to-r from-emerald-300 to-emerald-500 dark:from-emerald-600 dark:to-emerald-400"
              />
            </div>
          </div>

          {/* Recommended Sunnah Section */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Recommended Sunnah</h3>
            <TodoList />
          </div>
        </div>
      </div>
    </div>
  );
}
