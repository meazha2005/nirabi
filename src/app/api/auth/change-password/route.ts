import { NextRequest, NextResponse } from "next/server";
import { query, TABLE_PREFIX } from "@/db/mysql";
const { verifyAccessToken, verifyPassword, hashPassword } = require("@/backend/security");

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyAccessToken(token);
  if (!payload || !payload.sub) {
    return NextResponse.json({ detail: "Invalid or expired token" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { current_password, new_password } = body || {};

    if (!current_password || !new_password) {
      return NextResponse.json({ detail: "Current password and new password are required" }, { status: 400 });
    }

    const usersTable = `${TABLE_PREFIX}users`;
    const users: any = await query(`SELECT * FROM ${usersTable} WHERE email = ?`, [payload.sub]);

    if (!users || users.length === 0) {
      return NextResponse.json({ detail: "User not found" }, { status: 401 });
    }

    const user = users[0];
    const isValid = await verifyPassword(current_password, user.hashed_password);
    if (!isValid) {
      return NextResponse.json({ detail: "Incorrect current password" }, { status: 400 });
    }

    const newHashed = await hashPassword(new_password);
    await query(`UPDATE ${usersTable} SET hashed_password = ? WHERE id = ?`, [newHashed, user.id]);

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.error("Change password error:", err);
    return NextResponse.json({ detail: "Failed to update password" }, { status: 500 });
  }
}
