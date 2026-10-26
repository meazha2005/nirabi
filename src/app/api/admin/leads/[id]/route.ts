import { NextRequest, NextResponse } from "next/server";
import { query, TABLE_PREFIX, initTables } from "@/db/mysql";
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
  const leadsTable = `${TABLE_PREFIX}leads`;
  const leads: any = await query(`SELECT * FROM ${leadsTable} WHERE id = ?`, [id]);

  if (!leads || leads.length === 0) {
    return NextResponse.json({ detail: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json(leads[0]);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  const { id } = params;
  const leadsTable = `${TABLE_PREFIX}leads`;
  await query(`DELETE FROM ${leadsTable} WHERE id = ?`, [id]);

  return NextResponse.json({ status: "success" });
}
