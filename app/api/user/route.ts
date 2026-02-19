import { eq } from "drizzle-orm";
import { db } from "db/drizzle";
import { usersTable } from "db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const user = await req.json();

  const userInDb = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, user.id));

  if (!userInDb || userInDb.length === 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await db
    .update(usersTable)
    .set({
      ...user
    })
    .where(eq(usersTable.id, user.id));

  return NextResponse.json({ message: "User updated" }, { status: 200 });
}