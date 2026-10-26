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

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  await ensureDb();
  const { slug } = params;
  const projTable = `${TABLE_PREFIX}projects`;
  const projects: any = await query(`SELECT * FROM ${projTable} WHERE slug = ?`, [slug]);

  if (!projects || projects.length === 0) {
    return NextResponse.json({ detail: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(formatProject(projects[0]));
}
