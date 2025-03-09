import { useUser } from "@/_context/user-context";
import { Switch } from "@/components/ui/switch";
import { User } from "@/libs/types";
import { Moment } from "moment-hijri";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface PeriodCheckProps {
    selectedDate: Moment;
    onPeriodChange: (isPeriod: boolean) => void;
    user: User;
}

export default function PeriodCheck({ selectedDate, onPeriodChange, user }: PeriodCheckProps) {
    const [isPeriod, setIsPeriod] = useState(false);
    const { periodDates, handlePeriodChange: handlePeriodChangeContext } = useUser();

    useEffect(() => {
        // Load period status for the selected date
        const periodDates = JSON.parse(localStorage.getItem("periodDates") || "{}");
        setIsPeriod(!!periodDates[selectedDate.format("iYYYY-iMM-iDD")]);
    }, [selectedDate]);

    const handlePeriodChange = async (checked: boolean) => {
        setIsPeriod(checked);
        // Save period status for the date
        if (checked) {
            periodDates[selectedDate.format("iYYYY-iMM-iDD")] = true;
        } else {
            delete periodDates[selectedDate.format("iYYYY-iMM-iDD")];
        }

        // add to context
        handlePeriodChangeContext(periodDates);

        try {

            await fetch(
                `/api/period`,
                {
                    method: "PATCH",
                    body: JSON.stringify({ userId: user.id, date: selectedDate.format("iYYYY-iMM-iDD"), isPeriod: checked })
                }
            );
        } catch (error) {
            toast.error("Error updating period");
        }
        onPeriodChange(checked);
    };

    return (
        <div className="p-4 flex items-center justify-between gap-2 bg-yellow-100 border-l-4 border-yellow-500 rounded-md">
            <h1 className="text-yellow-700 font-bold">Are you currently menstruating?</h1>
            <Switch
                className="data-[state=checked]:bg-yellow-700 data-[state=unchecked]:bg-slate-300"
                checked={isPeriod}
                onCheckedChange={handlePeriodChange}
            />
        </div>
    )
}