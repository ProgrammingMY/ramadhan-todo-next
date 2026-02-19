/**
 * Top 3 task completed in the past week
 */

import { motion } from "motion/react";
interface PodiumProps {
    position: number;
    height: number;
    task: string;
    count: number;
    delay: number;
}

const Podium = ({ position, height, task, count, delay }: PodiumProps) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            width: '100px',
        }}
    >
        {/* Task Name */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.2, duration: 0.3 }}
            style={{
                textAlign: 'center',
                fontSize: '16px',
                fontWeight: '500',
                minHeight: '40px',
                display: 'flex',
                alignItems: 'center',
                color: 'white'
            }}
        >
            {task}
        </motion.div>

        {/* Completion Count */}
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.4, duration: 0.3 }}
            style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '4px 12px',
                borderRadius: '15px',
                fontSize: '14px',
                backdropFilter: 'blur(4px)',
                color: 'white'
            }}
        >
            {count}x
        </motion.div>

        {/* Medal for top 3 */}
        <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: delay + 0.6, duration: 0.5 }}
            style={{
                fontSize: '32px',
                marginBottom: '10px'
            }}
        >
            {position === 1 ? '🥇' : position === 2 ? '🥈' : '🥉'}
        </motion.div>

        {/* Podium Block */}
        <motion.div
            initial={{ height: 0 }}
            animate={{ height }}
            transition={{ delay: delay + 0.2, duration: 0.5 }}
            style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '8px 8px 0 0',
                backdropFilter: 'blur(4px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
        />
    </motion.div>
);

export default function StoryFour({ topTasks }: { topTasks: { name: string, count: number }[] }) {
    // Calculate podium heights
    const baseHeight = 100;
    const heights = [baseHeight + 60, baseHeight + 30, baseHeight];

    if (!topTasks?.length) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                    background: 'linear-gradient(135deg, #FF8C00, #FF4500)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
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
                        marginBottom: '20px',
                        color: 'white',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    No Tasks Completed Yet
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
                    Complete some Sunnah tasks to see your top achievements here!
                </motion.p>
            </motion.div>
        );
    }

    // Pad the topTasks array with empty tasks if less than 3
    const paddedTasks = [...topTasks];
    while (paddedTasks.length < 3) {
        paddedTasks.push({ name: '-', count: 0 });
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                background: 'linear-gradient(135deg, #FF8C00, #FF4500)',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    fontSize: '28px',
                    textAlign: 'center',
                    marginBottom: '20px',
                    color: 'white',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                }}
            >
                Your Top 3 Sunnah
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{
                    fontSize: '18px',
                    textAlign: 'center',
                    marginBottom: '40px',
                    color: 'white',
                    opacity: 0.9
                }}
            >
                Most frequently completed this week
            </motion.p>

            {/* Podiums Container */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                gap: '20px',
                height: '300px',
                marginTop: 'auto'
            }}>
                {/* Second Place */}
                <Podium
                    position={2}
                    height={heights[1]}
                    task={paddedTasks[1].name}
                    count={paddedTasks[1].count}
                    delay={0.8}
                />
                {/* First Place */}
                <Podium
                    position={1}
                    height={heights[0]}
                    task={paddedTasks[0].name}
                    count={paddedTasks[0].count}
                    delay={0.4}
                />
                {/* Third Place */}
                <Podium
                    position={3}
                    height={heights[2]}
                    task={paddedTasks[2].name}
                    count={paddedTasks[2].count}
                    delay={1.2}
                />
            </div>
        </motion.div>
    );
}