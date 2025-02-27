"use client";

export const dynamic = "force-static";

import OnboardingModal from "./_components/onboarding-modal";
import { TodoList } from "./_components/todo-list";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";


export default function Page() {
  const [username, setUsername] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const { username: storedUsername } = JSON.parse(user);
      setUsername(storedUsername);
    }
    setMounted(true);
  }, []);

  // Don't render anything until after client-side hydration
  if (!mounted) {
    return null;
  }


  return (
    <div className="pb-16">
      <div className="p-4 flex items-center gap-3">
        <Avatar>
          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${username}`} />
          <AvatarFallback>{username?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm text-muted-foreground">Assalamu'alaikum,</p>
          <h2 className="font-semibold">{username}</h2>
        </div>
      </div>
      <OnboardingModal />
      <TodoList />
    </div>
  );
}
