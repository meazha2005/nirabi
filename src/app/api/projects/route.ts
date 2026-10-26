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

function formatProject(p: any) {
  let gallery = [];
  try {
    gallery = p.gallery ? (typeof p.gallery === "string" ? JSON.parse(p.gallery) : p.gallery) : [];
  } catch {
    gallery = [];
  }

  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    location: p.location,
    category: p.category,
    size_sqft: p.size_sqft,
    year: p.year,
    hero_image: p.hero_image,
    gallery,
    concept: p.concept,
    materials: p.materials,
    design_approach: p.design_approach,
    challenges: p.challenges,
    result: p.result,
  };
}

export async function GET(req: NextRequest) {
  await ensureDb();
  const url = new URL(req.url);
  const category = url.searchParams.get("category");
  const projTable = `${TABLE_PREFIX}projects`;

  let projects: any = [];
  if (category && category !== "All") {
    projects = await query(`SELECT * FROM ${projTable} WHERE category = ?`, [category]);
  } else {
    projects = await query(`SELECT * FROM ${projTable}`);
  }

  return NextResponse.json(projects ? projects.map(formatProject) : []);
}
