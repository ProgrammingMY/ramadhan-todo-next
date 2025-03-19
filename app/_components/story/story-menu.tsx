import { Button } from "@/components/ui/button";
import { HIJRI_MONTHS, hijriToday } from "@/constant/hijri";
import moment from "moment-hijri"
// create a list of dates group by week



export default function StoryMenu({
    setShowStory,
    setStartDate,
    setEndDate
}: {
    setShowStory: (show: boolean) => void;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
}) {
    const lastDayOfMonth = moment().endOf("iMonth");
    const totalDays = lastDayOfMonth.date();
    const currentDay = hijriToday().iDate();

    // Create weeks array
    const weeks = [];
    let currentWeek = [];

    for (let day = 1; day <= totalDays; day++) {
        if (currentWeek.length === 0 || currentWeek.length < 7) {
            currentWeek.push(day);
        }

        if (currentWeek.length === 7 || day === totalDays) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    }

    // Combine last week with previous week if it has less than 3 days
    if (weeks.length > 1 && weeks[weeks.length - 1].length < 3) {
        const lastWeek = weeks.pop();
        weeks[weeks.length - 1] = [...weeks[weeks.length - 1], ...lastWeek!];
    }


    return (
        <div>
            <div className="space-y-3">
                {weeks.map((week, index) => {
                    // Check if this is a future week or current week
                    const isCurrentOrFutureWeek = week[0] > currentDay ||
                        (week.includes(currentDay) && week[week.length - 1] >= currentDay);

                    return (
                        <div key={index} className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
                            <div>
                                <div className="font-medium">Week {index + 1}</div>
                                <div className="text-sm text-muted-foreground">
                                    {week[0]} - {week[week.length - 1]} {HIJRI_MONTHS[moment().iMonth()]}
                                </div>
                            </div>
                            <Button
                                size="sm"
                                disabled={isCurrentOrFutureWeek}
                                onClick={() => {
                                    setShowStory(true);
                                    setStartDate(moment().date(week[0]).format("iYYYY-iMM-iDD"));
                                    setEndDate(moment().date(week[week.length - 1]).format("iYYYY-iMM-iDD"));
                                }}
                            >
                                {isCurrentOrFutureWeek ? "Coming Soon" : "View Story"}
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}