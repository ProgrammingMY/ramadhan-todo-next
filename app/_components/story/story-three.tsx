/**
 * Total days completed in the past week
 */

import { useUser } from "@/_context/user-context";
import { motion } from "motion/react";

const FlowerPetal = ({ rotation, delay }: { rotation: number; delay: number }) => (
    <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
            delay: delay,
            duration: 0.5,
            ease: "easeOut"
        }}
        style={{
            position: 'absolute',
            width: '25px',
            height: '40px',
            background: '#FF97C1',
            borderRadius: '50%',
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'bottom center',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
        }}
    />
);

const Flower = ({ delay }: { delay: number }) => {
    return (
        <motion.div
            style={{
                position: 'relative',
                width: '50px',
                height: '50px',
                margin: '10px'
            }}
        >
            {/* Petals */}
            {[0, 60, 120, 180, 240, 300].map((rotation, index) => (
                <FlowerPetal
                    key={rotation}
                    rotation={rotation}
                    delay={delay + (index * 0.1)}
                />
            ))}

            {/* Center of flower */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    delay: delay + 0.7,
                    duration: 0.3,
                }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#FFD93D',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2
                }}
            />

            {/* Stem */}
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 40, opacity: 1 }}
                transition={{
                    delay: delay - 0.2,
                    duration: 0.3,
                }}
                style={{
                    position: 'absolute',
                    bottom: '-40px',
                    left: '50%',
                    width: '3px',
                    background: '#4CAF50',
                    transformOrigin: 'bottom',
                    transform: 'translateX(-50%)',
                }}
            />
        </motion.div>
    );
};

export default function StoryThree() {
    // This is a placeholder - you'll want to calculate the actual number from your data
    const completedDays = 5;

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
                    maxWidth: '300px',
                    gap: '20px'
                }}
            >
                {Array.from({ length: completedDays }).map((_, index) => (
                    <Flower key={index} delay={1 + (index * 0.3)} />
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
                You completed all tasks on
                <br />
                <span style={{ fontSize: '32px', fontWeight: 'bold' }}>
                    {completedDays} days
                </span>
                <br />
                this week! 🌸
            </motion.p>

            <motion.div
                style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    textAlign: 'center'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 0.4 }}
            >
                <p style={{ fontSize: '16px', opacity: 0.8 }}>
                    Keep growing your garden! 🌱
                </p>
            </motion.div>
        </motion.div>
    );
}