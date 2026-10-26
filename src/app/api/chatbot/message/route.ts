import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { query, TABLE_PREFIX, initTables } from "@/db/mysql";
import { seedData } from "@/db/seed";
const chatbotService = require("@/backend/chatbot_service");
const { scoreLead } = require("@/backend/lead_scoring");

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

function hasContactInfo(fields: any = {}) {
  const phone = fields.phone;
  const email = fields.email;
  const hasPhone = phone && String(phone).trim().length > 0 && phone !== "0000000000";
  const hasEmail = email && String(email).trim().length > 0 && email !== "notshared@nirabi.studio";
  return Boolean(hasPhone || hasEmail);
}

export async function POST(req: NextRequest) {
  try {
    await ensureDb();
    const body = await req.json();
    const { session_id, message, client_messages, context } = body || {};

    if (!session_id || !message) {
      return NextResponse.json({ detail: "session_id and message are required" }, { status: 400 });
    }

    const convsTable = `${TABLE_PREFIX}conversations`;
    const msgsTable = `${TABLE_PREFIX}messages`;
    const leadsTable = `${TABLE_PREFIX}leads`;

    const history = Array.isArray(client_messages)
      ? client_messages.map((m: any) => ({ role: m.role, content: m.content }))
      : [];

    const knownFields = {};

    const turnResult = await chatbotService.runTurn(history, knownFields, message, context);
    const { score, tier } = scoreLead(turnResult.fields);

    if (turnResult.is_complete || hasContactInfo(turnResult.fields)) {
      let convos: any = await query(`SELECT * FROM ${convsTable} WHERE session_id = ?`, [session_id]);
      let convo = null;
      let leadId = null;

      if (!convos || convos.length === 0) {
        const convId = uuidv4();
        await query(`INSERT INTO ${convsTable} (id, session_id) VALUES (?, ?)`, [convId, session_id]);
        convos = await query(`SELECT * FROM ${convsTable} WHERE id = ?`, [convId]);
      }
      convo = convos[0];

      const f = turnResult.fields;
      if (!convo.lead_id) {
        leadId = uuidv4();
        await query(
          `INSERT INTO ${leadsTable} (id, name, phone, email, location, property_type, project_type, property_size, rooms, design_style, budget, timeline, requirements, lead_score, lead_tier, lead_status, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            leadId, f.name || null, f.phone || null, f.email || null, f.location || null,
            f.property_type || null, f.project_type || null, f.property_size || null,
            f.rooms || null, f.design_style || null, f.budget || null, f.timeline || null,
            f.requirements || null, score, tier, 'Enquired', 'Design Concierge'
          ]
        );
        await query(`UPDATE ${convsTable} SET lead_id = ? WHERE id = ?`, [leadId, convo.id]);
      } else {
        leadId = convo.lead_id;
        const updates: string[] = [];
        const params: any[] = [];
        for (const key of chatbotService.REQUIRED_FIELDS) {
          if (f[key]) {
            updates.push(`${key} = ?`);
            params.push(f[key]);
          }
        }
        updates.push(`lead_score = ?`, `lead_tier = ?`);
        params.push(score, tier, leadId);

        if (updates.length > 0) {
          await query(`UPDATE ${leadsTable} SET ${updates.join(', ')} WHERE id = ?`, params);
        }
      }

      await query(`DELETE FROM ${msgsTable} WHERE conversation_id = ?`, [convo.id]);

      const fullTranscript = [...history, { role: 'user', content: message }, { role: 'assistant', content: turnResult.reply }];
      const baseTime = Date.now();

      for (let idx = 0; idx < fullTranscript.length; idx++) {
        const msg = fullTranscript[idx];
        const msgId = uuidv4();
        const timeOffset = new Date(baseTime + (idx * 1000));
        await query(
          `INSERT INTO ${msgsTable} (id, conversation_id, role, content, seq, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
          [msgId, convo.id, msg.role, msg.content, idx + 1, timeOffset]
        );
      }

      if (turnResult.is_complete) {
        const summaryText = chatbotService.generateSummary(turnResult.fields);
        await query(`UPDATE ${convsTable} SET summary = ? WHERE id = ?`, [summaryText, convo.id]);
      }
    }

    return NextResponse.json({
      session_id,
      reply: turnResult.reply,
      extracted_fields: turnResult.fields,
      is_complete: turnResult.is_complete,
      lead_score: score,
      lead_tier: tier,
    });
  } catch (err) {
    console.error("Chatbot API error:", err);
    return NextResponse.json(
      { detail: "The Design Concierge is temporarily unavailable. Please use the contact form instead." },
      { status: 503 }
    );
  }
}
