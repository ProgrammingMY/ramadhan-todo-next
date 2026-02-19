import { motion } from 'motion/react';

type Particle = {
    id: number;
    angle: number;
    distance: number;
    duration: number;
    size: number;
};

export const ParticleEffect = ({ onComplete }: { onComplete: () => void }) => {
    const particles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        angle: (i * Math.PI * 2) / 12,
        distance: Math.random() * 30 + 20,
        duration: Math.random() * 0.4 + 0.4,
        size: Math.random() * 3 + 2,
    }));

    return (
        <>
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    initial={{
                        scale: 0,
                        x: 0,
                        y: 0,
                        opacity: 1
                    }}
                    animate={{
                        scale: [0, 1, 0.5, 0],
                        x: Math.cos(particle.angle) * particle.distance,
                        y: Math.sin(particle.angle) * particle.distance,
                        opacity: [1, 1, 0]
                    }}
                    transition={{
                        duration: particle.duration,
                        ease: "easeOut",
                        onComplete: particle.id === 0 ? onComplete : undefined
                    }}
                    className="absolute rounded-full bg-emerald-400"
                    style={{
                        width: particle.size,
                        height: particle.size
                    }}
                />
            ))}
        </>
    );
};