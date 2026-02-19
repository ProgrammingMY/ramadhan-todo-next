"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Book,
    Clock,
    ChevronRight,
    MessageCircle,
    History,
    Moon,
} from "lucide-react";
import Link from "next/link";

const handbookItems = [
    {
        title: "Doa Harian",
        icon: <MessageCircle />,
        id: "daily-duas",
        description: "Collection of authentic daily duas",
        path: "/handbook/doa"
    },
    {
        title: "Zikir & Selawat",
        icon: <Book />,
        id: "dhikr",
        description: "Morning and evening remembrances",
        path: "/handbook/zikir"
    },
    {
        title: "Prayer Times",
        icon: <Clock />,
        id: "prayer-times",
        description: "Prayer schedule from JAKIM",
        path: "/handbook/prayer-times"
    },
    {
        title: "Lailatul Qadr",
        icon: <Moon />,
        id: "laitul-qadr",
        description: "Preparation for Lailatul Qadr, the most blessed night of the year",
        path: "/handbook/lailatul-qadr"
    },
];

export default function Handbook() {
    return (
        <div className="p-6 max-w-2xl mx-auto flex flex-col gap-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Sunnah Handbook</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {handbookItems.map((item) => (
                    <Link
                        href={item.path}
                        key={item.id}
                        className="bg-card border border-slate-200 dark:border-slate-700 rounded-md shadow-md overflow-hidden"
                    >
                        <div className="p-4 flex gap-4">
                            <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-primary/10 rounded-md">
                                {item.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                                <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                            </div>
                            <div className="flex items-center justify-center">
                                <ChevronRight className="w-6 h-6" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}