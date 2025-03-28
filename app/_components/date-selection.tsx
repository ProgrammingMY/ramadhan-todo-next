import { Button } from "@/components/ui/button";
import { HIJRI_MONTHS, hijriToday } from "@/constant/hijri";
import { Moment } from "moment-hijri";
import { useEffect, useState } from "react";

export default function DateSelection({
    selectedDate,
    setSelectedDate,
}: {
    selectedDate: Moment;
    setSelectedDate: (date: Moment) => void;
}) {
    const [isToday, setIsToday] = useState(false);
    const [weekDays, setWeekDays] = useState<Moment[]>([]);

    useEffect(() => {
        setIsToday(selectedDate.isSame(hijriToday(), 'day'));

        // Generate fixed week days (Monday to Sunday) that contains the selected date
        const days: Moment[] = [];
        // Find the Monday of the week containing the selected date
        const startOfWeek = selectedDate.clone().startOf("week");

        // Create array with 7 days starting from Monday
        for (let i = 0; i < 7; i++) {
            days.push(startOfWeek.clone().add(i, 'days'));
        }

        setWeekDays(days);
    }, [selectedDate]);

    return (
        <div className="mb-4">
            <div className="flex flex-col items-center mb-2">
                <div className="text-slate-700 dark:text-slate-200 font-bold text-lg">
                    {selectedDate.iDate()}
                    {" "}
                    {HIJRI_MONTHS[selectedDate.iMonth()]}
                    {" "}
                    {selectedDate.iYear()}
                </div>
            </div>

            <div className="flex items-center justify-center">
                <div className="flex items-center justify-center space-x-1 overflow-x-auto">
                    {weekDays.map((day, index) => {
                        const isSelected = day.isSame(selectedDate, 'day');
                        const dayIsToday = day.isSame(hijriToday(), 'day');
                        const isFuture = day.isAfter(hijriToday(), 'day');
                        const dayName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index];

                        return (
                            <Button
                                key={index}
                                onClick={() => setSelectedDate(day)}
                                variant={isSelected ? "default" : "outline"}
                                className={`
                                ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-primary/10 dark:bg-slate-800'} 
                                border-primary/20 dark:border-slate-700
                                ${dayIsToday ? 'ring-2 ring-primary' : ''}
                                min-w-12 h-16 p-1
                            `}
                                disabled={isFuture}
                            >
                                <div className="flex flex-col items-center justify-center text-xs">
                                    <span className="text-[0.6rem] text-muted-foreground">{dayName}</span>
                                    <span className="font-semibold">{day.iDate()}</span>
                                    <span className="text-[0.6rem]">{HIJRI_MONTHS[day.iMonth()].substring(0, 3)}</span>
                                </div>
                            </Button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}