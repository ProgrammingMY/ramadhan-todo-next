import Stories from 'react-insta-stories';
import { type Story } from 'react-insta-stories/dist/interfaces';
import { motion } from "motion/react"
import StoryOne from './story-one';
import StoryTwo from './story-two';
const stories: Story[] = [
    {
        content: () => (
            <StoryOne />
        )
    },
    {
        content: () => (
            <StoryTwo />
        )
    },
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