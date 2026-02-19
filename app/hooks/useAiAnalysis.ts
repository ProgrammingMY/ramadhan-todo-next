import { useState, useCallback } from 'react';
import { generateAnalysis } from '@/lib/ai-service';
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
            return result;
        } catch (err) {
            setError('Failed to generate analysis');
            console.error(err);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        analysis,
        loading,
        error,
        getAnalysis
    };
}