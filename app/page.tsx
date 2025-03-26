"use client";


import OnboardingModal from "./_components/onboarding-modal";
import { TodoList } from "./_components/todo-list";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import VersionDialog from "./_components/version-dialog";
import FeedbackPrompt from "./_components/feedback/feedback-prompt";
import { Bell, Book, Volume2, Compass, Gift, Grid, Sprout, Flower, MapPin, LocateIcon } from "lucide-react"; // Import icons
import { Progress } from "@/components/ui/progress";
import { Button } from "./components/ui/button";


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
      <div className="absolute inset-0 opacity-30" />

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
          {/*Location Section*/}
          <div className="py-2">
            <div className="flex justify-between items-center">
              <Button variant="ghost" className="flex items-center gap-2 bg-card rounded-full py-1 px-4">
                <LocateIcon className="h-4 w-4" />
                <p className="text-foreground text-sm font-semibold">Putrajaya</p>
              </Button>
            </div>
          </div>
          {/* Prayer Times */}
          <div className="flex justify-between mb-8">
            {[
              { name: "Subuh", time: "5:25", image: "/prayer-times/fajr.jpg" },
              { name: "Zohor", time: "1:30", image: "/prayer-times/dhuhr.jpg" },
              { name: "Asar", time: "4:45", image: "/prayer-times/asr.jpg" },
              { name: "Maghrib", time: "5:36", image: "/prayer-times/maghrib.jpg" },
              { name: "Isyak", time: "7:45", image: "/prayer-times/isha.jpg" },
            ].map((prayer) => (
              <div key={prayer.name} className="flex flex-col items-center justify-center bg-card border border-emerald-200 dark:border-emerald-700 rounded-full p-2  w-20 h-20">
                <h2 className="text-sm font-semibold">{prayer.name}</h2>
                <p className="text-xs font-medium">{prayer.time}</p>
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
    </div >
  );
}
