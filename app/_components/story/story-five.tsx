/**
 * Top 3 tasks the user struggled with
 */

import { motion } from "motion/react";

export default function StoryFive() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
            <motion.div
                className="achievement-circle"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '30px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                    style={{ fontSize: '48px' }}
                >
                    80%
                </motion.span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.4 }}
                style={{
                    fontSize: '28px',
                    marginBottom: '20px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                }}
            >
                You completed 80% of your tasks! 🎉
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.4 }}
                style={{
                    fontSize: '20px',
                    textAlign: 'center',
                    maxWidth: '80%',
                    lineHeight: 1.4,
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
                }}
            >
                Keep up the great work!
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
                transition={{ delay: 1.7, duration: 0.4 }}
            >
                <p style={{ fontSize: '16px', opacity: 0.8 }}>
                    Swipe for more insights →
                </p>
            </motion.div>
        </motion.div>
    );
}