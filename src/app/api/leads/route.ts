import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { query, TABLE_PREFIX } from "@/db/mysql";
const { scoreLead } = require("@/backend/lead_scoring");

const INDIAN_PHONE_RE = /^(\+91[\-\s]?)?[6-9]\d{9}$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      phone,
      email,
      location,
      property_type,
      project_type,
      property_size,
      rooms,
      design_style,
      budget,
      timeline,
      requirements,
      source,
    } = body || {};

    if (!name || !phone) {
      return NextResponse.json({ detail: "Name and phone number are required." }, { status: 400 });
    }

    const cleanPhone = String(phone).replace(/\s+/g, "");
    if (!INDIAN_PHONE_RE.test(cleanPhone)) {
      return NextResponse.json({ detail: "Enter a valid Indian phone number" }, { status: 400 });
    }

    const fields = { name, phone, email, location, property_type, project_type, property_size, rooms, design_style, budget, timeline, requirements };
    const { score, tier } = scoreLead(fields);
    const leadId = uuidv4();
    const leadsTable = `${TABLE_PREFIX}leads`;

    await query(
      `INSERT INTO ${leadsTable} (id, name, phone, email, location, property_type, project_type, property_size, rooms, design_style, budget, timeline, requirements, lead_score, lead_tier, lead_status, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        leadId, name, phone, email || null, location || null,
        property_type || null, project_type || null, property_size || null,
        rooms || null, design_style || null, budget || null, timeline || null,
        requirements || null, score, tier, "Enquired", source || "Contact Form"
      ]
    );

    const inserted: any = await query(`SELECT * FROM ${leadsTable} WHERE id = ?`, [leadId]);
    return NextResponse.json(inserted[0], { status: 201 });
  } catch (err) {
    console.error("Create lead error:", err);
    return NextResponse.json({ detail: "Failed to submit lead request." }, { status: 500 });
  }
}
