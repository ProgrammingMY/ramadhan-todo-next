import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/_context/user-context";

export default function TotalPeriod() {
    const { periodDates } = useUser();
    // get total period that is true
    const totalPeriod = Object.keys(periodDates).filter(key => periodDates[key]).length;

    return (
        <div className="flex flex-col gap-2">
            <Label className="text-md font-bold" htmlFor="name">Menstruation Days in Ramadan</Label>
            <div className={`grid grid-cols-3 gap-2`}>
                <Input
                    type="text"
                    value={totalPeriod}
                    className={`col-span-2 border-none`}
                    disabled={true}
                />
            </div>
        </div>
    )
}