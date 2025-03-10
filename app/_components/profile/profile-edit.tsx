import { ChevronRight } from "lucide-react";
import GenderForm from "./gender-form";
import NameForm from "./name-form";
import TotalPeriod from "./total-period";
import { useEffect, useState } from "react";
import { useUser } from "@/_context/user-context";

export default function ProfileEdit() {
    const [isFemale, setIsFemale] = useState(false);
    const { user } = useUser();
    useEffect(() => {
        if (user?.gender === "female") {
            setIsFemale(true);
        }
    }, [user]);

    return (
        < div className="bg-card border border-slate-200 dark:border-slate-700 rounded-md shadow-md overflow-hidden" >
            <div className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">Profile Information</h3>
                </div>
                <ChevronRight className={`transform transition-transform`} />
            </div>
            <div className="p-4 space-y-4 border-t border-slate-200 dark:border-slate-700">
                <NameForm />
                <GenderForm />
                {isFemale && <TotalPeriod />}
            </div>
        </div >
    )
}