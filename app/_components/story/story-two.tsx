/**
 * Total tasks completed in the past week
 */

import { useUser } from "@/_context/user-context";
import { motion } from "motion/react";

export default function StoryTwo({ taskCompletions }: { taskCompletions: { name: string, count: number }[] }) {
    const completedTasks = taskCompletions.reduce((acc, task) => acc + task.count, 0);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                background: 'linear-gradient(135deg, #289672, #4ECDC4)',
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
            {/* Background animated dots */}
            <motion.div
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    opacity: 0.1
                }}
            >
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        style={{
                            position: 'absolute',
                            background: 'white',
                            borderRadius: '50%',
                            width: Math.random() * 10 + 5,
                            height: Math.random() * 10 + 5,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: Math.random() * 2 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </motion.div>

            {/* Main content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                    textAlign: 'center',
                    zIndex: 1
                }}
            >
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    style={{
                        fontSize: '24px',
                        marginBottom: '20px',
                        fontWeight: '500'
                    }}
                >
                    This week, you completed
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    style={{
                        fontSize: '120px',
                        fontWeight: 'bold',
                        lineHeight: '1',
                        marginBottom: '20px',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    {completedTasks}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                    style={{
                        fontSize: '32px',
                        fontWeight: '600',
                        background: 'rgba(255, 255, 255, 0.2)',
                        padding: '15px 30px',
                        borderRadius: '30px',
                        backdropFilter: 'blur(10px)',
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    sunnah
                </motion.div>
            </motion.div>

            {/* Bottom text */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
                style={{
                    position: 'absolute',
                    bottom: '40px',
                    fontSize: '18px',
                    opacity: 0.8
                }}
            >
                That's what we call dedication! 🎯
            </motion.p>
        </motion.div>
    );
}