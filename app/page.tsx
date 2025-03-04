"use client";

// export const dynamic = "force-static";

import OnboardingModal from "./_components/onboarding-modal";
import { TodoList } from "./_components/todo-list";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import VersionDialog from "./_components/version-dialog";


export default function Page() {
  const [username, setUsername] = useState<string>("");
  const [picture, setPicture] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
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
    <div className="pb-16 p-6">
      <div className="flex items-center gap-3">
        <Avatar className="size-12">
          <AvatarImage src={picture} />
          <AvatarFallback>{username?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg text-muted-foreground">Assalamu'alaikum,</p>
          <h2 className="font-semibold text-2xl">{username}</h2>
        </div>
      </div>
      <VersionDialog />
      <OnboardingModal />
      <TodoList />
    </div>
  );
}
