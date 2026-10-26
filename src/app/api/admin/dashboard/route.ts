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
    const leadsTable = `${TABLE_PREFIX}leads`;

    const totalRes: any = await query(`SELECT COUNT(*) as cnt FROM ${leadsTable}`);
    const enquiredRes: any = await query(`SELECT COUNT(*) as cnt FROM ${leadsTable} WHERE lead_status = 'Enquired'`);
    const pendingRes: any = await query(`SELECT COUNT(*) as cnt FROM ${leadsTable} WHERE lead_status = 'Pending'`);
    const confirmedRes: any = await query(`SELECT COUNT(*) as cnt FROM ${leadsTable} WHERE lead_status = 'Confirmed'`);
    const completedRes: any = await query(`SELECT COUNT(*) as cnt FROM ${leadsTable} WHERE lead_status = 'Completed'`);
    const rejectRes: any = await query(`SELECT COUNT(*) as cnt FROM ${leadsTable} WHERE lead_status = 'Reject'`);
    const hotRes: any = await query(`SELECT COUNT(*) as cnt FROM ${leadsTable} WHERE lead_tier = 'HOT'`);

    return NextResponse.json({
      total_leads: totalRes[0]?.cnt || 0,
      enquired_leads: enquiredRes[0]?.cnt || 0,
      pending_leads: pendingRes[0]?.cnt || 0,
      confirmed_leads: confirmedRes[0]?.cnt || 0,
      completed_leads: completedRes[0]?.cnt || 0,
      reject_leads: rejectRes[0]?.cnt || 0,
      hot_leads: hotRes[0]?.cnt || 0,
    });
  } catch (err) {
    console.error("Dashboard metrics error:", err);
    return NextResponse.json({ detail: "Failed to load dashboard metrics" }, { status: 500 });
  }
}
