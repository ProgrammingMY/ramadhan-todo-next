import { GoogleGenerativeAI } from "@google/generative-ai";
import { UserStats } from "./types";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API as string);

export async function generateAnalysis(stats: UserStats) {
    try {
        // Check cache first
        // const cacheKey = getCacheKey(stats);
        // const cached = analysisCache.get(cacheKey);

        // if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
        //     return cached.data;
        // }

        // Initialize the model
        const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
        As a supportive AI assistant, analyze these user task statistics and provide encouraging feedback:
        
        Total Tasks Completed: ${stats.totalTasksCompleted}
        Total Perfect Days: ${stats.totalPerfectDays}
        
        Top Tasks:
        ${stats.topTasks.map(t => `- ${t.task}: ${t.count} times`).join('\n')}
        
        Struggling Tasks:
        ${stats.strugglingTasks.map(t => `- ${t.task}: ${t.completionRate}% completion`).join('\n')}
        
        Provide a brief, encouraging analysis (max 100 words) that:
        1. Acknowledges their achievements
        2. Offers specific encouragement for struggling tasks
        3. Maintains a positive, motivating tone
        
        Return ONLY a JSON object in this exact structure (no additional text):
        {
            "analysis": "main analysis text",
            "encouragements": {
                "taskName": "specific encouragement for task"
            }
        }`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        // Parse the JSON response
        const analysisData = JSON.parse(text);

        // Cache the result
        // analysisCache.set(cacheKey, {
        //     timestamp: Date.now(),
        //     data: analysisData
        // });

        return analysisData;

    } catch (error) {
        console.error('Error generating analysis:', error);
        // Fallback response if something goes wrong
        return {
            analysis: "Keep up the great work on your tasks! Every step counts towards your goals.",
            encouragements: {}
        };
    }
}

// Optional: Add a function to generate more specific task encouragements
export async function generateTaskEncouragement(taskName: string, completionRate: number) {
    try {
        const model = ai.getGenerativeModel({
            model: "gemini-2.0-flash",
        });

        const prompt = `
        Generate a short, specific encouragement (max 20 words) for someone who has a ${completionRate}% completion rate on their "${taskName}" task.
        Make it motivating and actionable.
        Return ONLY the encouragement text, no additional formatting.`;

        const result = await model.generateContent(prompt);
        return result.response.text();

    } catch (error) {
        console.error('Error generating task encouragement:', error);
        return "Keep pushing forward - you're making progress!";
    }
}