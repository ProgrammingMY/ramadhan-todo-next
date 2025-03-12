import { db } from "db/drizzle";
import { NextRequest, NextResponse } from "next/server";
import * as schema from "db/schema";
import { and, desc, eq, gte, lte, sql } from "drizzle-orm";

const TOTAL_TASKS = 8;

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!userId || !startDate || !endDate) {
        return NextResponse.json({ error: "User ID, startDate, and endDate are required" }, { status: 400 });
    }

    // Get task completion counts
    const taskCompletions = await db
        .select({
            task: schema.tasksTable.name,
            count: sql<number>`count(*)`.mapWith(Number),
        })
        .from(schema.progressTable)
        .leftJoin(schema.tasksTable, eq(schema.progressTable.taskId, schema.tasksTable.id))
        .where(and(
            eq(schema.progressTable.userId, userId),
            eq(schema.progressTable.completed, true),
            sql`${schema.progressTable.date} >= ${startDate}`,
            sql`${schema.progressTable.date} <= ${endDate}`
        ))
        .groupBy(schema.tasksTable.name)
        .orderBy((fields) => desc(fields.count));

    // Get count of days where all tasks were completed
    const perfectDays = await db
        .select({
            count: sql<number>`count(distinct ${schema.progressTable.date})`.mapWith(Number),
        })
        .from(schema.progressTable)
        .where(and(
            eq(schema.progressTable.userId, userId),
            eq(schema.progressTable.completed, true),
            sql`${schema.progressTable.date} >= ${startDate}`,
            sql`${schema.progressTable.date} <= ${endDate}`
        ))
        .groupBy(schema.progressTable.date)
        .having(sql`count(*) = ${TOTAL_TASKS}`);

    const totalPerfectDays = perfectDays.length;

    return NextResponse.json({
        taskCompletions,
        totalPerfectDays,
    });
}