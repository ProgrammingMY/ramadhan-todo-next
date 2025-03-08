import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "@/libs/types";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import GenderForm from "./gender-form";
import { Label } from "@/components/ui/label";
import NameForm from "./name-form";

export default function ProfileEdit({
    user
}: {
    user: User
}) {
    
    return (
        < div className="bg-card border border-slate-200 dark:border-slate-700 rounded-md shadow-md overflow-hidden" >
            <div className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">Profile Information</h3>
                </div>
                <ChevronRight className={`transform transition-transform`} />
            </div>
            <div className="p-4 space-y-4 border-t border-slate-200 dark:border-slate-700">
                <NameForm user={user} />
                <GenderForm user={user} />
            </div>
        </div >
    )
}