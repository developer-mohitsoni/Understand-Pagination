import { NextResponse } from "next/server";
import {
  fetchUsersWithPagination,
  createUser,
} from "@/app/services/userService";
import { getPaginationParams } from "@/app/services/paginationService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { cursor, limit } = getPaginationParams(searchParams);

  const { users, nextCursor } = await fetchUsersWithPagination(limit, cursor);

  return NextResponse.json({ users, nextCursor });
}

export async function POST(request: Request) {
  const { name, email } = await request.json();

  if (!name || !email) {
    return NextResponse.json(
      { message: "Name and email are required" },
      { status: 400 }
    );
  }

  try {
    const newUser = await createUser(name, email);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
}
