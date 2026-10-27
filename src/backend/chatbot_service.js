const REQUIRED_FIELDS = [
  "name", "phone", "email", "location", "property_type", "project_type",
  "property_size", "rooms", "design_style", "budget", "timeline", "requirements",
];

const isEmail = (s) => /[\w\.-]+@[\w\.-]+\.\w+/.test(String(s || ''));
const isPhone = (s) => /\b[6-9]\d{9}\b/.test(String(s || '').replace(/[\s\-]/g, ''));

function runOfflineMockTurn(messages, knownFields) {
  // Extract last user message
  let lastUserMsg = "";
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === "user") {
      lastUserMsg = messages[i].content.trim();
      break;
    }
  }

  // Extract last assistant message
  let lastAssistantMsg = "";
  for (let i = messages.length - 2; i >= 0; i--) {
    if (messages[i].role === "assistant") {
      lastAssistantMsg = messages[i].content.toLowerCase();
      break;
    }
  }

  const fields = { ...knownFields };
  const lastMsgLower = lastUserMsg.toLowerCase();

  // Turn-by-Turn extraction based on the assistant question asked
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].role === "assistant") {
      const astMsg = messages[i].content.toLowerCase();
      if (i + 1 < messages.length && messages[i + 1].role === "user") {
        const usrMsg = messages[i + 1].content.toLowerCase();
        const usrRaw = messages[i + 1].content.trim();
        const refusals = ["no", "nope", "skip", "no need", "private", "not sharing", "sorry no", "dont want", "later", "not now"];
        const isRefusal = refusals.some(r => usrMsg === r || usrMsg.startsWith(r + " "));

        // Extract email or phone anywhere in user input
        const emMatch = usrRaw.match(/[\w\.-]+@[\w\.-]+\.\w+/);
        if (emMatch) fields["email"] = emMatch[0];

        const phMatch = usrRaw.replace(/[\s\-]/g, '').match(/\b[6-9]\d{9}\b/);
        if (phMatch) fields["phone"] = phMatch[0];

        // 1. Email matching
        if (astMsg.includes("email")) {
          if (emMatch) fields["email"] = emMatch[0];
          else if (isRefusal) fields["email"] = "notshared@nirabi.studio";
        }

        // 2. Phone matching
        else if (astMsg.includes("phone") || astMsg.includes("mobile") || astMsg.includes("number to reach")) {
          if (phMatch) fields["phone"] = phMatch[0];
          else if (isRefusal) fields["phone"] = "0000000000";
        }

        // 3. Budget matching
        else if (astMsg.includes("budget") || astMsg.includes("approximate budget")) {
          if (isRefusal) fields["budget"] = "Flexible / Standard";
          else if (!isEmail(usrRaw) && !isPhone(usrRaw) && usrMsg.split(/\s+/).length <= 6) {
            fields["budget"] = usrRaw;
          }
        }

        // 4. Design style / look matching
        else if (
          astMsg.includes("design look") ||
          astMsg.includes("design style") ||
          astMsg.includes("look do you prefer") ||
          astMsg.includes("traditional wood") ||
          astMsg.includes("prefer")
        ) {
          if (isRefusal) {
            fields["design_style"] = "Modern Contemporary";
          } else if (usrMsg.includes("luxury")) {
            fields["design_style"] = "Luxury";
          } else if (usrMsg.includes("modern")) {
            fields["design_style"] = "Modern";
          } else if (usrMsg.includes("minimal")) {
            fields["design_style"] = "Minimalist";
          } else if (usrMsg.includes("classic") || usrMsg.includes("traditional") || usrMsg.includes("wood")) {
            fields["design_style"] = "Traditional Wood";
          } else if (usrMsg.includes("warm") || usrMsg.includes("earthy")) {
            fields["design_style"] = "Warm & Earthy";
          } else if (usrMsg.includes("contemporary")) {
            fields["design_style"] = "Contemporary";
          } else if (!isEmail(usrRaw) && !isPhone(usrRaw) && usrMsg.split(/\s+/).length <= 6) {
            fields["design_style"] = usrRaw;
          }
        }

        // 5. Property type matching
        else if (astMsg.includes("type of property") || astMsg.includes("property is this") || astMsg.includes("2bhk/3bhk")) {
          if (usrMsg.includes("apartment") || usrMsg.includes("flat") || usrMsg.includes("2bhk") || usrMsg.includes("3bhk") || usrMsg.includes("4bhk") || usrMsg.includes("duplex")) {
            fields["property_type"] = "Apartment";
            fields["project_type"] = "Apartment & Flat Interiors";
          } else if (usrMsg.includes("villa") || usrMsg.includes("house") || usrMsg.includes("independent")) {
            fields["property_type"] = "Villa";
            fields["project_type"] = "Independent Villa Interiors";
          } else if (usrMsg.includes("office") || usrMsg.includes("commercial") || usrMsg.includes("workspace")) {
            fields["property_type"] = "Office";
            fields["project_type"] = "Office & Commercial Interiors";
          } else if (usrMsg.includes("kitchen")) {
            fields["property_type"] = "Kitchen";
            fields["project_type"] = "Modular Kitchens";
          } else if (!isRefusal && !isEmail(usrRaw) && !isPhone(usrRaw) && usrMsg.split(/\s+/).length <= 5) {
            fields["property_type"] = usrRaw;
          }
        }

        // 6. Location matching
        else if (astMsg.includes("located") || astMsg.includes("location") || astMsg.includes("where is your")) {
          if (isRefusal) fields["location"] = "Chennai";
          else if (!isEmail(usrRaw) && !isPhone(usrRaw) && usrMsg.split(/\s+/).length <= 6) {
            fields["location"] = usrRaw.replace(/^(i am in|i live in|located in|in|at)\s+/i, '').trim();
          }
        }

        // 7. Name matching
        else if (astMsg.includes("name, please") || astMsg.includes("know your name") || astMsg.includes("your name")) {
          if (isRefusal) fields["name"] = "Valued Customer";
          else if (!isEmail(usrRaw) && !isPhone(usrRaw) && usrMsg.split(/\s+/).length <= 5) {
            fields["name"] = usrRaw.replace(/^(my name is|i am|this is|i'm)\s+/i, '').trim();
          }
        }
      }
    }
  }

  // Global extraction & fallback on last user message
  const lastEmMatch = lastUserMsg.match(/[\w\.-]+@[\w\.-]+\.\w+/);
  if (lastEmMatch) fields.email = lastEmMatch[0];

  const lastPhMatch = lastUserMsg.replace(/[\s\-]/g, '').match(/\b[6-9]\d{9}\b/);
  if (lastPhMatch) fields.phone = lastPhMatch[0];

  // Design style fallback
  if (!fields.design_style) {
    if (lastMsgLower.includes("luxury")) fields.design_style = "Luxury";
    else if (lastMsgLower.includes("minimal")) fields.design_style = "Minimalist";
    else if (lastMsgLower.includes("modern") || lastMsgLower.includes("contemporary")) fields.design_style = "Modern";
    else if (lastMsgLower.includes("traditional") || lastMsgLower.includes("wood") || lastMsgLower.includes("classic")) fields.design_style = "Traditional Wood";
    else if (lastAssistantMsg.includes("design look") || lastAssistantMsg.includes("design style") || lastAssistantMsg.includes("prefer")) {
      if (!isEmail(lastUserMsg) && !isPhone(lastUserMsg) && lastMsgLower.split(/\s+/).length <= 6) {
        fields.design_style = lastUserMsg;
      }
    }
  }

  // Property type fallback
  if (!fields.property_type) {
    if (lastMsgLower.includes("villa") || lastMsgLower.includes("independent house")) {
      fields.property_type = "Villa";
      if (!fields.project_type) fields.project_type = "Independent Villa Interiors";
    } else if (lastMsgLower.includes("apartment") || lastMsgLower.includes("flat") || lastMsgLower.includes("2bhk") || lastMsgLower.includes("3bhk") || lastMsgLower.includes("4bhk") || lastMsgLower.includes("duplex")) {
      fields.property_type = "Apartment";
      if (!fields.project_type) fields.project_type = "Apartment & Flat Interiors";
    } else if (lastMsgLower.includes("kitchen")) {
      fields.property_type = "Kitchen";
      if (!fields.project_type) fields.project_type = "Modular Kitchens";
    } else if (lastMsgLower.includes("office") || lastMsgLower.includes("commercial")) {
      fields.property_type = "Office";
      if (!fields.project_type) fields.project_type = "Office & Commercial Interiors";
    } else if (lastAssistantMsg.includes("property")) {
      if (!isEmail(lastUserMsg) && !isPhone(lastUserMsg) && lastMsgLower.split(/\s+/).length <= 5) {
        fields.property_type = lastUserMsg;
      }
    }
  }

  // Location fallback
  if (!fields.location && (lastAssistantMsg.includes("located") || lastAssistantMsg.includes("location") || lastAssistantMsg.includes("where is your"))) {
    if (!isEmail(lastUserMsg) && !isPhone(lastUserMsg) && lastMsgLower.split(/\s+/).length <= 6) {
      fields.location = lastUserMsg.replace(/^(i am in|i live in|located in|in|at)\s+/i, '').trim();
    }
  }

  // Budget fallback
  if (!fields.budget && (lastAssistantMsg.includes("budget") || lastMsgLower.includes("lakh") || lastMsgLower.includes("crore") || /₹?\d+/.test(lastMsgLower))) {
    if (!isEmail(lastUserMsg) && !isPhone(lastUserMsg) && lastMsgLower.split(/\s+/).length <= 6) {
      fields.budget = lastUserMsg;
    }
  }

  // Name fallback
  if (!fields.name && !lastAssistantMsg.includes("name")) {
    const nameMatch = lastUserMsg.match(/^(my name is|i am|this is|i'm)\s+([a-zA-Z\s]{2,20})/i);
    if (nameMatch && !isEmail(nameMatch[2]) && !isPhone(nameMatch[2])) {
      fields.name = nameMatch[2].trim();
    }
  } else if (!fields.name && lastAssistantMsg.includes("name")) {
    if (!isEmail(lastUserMsg) && !isPhone(lastUserMsg) && lastMsgLower.split(/\s+/).length <= 4) {
      fields.name = lastUserMsg.replace(/^(my name is|i am|this is|i'm)\s+/i, '').trim();
    }
  }

  // Check if image/pricing prefix was ALREADY shown in history
  const fullHistoryText = messages.map(m => m.content).join(" ").toLowerCase();
  const alreadyShowedImage = fullHistoryText.includes("![nirabi");
  const alreadyShowedPricing = fullHistoryText.includes("standard") && fullHistoryText.includes("premium") && fullHistoryText.includes("luxury");

  let servicePrefix = "";
  if (!alreadyShowedImage) {
    if (lastMsgLower.includes("villa")) {
      servicePrefix = "For independent villas, NIRABI DESIGN STUDIO handles complete interior design and carpentry, from living rooms to staircases and bedrooms.\n\nHere is a recent villa project by NIRABI:\n![NIRABI Villa Project](/generated/hero_villa.jpg)\n\n";
    } else if (lastMsgLower.includes("apartment") || lastMsgLower.includes("flat")) {
      servicePrefix = "For apartments, we design smart space-saving storage, false ceilings, and beautiful modern living spaces.\n\nHere is a recent apartment project by NIRABI:\n![NIRABI Apartment Project](/generated/service_apartment.jpg)\n\n";
    } else if (lastMsgLower.includes("kitchen")) {
      servicePrefix = "For modular kitchens, we use waterproof plywood, soft-close German fittings, and durable stone countertops built for everyday cooking.\n\nHere is a modular kitchen by NIRABI:\n![NIRABI Modular Kitchen](/generated/service_kitchen.jpg)\n\n";
    } else if (lastMsgLower.includes("office") || lastMsgLower.includes("commercial") || lastMsgLower.includes("corporate")) {
      servicePrefix = "For offices and commercial spaces, we build ergonomic workstations, meeting rooms, reception areas, and manager cabins.\n\nHere is an office project by NIRABI:\n![NIRABI Office Project](/generated/service_office.jpg)\n\n";
    }
  }

  let pricingPrefix = "";
  const isAskingPrice = ["cost", "price", "pricing", "package", "packages", "rate", "rates", "how much"].some(w => lastMsgLower.includes(w));
  if (!alreadyShowedPricing && isAskingPrice && !lastAssistantMsg.includes("budget")) {
    pricingPrefix = "At NIRABI DESIGN STUDIO, our estimated interior budgets are:\n- **Standard** (₹1,100–₹1,500/sq.ft): Quality modular woodwork, laminates & hardware.\n- **Premium** (₹1,800–₹2,400/sq.ft): Custom veneer woodwork, false ceilings & ambient lighting.\n- **Luxury** (₹2,800+/sq.ft): Italian marble, high-end finishes, and full turnkey execution.\n\n";
  }

  // Determine remaining required information in natural sequence
  const missing = ["name", "location", "property_type", "design_style", "budget", "email", "phone"].filter(f => !fields[f]);
  let isComplete = false;
  let reply = "";

  if (missing.length === 0) {
    reply = "Thank you! We have received your project details. Our design team in Madipakkam, Chennai will contact you shortly with customized 3D design ideas and quotation for your home.";
    isComplete = true;
  } else {
    const nextF = missing[0];
    if (nextF === "name") {
      reply = "Got it! May I know your name, please?";
    } else if (nextF === "location") {
      reply = "Where is your house or flat located in Chennai? (e.g., Madipakkam, OMR, Velachery, Anna Nagar)";
    } else if (nextF === "property_type") {
      reply = "What type of property is this? (e.g., 2BHK/3BHK Apartment, Independent Villa, Kitchen, or Office)";
    } else if (nextF === "design_style") {
      reply = "What design look do you prefer? (e.g., Modern, Minimal, Traditional Wood, or Luxury)";
    } else if (nextF === "budget") {
      reply = "What is your approximate budget for this interior work? (e.g., ₹10–15 Lakhs, Standard, Premium, or Luxury)";
    } else if (nextF === "email") {
      reply = (lastAssistantMsg && lastAssistantMsg.includes("email") && !fields.email)
        ? "Please share a valid email address so we can email design concepts."
        : "Could you share your email address so we can email design concepts and quotes?";
    } else if (nextF === "phone") {
      reply = (lastAssistantMsg && lastAssistantMsg.includes("phone") && !fields.phone)
        ? "Please share a valid 10-digit mobile number so our team can reach you."
        : "Lastly, what is the best phone number to reach you on?";
    } else {
      reply = "Could you tell us a little more about your home requirements?";
    }
  }

  let fullReply = "";
  if (servicePrefix) fullReply += servicePrefix;
  if (pricingPrefix) fullReply += pricingPrefix;

  fullReply += reply;

  return {
    reply: fullReply.trim(),
    fields,
    is_complete: isComplete,
  };
}

async function runTurn(history = [], knownFields = {}, userMessage = "", context = null) {
  const mergedKnown = { ...(context || {}), ...knownFields };
  const messages = [...history, { role: "user", content: userMessage }];

  const result = runOfflineMockTurn(messages, mergedKnown);
  return result;
}

function generateSummary(fields = {}) {
  const parts = [];
  const project = fields.project_type || "an interior design project";
  const prop = fields.property_type;
  const size = fields.property_size;
  const location = fields.location;

  let leadLine = `Client wants ${String(project).toLowerCase()}`;
  if (prop && prop.toLowerCase() !== String(project).toLowerCase()) {
    leadLine += ` for a ${size ? size + ' ' : ''}${String(prop).toLowerCase()}`;
  }
  if (location) leadLine += ` in ${location}`;
  parts.push(leadLine + ".");

  if (fields.design_style) parts.push(`Style: ${fields.design_style}.`);
  if (fields.budget) parts.push(`Budget: ${fields.budget}.`);
  if (fields.timeline) parts.push(`Timeline: ${fields.timeline}.`);
  if (fields.requirements) parts.push(`Requirements: ${fields.requirements}.`);

  return parts.join(" ");
}

module.exports = {
  REQUIRED_FIELDS,
  runTurn,
  generateSummary,
};
