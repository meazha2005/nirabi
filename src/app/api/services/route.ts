import { NextRequest, NextResponse } from "next/server";
import { query, TABLE_PREFIX } from "@/db/mysql";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const servTable = `${TABLE_PREFIX}services`;
  const services = await query(`SELECT * FROM ${servTable} ORDER BY order_index ASC`);
  return NextResponse.json(services || []);
}
