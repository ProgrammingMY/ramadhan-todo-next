import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db/drizzle";
import { usersTable } from "../../../../db/schema";
import { compare } from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.name, username));

    if (!user || user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await compare(password, user[0].password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    return NextResponse.json(
      { message: "Login successful", user: user[0] },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
