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

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  const { id } = params;
  const body = await req.json();
  const { lead_status } = body || {};

  const validStatuses = ["Enquired", "Pending", "Confirmed", "Completed", "Reject"];
  if (!validStatuses.includes(lead_status)) {
    return NextResponse.json({ detail: `lead_status must be one of ${validStatuses.join(", ")}` }, { status: 400 });
  }

  const leadsTable = `${TABLE_PREFIX}leads`;
  await query(`UPDATE ${leadsTable} SET lead_status = ? WHERE id = ?`, [lead_status, id]);
  const updated: any = await query(`SELECT * FROM ${leadsTable} WHERE id = ?`, [id]);

  if (!updated || updated.length === 0) {
    return NextResponse.json({ detail: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json(updated[0]);
}
