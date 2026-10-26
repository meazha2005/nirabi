import { NextRequest, NextResponse } from "next/server";
import { query, TABLE_PREFIX } from "@/db/mysql";
const { verifyAccessToken } = require("@/backend/security");

async function verifyAdmin(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false;
  const token = authHeader.split(" ")[1];
  const payload = verifyAccessToken(token);
  return !!payload;
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  const { id } = params;
  const convsTable = `${TABLE_PREFIX}conversations`;
  const msgsTable = `${TABLE_PREFIX}messages`;

  const conversations: any = await query(`SELECT * FROM ${convsTable} WHERE lead_id = ?`, [id]);
  const result = [];

  for (const convo of (conversations || [])) {
    const messages = await query(
      `SELECT role, content, created_at FROM ${msgsTable} WHERE conversation_id = ? ORDER BY seq ASC, created_at ASC`,
      [convo.id]
    );
    result.push({
      ...convo,
      messages: messages || [],
    });
  }

  return NextResponse.json(result);
}
