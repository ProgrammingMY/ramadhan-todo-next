/**
 * Top 3 tasks the user struggled with
 */

import { useUser } from "@/_context/user-context";
import { motion } from "motion/react";

interface TaskCardProps {
    task: string;
    completionRate: number;
    encouragement: string;
    delay: number;
}

const TaskCard = ({ task, completionRate, encouragement, delay }: TaskCardProps) => (
    <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: 0.5 }}
        style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '15px',
            padding: '20px',
            width: '100%',
            maxWidth: '300px',
            marginBottom: '15px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
    >
        {/* Task Name */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.2, duration: 0.3 }}
            style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '10px',
                color: 'white'
            }}
        >
            {task}
        </motion.div>

        {/* Progress Bar */}
        <motion.div
            style={{
                height: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '10px'
            }}
        >
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionRate}%` }}
                transition={{ delay: delay + 0.4, duration: 0.8 }}
                style={{
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.5)',
                    borderRadius: '4px'
                }}
            />
        </motion.div>

        {/* Completion Rate */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.6, duration: 0.3 }}
            style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '12px'
            }}
        >
            Completion rate: {completionRate}%
        </motion.div>

        {/* Encouragement */}
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.8, duration: 0.3 }}
            style={{
                fontSize: '15px',
                color: 'white',
                fontStyle: 'italic',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}
        >
            <span style={{ fontSize: '20px' }}>💪</span>
            {encouragement}
        </motion.div>
    </motion.div>
);

export default function StoryFive({ taskCompletions }: { taskCompletions: { name: string, count: number }[] }) {
    // filter out tasks with count less than 3
    const tasks = taskCompletions.filter((task) => task.count < 3);

    const challengingTasks = tasks.map((task) => {
        return {
            task: task.name,
            completionRate: task.count / 7 * 100,
            encouragement: "Start with just 5 minutes - you've got this!"
        }
    });



    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
                background: 'linear-gradient(135deg, #6B46C1, #2C5282)',
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
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    textAlign: 'center',
                    marginBottom: '30px'
                }}
            >
                <motion.h2
                    style={{
                        fontSize: '28px',
                        color: 'white',
                        fontWeight: 'bold',
                        marginBottom: '10px',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    Growth Opportunities
                </motion.h2>
                <motion.p
                    style={{
                        fontSize: '16px',
                        color: 'rgba(255, 255, 255, 0.9)',
                        maxWidth: '280px'
                    }}
                >
                    These tasks are challenging, but that's where the magic happens!
                </motion.p>
            </motion.div>

            {/* Task Cards */}
            {challengingTasks && challengingTasks.length > 0 && (
                <div style={{ width: '100%', maxWidth: '300px' }}>
                    {challengingTasks.map((task, index) => (
                        <TaskCard
                            key={index}
                            task={task.task}
                            completionRate={task.completionRate}
                            encouragement={task.encouragement}
                            delay={0.5 + (index * 0.3)}
                        />
                    ))}
                </div>
            )}

            {/* Bottom Message */}
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
                transition={{ delay: 2, duration: 0.4 }}
            >
                <p style={{
                    fontSize: '16px',
                    color: 'white',
                    opacity: 0.8,
                    maxWidth: '280px'
                }}>
                    Remember: Progress isn't about perfection, it's about consistency 🌟
                </p>
            </motion.div>
        </motion.div>
    );
}