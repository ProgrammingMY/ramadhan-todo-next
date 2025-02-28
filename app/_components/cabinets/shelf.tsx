import { DayProgress } from "@/libs/types";
import { JSX } from "react";

interface ShelfProps {
    items: DayProgress[];
    currentDay: number;
    shelfIndex: number;
    potsPerShelf: number;
    getPlantStage: (rate: number) => JSX.Element;
}


export default function Shelf({
    items,
    currentDay,
    shelfIndex,
    potsPerShelf,
    getPlantStage
}: ShelfProps) {
    return (
        <div className={`relative w-full h-[20%]`}>
            {/* Back panel */}
            <div className="absolute top-0 left-[2%] w-[96%] h-full bg-[#2c1512] shadow-[inset_10px_15px_15px_#21100d]" />

            {/* Plants container - positioned above the front panel */}
            <div className="absolute w-full flex justify-center items-end h-full bottom-[10px]">
                {items.map((progress, index) => {
                    const dayNumber = shelfIndex * potsPerShelf + index + 1;
                    const isCurrentDay = dayNumber === currentDay;

                    return (
                        <div
                            key={progress.date}
                            className={`w-12 flex flex-col items-center justify-end relative group
                                ${isCurrentDay ? 'z-10' : ''} `}
                            title={`${progress.date}: ${progress.completionRate}% completed`}
                        >
                            {/* Plant image */}
                            <div className={`absolute bottom-0 ${isCurrentDay ? 'bg-emerald-100/30 rounded-lg ring-1 ring-emerald-200/30' : ''}`}>
                                {getPlantStage(progress.completionRate)}
                            </div>
                        </div>
                    );
                })}
            </div>


            {/* Front panel with day numbers */}
            <div className="absolute bottom-0 w-full h-[10px] bg-[#69342b] flex justify-center items-center">
                {/* Day numbers container */}
                <div className="absolute w-full flex justify-center -top-[8px]">
                    {items.map((progress, index) => {
                        const dayNumber = shelfIndex * potsPerShelf + index + 1;
                        const isCurrentDay = dayNumber === currentDay;

                        return (
                            <div
                                key={`day-${progress.date}`}
                                className="w-12 flex justify-center mt-1"
                            >
                                <span className={`text-xs text-stone-200 ${isCurrentDay ? 'font-bold text-emerald-200' : ''}`}>
                                    {dayNumber}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};