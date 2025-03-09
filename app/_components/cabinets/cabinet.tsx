import { DayProgress } from "@/libs/types";
import Shelf from "./shelf";
import { StaticImageData } from "next/image";
import { JSX } from "react";


interface CabinetProps {
    monthProgress: DayProgress[];
    currentDay: number;
    plantStages: {
        plant: StaticImageData;
        minCompletionRate: number;
    }[];
    getPlantStage: (rate: number) => JSX.Element;
}

export default function Cabinet({
    monthProgress,
    currentDay,
    getPlantStage
}: CabinetProps) {
    const potsPerShelf = 7;
    const numberOfShelves = Math.ceil(monthProgress.length / potsPerShelf);

    return (
        <div className={`relative h-[350px] bg-[#45221c] border-[10px] border-[#69342b] box-border`}>
            {/* Cabinet top */}
            <div className="absolute -top-5 -left-[2%] w-[104%] h-0 border-b-[10px] border-b-[#572b23] border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent" />

            {/* Shelves */}
            {[...Array(numberOfShelves)].map((_, shelfIndex) => {
                const shelfItems = monthProgress.slice(
                    shelfIndex * potsPerShelf,
                    (shelfIndex + 1) * potsPerShelf
                );

                return (
                    <Shelf
                        key={shelfIndex}
                        items={shelfItems}
                        currentDay={currentDay}
                        shelfIndex={shelfIndex}
                        potsPerShelf={potsPerShelf}
                        getPlantStage={getPlantStage}
                    />
                );
            })}
        </div>
    );
};