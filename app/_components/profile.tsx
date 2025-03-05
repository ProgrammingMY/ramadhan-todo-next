"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/libs/types";
export default function Profile({ user }: { user: User }) {


    return (
        <div className="flex flex-col items-center">
            <div className="relative w-16 h-16">
                <Avatar className="size-12">
                    <AvatarImage src={user.picture} />
                    <AvatarFallback>{user.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-col items-center gap-1">
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <h2 className="text-lg font-medium text-gray-500">Ramadan Garden</h2>
            </div>
            <div className="w-full h-px bg-gray-200" />
        </div>
    );
}