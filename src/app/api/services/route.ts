import { NextRequest, NextResponse } from "next/server";
import { query, TABLE_PREFIX, initTables } from "@/db/mysql";
import { seedData } from "@/db/seed";

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

export async function GET(req: NextRequest) {
  await ensureDb();
  const servTable = `${TABLE_PREFIX}services`;
  const services = await query(`SELECT * FROM ${servTable} ORDER BY order_index ASC`);
  return NextResponse.json(services || []);
}
