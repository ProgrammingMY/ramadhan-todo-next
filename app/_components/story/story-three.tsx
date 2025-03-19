/**
 * Total days completed in the past week
 */
import { motion } from "motion/react";

const GrowingSunflower = ({ delay = 0 }: { delay?: number }) => {
    return (
        <motion.div
            className="w-16 h-16 mx-auto mb-8 relative"
            initial="hidden"
            animate="visible"
            style={{ margin: '10px' }}
        >
            <svg viewBox="0 0 100 150" className="w-full h-full">
                {/* Stem */}
                <motion.path
                    d="M 50 100 L 50 140"
                    stroke="#2E7D32"
                    strokeWidth="5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                        duration: 0.8,
                        delay: delay + 0.2,
                        ease: "easeInOut"
                    }}
                />

                {/* Left Leaf */}
                <motion.path
                    d="M 50 120 C 40 115, 30 118, 25 110 C 30 105, 40 110, 50 120"
                    fill="#4CAF50"
                    stroke="#388E3C"
                    strokeWidth="1"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.5,
                        delay: delay + 0.8,
                        type: "spring",
                        stiffness: 100
                    }}
                />

                {/* Right Leaf */}
                <motion.path
                    d="M 50 130 C 60 125, 70 128, 75 120 C 70 115, 60 120, 50 130"
                    fill="#4CAF50"
                    stroke="#388E3C"
                    strokeWidth="1"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        duration: 0.5,
                        delay: delay + 1.0,
                        type: "spring",
                        stiffness: 100
                    }}
                />

                {/* Flower Petals */}
                {[...Array(16)].map((_, i) => {
                    const angle = (i * 22.5) * (Math.PI / 180);
                    const startX = 50 + Math.cos(angle) * 15;
                    const startY = 50 + Math.sin(angle) * 15;
                    const endX = 50 + Math.cos(angle) * 40;
                    const endY = 50 + Math.sin(angle) * 40;

                    // Modified control points for more natural sunflower petals
                    const cp1x = 50 + Math.cos(angle - 0.2) * 45;
                    const cp1y = 50 + Math.sin(angle - 0.2) * 45;
                    const cp2x = 50 + Math.cos(angle + 0.2) * 45;
                    const cp2y = 50 + Math.sin(angle + 0.2) * 45;

                    return (
                        <motion.path
                            key={i}
                            d={`
                                M ${startX} ${startY}
                                Q ${cp1x} ${cp1y} ${endX} ${endY}
                                Q ${cp2x} ${cp2y} ${startX} ${startY}
                            `}
                            fill="#FFD700"
                            stroke="#FFA500"
                            strokeWidth="1"
                            filter="drop-shadow(0 1px 2px rgba(0,0,0,0.1))"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 0.5,
                                delay: delay + 1.5 + (i * 0.08),
                                type: "spring",
                                stiffness: 100
                            }}
                        />
                    );
                })}

                {/* Flower Center Base */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="15"
                    fill="#5D4037"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: delay + 2.7 }}
                />

                {/* Seed Pattern */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: delay + 2.9 }}
                >
                    {/* Create spiral seed pattern */}
                    {[...Array(5)].map((_, i) => (
                        <g key={i}>
                            {[...Array(8)].map((_, j) => {
                                const angle = (j * 45) * (Math.PI / 180);
                                const distance = 3 + (i * 2);
                                const seedX = 50 + Math.cos(angle) * distance;
                                const seedY = 50 + Math.sin(angle) * distance;

                                return (
                                    <circle
                                        key={`${i}-${j}`}
                                        cx={seedX}
                                        cy={seedY}
                                        r={1.2 - (i * 0.15)}
                                        fill="#8D6E63"
                                    />
                                );
                            })}
                        </g>
                    ))}
                </motion.g>

                {/* Subtle glow effect */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="url(#sunGlow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ duration: 1, delay: delay + 3.0 }}
                />

                {/* Gradient definitions */}
                <defs>
                    <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                    </radialGradient>
                </defs>
            </svg>
        </motion.div>
    );
};

export default function StoryThree({ totalPerfectDays }: { totalPerfectDays: number }) {
    const completedDays = totalPerfectDays;

    if (completedDays === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                    background: 'linear-gradient(135deg, #43A047, #1B5E20)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        fontSize: '28px',
                        textAlign: 'center',
                        marginBottom: '40px',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    You haven't completed get perfect days yet
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    style={{
                        fontSize: '18px',
                        textAlign: 'center',
                        color: 'white',
                        opacity: 0.9
                    }}
                >
                    You might want to try one time and see how it goes!
                </motion.p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                background: 'linear-gradient(135deg, #43A047, #1B5E20)',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                padding: '20px',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    fontSize: '28px',
                    textAlign: 'center',
                    marginBottom: '40px',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                }}
            >
                Your garden of achievements
            </motion.h2>

            <motion.div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '400px',
                    gap: '5px',
                    margin: '0 auto'
                }}
            >
                {Array.from({ length: completedDays }).map((_, index) => (
                    <GrowingSunflower key={index} delay={index * 0.2} />
                ))}
            </motion.div>


            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.5 }}
                style={{
                    fontSize: '24px',
                    textAlign: 'center',
                    marginTop: '40px',
                    maxWidth: '80%',
                    lineHeight: 1.4,
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
                }}
            >
                You have
                <br />
                <span style={{ fontSize: '32px', fontWeight: 'bold' }}>
                    {completedDays} days
                </span>
                <br />
                of perfect days! 🌻
            </motion.p>
        </motion.div>
    );
}