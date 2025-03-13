"use client";

import { Book, Home, Leaf, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavBar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed max-w-2xl mx-auto z-10 bottom-0 left-0 right-0 bg-primary border-t border-white/20 pb-safe">
      <div className="flex justify-around items-center h-16">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center flex-1  ${
            isActive("/") ? "text-white" : "text-white/70"
          }`}
        >
          <Home className="w-6 h-6 text-primary-foreground" />
          <span className="text-xs mt-1 text-primary-foreground">Home</span>
        </Link>
        <Link
          href="/progress"
          className={`flex flex-col items-center justify-center flex-1  ${
            isActive("/progress") ? "text-white" : "text-white/70"
          }`}
        >
          <Leaf className="w-6 h-6 text-primary-foreground" />
          <span className="text-xs mt-1 text-primary-foreground">Garden</span>
        </Link>
        <Link
          href="/messages"
          className={`flex flex-col items-center justify-center flex-1  ${
            isActive("/messages") ? "text-white" : "text-white/70"
          }`}
        >
          <Book className="w-6 h-6 text-primary-foreground" />
          <span className="text-xs mt-1 text-primary-foreground">Doa</span>
        </Link>
        <Link
          href="/profile"
          className={`flex flex-col items-center justify-center flex-1  ${
            isActive("/profile") ? "text-white" : "text-white/70"
          }`}
        >
          <User className="w-6 h-6 text-primary-foreground" />
          <span className="text-xs mt-1 text-primary-foreground">Profile</span>
        </Link>
      </div>
    </nav>
  );
}
