import { JSX } from "react";

interface IsometricGardenProps {
    monthProgress: {
        date: string;
        completionRate: number;
    }[];
    currentDay: number;
    getPlantStage: (completionRate: number) => JSX.Element;
}

const IsometricGarden = ({ monthProgress, currentDay, getPlantStage }: IsometricGardenProps) => {
    const gridSize = Math.ceil(Math.sqrt(monthProgress.length));

    return (
        <div className="w-full h-[600px] flex items-center justify-center perspective-[1000px]">
            <div
                className="relative transform-style-3d"
                style={{
                    transform: 'rotateX(60deg) rotateZ(-45deg)',
                }}
            >
                {/* Ground tile */}
                <div
                    className="absolute bg-emerald-600/90"
                    style={{
                        width: `${gridSize * 64}px`,
                        height: `${gridSize * 64}px`,
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    {/* Grass texture overlay */}
                    <div className="absolute inset-0 bg-[url('/textures/grass.png')] opacity-30" />
                </div>

                {/* Plants grid */}
                {monthProgress.map((progress, index) => {
                    const row = Math.floor(index / gridSize);
                    const col = index % gridSize;
                    const dayNumber = index + 1;
                    const isCurrentDay = dayNumber === currentDay;

                    return (
                        <div
                            key={progress.date}
                            className={`absolute transform-style-3d transition-transform duration-300
                  ${isCurrentDay ? 'z-10 scale-110' : 'hover:scale-105'}
                `}
                            style={{
                                left: `${col * 64}px`,
                                top: `${row * 64}px`,
                                transform: 'translateZ(0px)',
                            }}
                        >
                            {/* Plant container */}
                            <div className="relative w-16 h-16 transform-style-3d">
                                {/* Shadow */}
                                <div className="absolute bottom-0 w-12 h-12 bg-black/10 rounded-full blur-sm" />

                                {/* Plant */}
                                <div
                                    className="absolute bottom-0 left-1/2 transform-style-3d"
                                    style={{
                                        transform: 'translateX(-50%) translateZ(16px) rotateX(-60deg)',
                                    }}
                                >
                                    {getPlantStage(progress.completionRate)}
                                </div>

                                {/* Day number */}
                                <div
                                    className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs
                      ${isCurrentDay ? 'text-emerald-200 font-bold' : 'text-stone-200'}
                    `}
                                >
                                    {dayNumber}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default IsometricGarden;