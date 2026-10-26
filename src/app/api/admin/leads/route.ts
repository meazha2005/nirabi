import { NextRequest, NextResponse } from "next/server";
import { query, TABLE_PREFIX, initTables } from "@/db/mysql";
import { seedData } from "@/db/seed";
const { verifyAccessToken } = require("@/backend/security");

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

async function verifyAdmin(req: NextRequest) {
  await ensureDb();
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false;
  const token = authHeader.split(" ")[1];
  const payload = verifyAccessToken(token);
  return !!payload;
}

export async function GET(req: NextRequest) {
  if (!(await verifyAdmin(req))) {
    return NextResponse.json({ detail: "Not authenticated" }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const search = url.searchParams.get("search");
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("page_size") || "50", 10);
    const offset = (page - 1) * pageSize;

    const leadsTable = `${TABLE_PREFIX}leads`;
    let whereClauses: string[] = [];
    let params: any[] = [];

    if (status) {
      whereClauses.push("lead_status = ?");
      params.push(status);
    }

    if (search) {
      whereClauses.push("(name LIKE ? OR phone LIKE ? OR email LIKE ? OR location LIKE ?)");
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const countRes: any = await query(`SELECT COUNT(*) as total FROM ${leadsTable} ${whereSql}`, params);
    const total = countRes[0]?.total || 0;

    const items: any = await query(
      `SELECT * FROM ${leadsTable} ${whereSql} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, pageSize, offset]
    );

    return NextResponse.json({ total, items: items || [] });
  } catch (err) {
    console.error("Fetch leads error:", err);
    return NextResponse.json({ detail: "Failed to fetch leads" }, { status: 500 });
  }
}
