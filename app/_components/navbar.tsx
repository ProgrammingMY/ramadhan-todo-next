"use client";

import { Book, Home, Leaf, MessageCircle, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Home",
    icon: Home,
    href: "/",
  },
  {
    label: "Garden",
    icon: Leaf,
    href: "/progress",
  },
  {
    label: "Handbook",
    icon: Book,
    href: "/handbook",
  },
  {
    label: "Profile",
    icon: User,
    href: "/profile",
  },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed max-w-2xl mx-auto z-10 bottom-0 left-0 right-0 bg-primary border-t border-white/20 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1  ${isActive(item.href) ? "text-white" : "text-white/70"
              }`}
          >
            <item.icon className="w-6 h-6 text-primary-foreground" />
            <span className="text-xs mt-1 text-primary-foreground">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
