import { NextRequest, NextResponse } from "next/server";
import { query, TABLE_PREFIX, initTables } from "@/db/mysql";
import { seedData } from "@/db/seed";
const { verifyPassword, createAccessToken } = require("@/backend/security");

let dbInitialized = false;
async function ensureDb() {
  if (!dbInitialized) {
    try {
      await initTables();
      await seedData();
      dbInitialized = true;
    } catch (err) {
      console.error("[Database Auto-Init Error]:", err);
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureDb();
    const body = await req.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json({ detail: "Email and password are required" }, { status: 400 });
    }

    const usersTable = `${TABLE_PREFIX}users`;
    const users: any = await query(`SELECT * FROM ${usersTable} WHERE email = ?`, [email]);

    if (!users || users.length === 0) {
      return NextResponse.json({ detail: "Incorrect email or password" }, { status: 401 });
    }

    const user = users[0];
    const isValid = await verifyPassword(password, user.hashed_password);
    if (!isValid) {
      return NextResponse.json({ detail: "Incorrect email or password" }, { status: 401 });
    }

    const token = createAccessToken(user.email);
    return NextResponse.json({ access_token: token, token_type: "bearer" });
  } catch (err) {
    console.error("Login API error:", err);
    return NextResponse.json({ detail: "Failed to login" }, { status: 500 });
  }
}
