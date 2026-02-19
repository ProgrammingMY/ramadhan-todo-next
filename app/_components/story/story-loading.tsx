import { motion } from "motion/react";

export default function StoryLoading() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                background: 'linear-gradient(135deg, #000B18, #001F3F)',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                color: 'white',
            }}
        >
            {/* Animated circles */}
            <motion.div
                style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '40px'
                }}
            >
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1, 0] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: index * 0.2,
                            ease: "easeInOut"
                        }}
                        style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: 'white',
                        }}
                    />
                ))}
            </motion.div>

            {/* Main text */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: '20px',
                }}
            >
                Analyzing Your Journey
            </motion.h2>

            {/* Animated progress messages container */}
            <motion.div
                style={{
                    position: 'relative',
                    height: '20px',
                    width: '100%',
                    maxWidth: '300px',
                    marginTop: '20px',
                }}
            >
                {['Gathering insights...', 'Processing data...', 'Creating your story...'].map((text, index) => (
                    <motion.p
                        key={text}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                            duration: 0.5,
                            delay: index * 2,
                            repeat: 1,
                            repeatType: 'reverse'
                        }}
                        style={{
                            fontSize: '16px',
                            color: 'rgba(255, 255, 255, 0.8)',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            textAlign: 'center',
                            margin: 0,
                        }}
                    >
                        {text}
                    </motion.p>
                ))}
            </motion.div>

            {/* Shimmer effect background */}
            <motion.div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                    backgroundSize: '200% 100%',
                }}
                animate={{
                    backgroundPosition: ['200% 0', '-200% 0']
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </motion.div>
    );
}