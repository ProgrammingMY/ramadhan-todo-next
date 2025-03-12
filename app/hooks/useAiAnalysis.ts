import { useState, useCallback } from 'react';
import { generateAnalysis, generateTaskEncouragement } from '@/lib/ai-service';
import { UserStats } from '@/lib/types';

export function useAiAnalysis() {
    const [analysis, setAnalysis] = useState<{
        analysis: string;
        encouragements: Record<string, string>;
    } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getAnalysis = useCallback(async (stats: UserStats) => {
        try {
            setLoading(true);
            setError(null);
            const result = await generateAnalysis(stats);
            setAnalysis(result);
        } catch (err) {
            setError('Failed to generate analysis');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const getTaskEncouragement = useCallback(async (
        taskName: string,
        completionRate: number
    ) => {
        try {
            const encouragement = await generateTaskEncouragement(
                taskName,
                completionRate
            );
            return encouragement;
        } catch (err) {
            console.error(err);
            return null;
        }
    }, []);

    return {
        analysis,
        loading,
        error,
        getAnalysis,
        getTaskEncouragement
    };
}