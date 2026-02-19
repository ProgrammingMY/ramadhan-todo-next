"use server";

import { db } from "db/drizzle";
import { feedbackTable } from "db/schema";

type FeedbackData = {
    rating: number;
    feedback: string;
};

export async function submitFeedback(data: FeedbackData) {
    try {
        const { rating, feedback } = data;

        // insert feedback into database
        await db
            .insert(feedbackTable)
            .values({
                rating,
                feedback,
            })
            .returning();

        return { success: true };
    } catch (error) {
        console.error("Error processing feedback:", error);
        throw new Error("Failed to submit feedback");
    }
}