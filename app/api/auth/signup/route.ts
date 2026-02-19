import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db/drizzle";
import { usersTable } from "../../../../db/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.name, username));


  if (user.length > 0) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // hashed password
  const hashedPassword = await hash(password, 10);

  const newUser = await db
    .insert(usersTable)
    .values({
      name: username,
      password: hashedPassword,
    })
    .returning({ id: usersTable.id, name: usersTable.name });

  if (!newUser || newUser.length === 0) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "User created successfully", user: newUser[0] },
    { status: 201 }
  );
}
