"use client";

import { User } from "@/libs/types";
import Image from "next/image";
export default function Profile({ user }: { user: User }) {


    return (
        <div className="flex flex-col items-center">
            <div className="relative w-16 h-16">
                <Image
                    src={user.picture || ""}
                    alt="profile picture"
                    fill
                    className="rounded-full object-cover"
                    sizes="32px"
                />
            </div>
            <div className="flex flex-col items-center gap-1">
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <h2 className="text-lg font-medium text-gray-500">Ramadan Garden</h2>
            </div>
            <div className="w-full h-px bg-gray-200" />
        </div>
    );
}