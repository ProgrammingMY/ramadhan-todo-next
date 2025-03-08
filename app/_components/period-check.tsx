import { Switch } from "@/components/ui/switch";
import { useState } from "react";
export default function PeriodCheck() {
    const [isPeriod, setIsPeriod] = useState(false);

    return (
        <div className="p-4 flex items-center justify-between gap-2 bg-yellow-100 border-l-4 border-yellow-500 rounded-md">
            <h1 className="text-yellow-700 font-bold">Are you on your period?</h1>
            <Switch
                className="data-[state=checked]:bg-yellow-700 data-[state=unchecked]:bg-slate-300"
                checked={isPeriod}
                onCheckedChange={setIsPeriod}
            />
        </div>
    )
}