import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  AUTH_COOKIE_NAME,
  createSessionToken,
} from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const trimmedUser = typeof username === "string" ? username.trim() : "";
    const trimmedPass = typeof password === "string" ? password : "";

    if (trimmedUser !== ADMIN_USERNAME || trimmedPass !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid ID number or password." },
        { status: 401 }
      );
    }

    const token = createSessionToken(ADMIN_USERNAME);

    const response = NextResponse.json({
      success: true,
      user: {
        username: ADMIN_USERNAME,
        role: "Administrator",
      },
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
