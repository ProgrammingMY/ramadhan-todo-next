import { db } from "../../../db/drizzle";
import { progressTable, tasksTable } from "../../../db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("id") as string;
    const name = url.searchParams.get("name") as string;
    const date = url.searchParams.get("date") as string;

    if (!userId || !name || !date) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Join tasks and progress tables to get today's progress
    const results = await db
      .select({
        id: tasksTable.id,
        text: tasksTable.name,
        category: tasksTable.category,
        completed: progressTable.completed,
      })
      .from(tasksTable)
      .leftJoin(
        progressTable,
        and(
          eq(progressTable.taskId, tasksTable.id),
          eq(progressTable.userId, userId),
          eq(progressTable.date, date)
        )
      )

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}
