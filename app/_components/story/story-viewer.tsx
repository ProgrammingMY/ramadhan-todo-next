import Stories from 'react-insta-stories';
import { type Story } from 'react-insta-stories/dist/interfaces';
import { motion } from "motion/react"
import StoryOne from './story-one';
import StoryTwo from './story-two';
import StoryThree from './story-three';
import StoryFour from './story-four';
import StoryFive from './story-five';
import StorySix from './story-six';
import { useEffect } from 'react';
import { useState } from 'react';
import StoryLoading from './story-loading';
import { useUser } from '@/_context/user-context';
import { hijriToday } from '@/constant/hijri';

const StoryViewer = ({ onClose }: { onClose: () => void }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [stories, setStories] = useState<Story[]>([]);
    const { user } = useUser();

    useEffect(() => {
        let isMounted = true;
        // Get analytics data
        const fetchData = async () => {
            try {
                if (!user) return;

                if (!isMounted) return;
                // get 7 days ago
                const startDate = hijriToday().subtract(7, 'days').format('iYYYY-iMM-iDD');
                const endDate = hijriToday().format('iYYYY-iMM-iDD');

                const res = await fetch(`/api/analytics?userId=${user.id}&startDate=${startDate}&endDate=${endDate}`);
                const data = await res.json();

                const { taskCompletions, totalPerfectDays } = data;

                // Set your stories after data is "loaded"
                setStories([
                    {
                        content: () => <StoryOne />
                    },
                    {
                        content: () => <StoryTwo taskCompletions={taskCompletions} />
                    },
                    {
                        content: () => <StoryThree totalPerfectDays={totalPerfectDays} />
                    },
                    {
                        content: () => <StoryFour taskCompletions={taskCompletions} />
                    },
                    {
                        content: () => <StoryFive taskCompletions={taskCompletions} />
                    },
                    {
                        content: () => <StorySix />
                    }
                ]);

                setIsLoading(false);
            } catch (error) {
                console.error('Error loading story data:', error);
                if (isMounted) {
                    onClose(); // Close on error
                }
            }
        };

        setIsLoading(true);
        fetchData();

        return () => {
            isMounted = false;
        }
    }, [user]);

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

            {isLoading ? (
                <StoryLoading />
            ) : (
                <Stories
                    stories={stories}
                    defaultInterval={5000}
                    width="100%"
                    height="100vh"
                    onAllStoriesEnd={onClose}
                />
            )}
        </motion.div>
    );
};

export default StoryViewer;