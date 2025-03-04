import { Button } from "@/components/ui/button";
import { HIJRI_MONTHS, hijriToday } from "@/constant/hijri";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Moment } from "moment-hijri";

export default function DateSelection({
    selectedDate,
    goToPreviousDay,
    goToNextDay,
    goToToday,
}: {
    selectedDate: Moment;
    goToPreviousDay: () => void;
    goToNextDay: () => void;
    goToToday: () => void;
}) {
    return (
        <div className="flex items-center justify-between mb-4">
            <Button
                onClick={goToPreviousDay}
                variant="outline"
                className="bg-primary/10 dark:bg-slate-800 border-primary/20 dark:border-slate-700"
            >
                <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <div className="flex flex-col items-center">
                <div className="text-primary font-bold text-lg">
                    {selectedDate.iDate()}
                    {" "}
                    {HIJRI_MONTHS[selectedDate.iMonth()]}
                    {" "}
                    {selectedDate.iYear()}
                </div>
                {!selectedDate.isSame(hijriToday(), 'day') && (
                    <Button
                        onClick={goToToday}
                        variant="link"
                        className="text-sm text-muted-foreground hover:underline"
                    >
                        Go to Today
                    </Button>
                )}
            </div>
            <Button
                onClick={goToNextDay}
                variant="outline"
                className="bg-primary/10 dark:bg-slate-800 border-primary/20 dark:border-slate-700"

            >
                <ChevronRightIcon className="w-4 h-4" />
            </Button>
        </div>
    );
}