/**
 * Top 3 tasks the user struggled with
 */

import { motion } from "motion/react";

interface TaskCardProps {
    name: string;
    encouragement: string;
    delay: number;
}

interface StoryFiveProps {
    strugglingTasks: { name: string, completionRate: string }[];
    encouragements?: Record<string, string>;
}

const TaskCard = ({ name, encouragement, delay }: TaskCardProps) => (
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
            {name}
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

export default function StoryFive({ strugglingTasks, encouragements }: StoryFiveProps) {
    if (!encouragements || Object.keys(encouragements).length === 0) {
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
                        color: 'white',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    Looks like you're doing great!
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
                    Keep up the good work! May Allah reward you for your efforts.
                </motion.p>
            </motion.div>
        );
    }

    const challengingTasks = Object.keys(encouragements).slice(0, 2).map((task) => {
        return {
            name: task,
            encouragement: encouragements?.[task] || ""
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
            </motion.div>

            {/* Task Cards */}
            {challengingTasks && challengingTasks.length > 0 && (
                <div style={{ width: '100%', maxWidth: '300px' }}>
                    {challengingTasks.map((task, index) => (
                        <TaskCard
                            key={index}
                            name={task.name}
                            encouragement={task.encouragement}
                            delay={0.5 + (index * 0.3)}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    );
}