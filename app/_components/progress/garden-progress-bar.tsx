import { motion } from 'motion/react';
import { useProgress } from '@/_context/progress-context';
import { ParticleEffect } from './particle-effect';

export const GardenProgressBar = ({ value, className, indicatorClassName }: {
    value: number,
    className?: string,
    indicatorClassName?: string
}) => {
    const { progressBarRef, isAnimating } = useProgress();

    return (
        <div className={`relative ${className}`} ref={progressBarRef}>
            <motion.div
                className={`h-full ${indicatorClassName}`}
                style={{ width: `${value}%` }}
                animate={isAnimating ? {
                    scale: [1, 1.02, 1],
                    transition: { duration: 0.3 }
                } : {}}
            />
            {isAnimating && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <ParticleEffect onComplete={() => { }} />
                </div>
            )}
        </div>
    );
};