import Stories from 'react-insta-stories';
import { type Story } from 'react-insta-stories/dist/interfaces';
import { motion } from "motion/react"

const stories: Story[] = [
    {
        url: 'https://placehold.co/400x600/png',
        header: {
            heading: 'Your Progress Story',
            subheading: 'Last 30 days',
            profileImage: 'https://placehold.co/400x600/png',
        },
        content: () => (
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
        )
    },
    // Add more story items as needed
];

const StoryViewer = ({ onClose }: { onClose: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 50,
                background: 'black'
            }}
        >
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    zIndex: 51,
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    backdropFilter: 'blur(4px)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
                }}
            >
                ✕
            </motion.button>
            <Stories
                stories={stories}
                defaultInterval={5000}
                width="100%"
                height="100vh"
                onAllStoriesEnd={onClose}
            />
        </motion.div>
    );
};

export default StoryViewer;