import { NextRequest, NextResponse } from "next/server";
import { query, TABLE_PREFIX, initTables } from "@/db/mysql";
const { verifyAccessToken } = require("@/backend/security");

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyAccessToken(token);
  if (!payload || !payload.sub) {
    return NextResponse.json({ detail: "Invalid or expired token" }, { status: 401 });
  }

  const usersTable = `${TABLE_PREFIX}users`;
  const users: any = await query(`SELECT id, name, email, role FROM ${usersTable} WHERE email = ?`, [payload.sub]);

  if (!users || users.length === 0) {
    return NextResponse.json({ detail: "User not found" }, { status: 401 });
  }

  return NextResponse.json(users[0]);
}
