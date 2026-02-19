import { db } from "db/drizzle";
import { periodTable } from "db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    const date = url.searchParams.get("date");

    if (!userId || !date) {
        return NextResponse.json({ error: "userId and date are required" }, { status: 400 });
    }

    const period = await db.query.periodTable.findMany({ where: and(eq(periodTable.userId, userId), eq(periodTable.yearMonth, date)), columns: { isPeriod: true, date: true } });

    if (!period) {
        return NextResponse.json({ error: "Period not found" }, { status: 404 });
    }

    return NextResponse.json(period);
}

export async function PATCH(request: NextRequest) {
    const { userId, date, isPeriod } = await request.json();

    const yearMonth = date.split("-")[0] + "-" + date.split("-")[1];

    await db.insert(periodTable).values({ userId, date, yearMonth, isPeriod }).onConflictDoUpdate({
        target: [periodTable.userId, periodTable.date],
        set: { isPeriod }
    });

    return NextResponse.json({ message: "Period updated" });

}