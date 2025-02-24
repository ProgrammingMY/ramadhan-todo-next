import { NextResponse } from "next/server";
import { db } from "../../../../db/drizzle";
import { progressTable } from "../../../../db/schema";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();

    const { userId, date, completed } = data;

    const { id } = await params;

    const yearMonth = date.split("-").slice(0, 2).join("-");

    // Update or insert progress
    await db
      .insert(progressTable)
      .values({
        userId,
        taskId: parseInt(id),
        date,
        yearMonth,
        completed,
        completedAt: completed ? new Date() : null,
      })
      .onConflictDoUpdate({
        target: [
          progressTable.userId,
          progressTable.taskId,
          progressTable.date,
        ],
        set: {
          completed,
          completedAt: completed ? new Date() : null,
        },
      });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}
