import { db } from "../../../db/drizzle";
import { progressTable, tasksTable } from "../../../db/schema";
import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";

export async function GET(request: Request) {
  try {

    // get yearMonth from query params
    const url = new URL(request.url);
    const yearMonth = url.searchParams.get("yearMonth") as string;
    const userId = url.searchParams.get("id") as string;

    if (!yearMonth) {
      return NextResponse.json(
        { error: "Year and month are required" },
        { status: 400 }
      );
    }

    const progress = await db
      .select({
        date: progressTable.date,
        completed: progressTable.completed,
      })
      .from(progressTable)
      .where(
        and(
          eq(progressTable.userId, userId),
          eq(progressTable.yearMonth, yearMonth)
        )
      );

    const tasks = await db.select().from(tasksTable);

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Failed to fetch progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}
