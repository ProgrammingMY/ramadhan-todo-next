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
import { useAiAnalysis } from '@/hooks/useAiAnalysis';

interface TaskCompletion {
    name: string;
    count: number;
}

interface AnalyticsData {
    taskCompletions: TaskCompletion[];
    totalPerfectDays: number;
    userRank?: number;
}

const StoryViewer = ({ startDate, endDate, onClose }: { startDate: string, endDate: string, onClose: () => void }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [stories, setStories] = useState<Story[]>([]);
    const { user } = useUser();
    const { getAnalysis } = useAiAnalysis();

    useEffect(() => {
        let isMounted = true;
        // Add these dependencies to useEffect
        if (!user || !startDate || !endDate) {
            if (isMounted) setIsLoading(false);
            return;
        }

        // Get analytics data
        const fetchData = async () => {
            try {
                if (!isMounted) return;

                const res = await fetch(`/api/analytics?userId=${user.id}&startDate=${startDate}&endDate=${endDate}`);
                const data = await res.json();

                if (!isMounted) return;

                const { taskCompletions, totalPerfectDays, userRank } = data as AnalyticsData;

                const completedTasks = taskCompletions.reduce((acc, task) => acc + task.count, 0);
                const topTasks = taskCompletions.slice(0, 3);

                // get struggling tasks if count is less than 50%
                const strugglingTasks = taskCompletions.filter(task => task.count < 3).map(task => ({ name: task.name, completionRate: (task.count / 7 * 100).toFixed(0) }));

                // ai analysis
                const analysis = await getAnalysis({
                    name: user.username || "",
                    userId: user.id,
                    startDate: startDate,
                    mode: "weekly",
                    totalTasksCompleted: completedTasks,
                    totalPerfectDays: totalPerfectDays,
                    strugglingTasks: strugglingTasks
                });

                const encouragements = analysis?.encouragements;
                const analysisText = analysis?.analysis;

                // Set your stories after data is "loaded"
                setStories([
                    {
                        content: () => <StoryOne />
                    },
                    {
                        content: () => <StoryTwo rank={userRank} completedTasks={completedTasks} />
                    },
                    {
                        content: () => <StoryThree totalPerfectDays={totalPerfectDays} />
                    },
                    {
                        content: () => <StoryFour topTasks={topTasks} />
                    },
                    {
                        content: () => <StoryFive strugglingTasks={strugglingTasks} encouragements={encouragements} />
                    },
                    {
                        content: () => <StorySix rank={userRank} analysisText={analysisText} />
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
    }, [user, startDate, endDate, onClose]);

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
                    zIndex: 100,
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