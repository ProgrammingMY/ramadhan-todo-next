"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { UserStats } from "./types";
import { db } from "db/drizzle";
import { and, eq } from "drizzle-orm";
import { analyticsTable } from "db/schema";

export async function generateAnalysis(stats: UserStats): Promise<{
    analysis: string;
    encouragements: Record<string, string>;
}> {
    const ai = new GoogleGenerativeAI(process.env.GEMINI_API!);
    let strugglingSunnah = '';
    if (stats.strugglingTasks.length > 0) {
        strugglingSunnah = stats.strugglingTasks.map(t => t.name).join(', ');
    } else {
        strugglingSunnah = 'No struggling sunnah';
    }

    try {
        // Check cache first
        const cachedAnalysis = await db
            .select()
            .from(analyticsTable)
            .where(and(
                eq(analyticsTable.userId, stats.userId),
                eq(analyticsTable.mode, "weekly"),
                eq(analyticsTable.startDate, stats.startDate)
            ));

        // return cached analysis if it exists
        if (cachedAnalysis.length > 0) {
            // Parse the JSON response
            const analysisData = JSON.parse(cachedAnalysis[0].analysis) as {
                analysis: string;
                encouragements: Record<string, string>;
            };
            return analysisData;
        }

        // Initialize the model
        const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
        As a supportive Islamic AI assistant, analyze these user sunnah statistics and provide encouraging feedback:

        Total Sunnah Completed: ${stats.totalTasksCompleted}
        Total Perfect Days: ${stats.totalPerfectDays}
        
        Struggling Sunnah:
        ${strugglingSunnah}
        
        Provide a brief, encouraging analysis (max 40 words) that:
        1. Acknowledges their achievements and celebrates their wins
        2. If any, offers specific encouragement for struggling tasks. In specific encouragement, no need to mention the task name
        3. Maintains a positive, motivating tone
        4. Encourages the user to keep up the good work
        
        Return ONLY a JSON object in this exact structure (no additional text):
        {
            "analysis": "main analysis text",
            "encouragements": {
                "taskName": "specific encouragement for task"
            }
        }`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        let text = response.text();

        // remove ```json and ```
        text = text.replace('```json', '').replace('```', '');

        // Parse the JSON response
        const analysisData = JSON.parse(text) as {
            analysis: string;
            encouragements: Record<string, string>;
        };

        // Cache the result
        await db.insert(analyticsTable).values({
            userId: stats.userId,
            analysis: text,
            startDate: stats.startDate,
            mode: stats.mode
        }).onConflictDoUpdate({
            target: [analyticsTable.userId, analyticsTable.startDate, analyticsTable.mode],
            set: {
                analysis: text
            }
        });

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