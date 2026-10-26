const REQUIRED_FIELDS = [
  "name", "phone", "email", "location", "property_type", "project_type",
  "property_size", "rooms", "design_style", "budget", "timeline", "requirements",
];

const isEmail = (s) => /[\w\.-]+@[\w\.-]+\.\w+/.test(s);
const isPhone = (s) => /\b[6-9]\d{9}\b/.test(s.replace(/[\s\-]/g, ''));

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

  // Turn-by-Turn extraction based on the LAST assistant question asked
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].role === "assistant") {
      const astMsg = messages[i].content.toLowerCase();
      if (i + 1 < messages.length && messages[i + 1].role === "user") {
        const usrMsg = messages[i + 1].content.toLowerCase();
        const usrRaw = messages[i + 1].content.trim();
        const refusals = ["no", "nope", "skip", "no need", "private", "not sharing", "sorry no", "dont want", "later"];
        const isRefusal = refusals.some(r => usrMsg === r || usrMsg.startsWith(r + " "));

        // Extract email or phone anywhere in user input
        const emMatch = usrRaw.match(/[\w\.-]+@[\w\.-]+\.\w+/);
        if (emMatch) fields["email"] = emMatch[0];

        const phMatch = usrRaw.match(/\b[6-9]\d{9}\b/);
        if (phMatch) fields["phone"] = phMatch[0];

        // Match based on the LAST question asked in assistant message
        if (astMsg.includes("email address")) {
          if (emMatch) fields["email"] = emMatch[0];
          else if (isRefusal) fields["email"] = "notshared@nirabi.studio";
        } else if (astMsg.includes("phone number")) {
          if (phMatch) fields["phone"] = phMatch[0];
          else if (isRefusal) fields["phone"] = "0000000000";
        } else if (astMsg.includes("approximate budget")) {
          if (isRefusal) fields["budget"] = "Not Specified";
          else if (!isEmail(usrRaw) && !isPhone(usrRaw) && usrMsg.split(/\s+/).length <= 5) {
            fields["budget"] = usrRaw;
          }
        } else if (astMsg.includes("design style")) {
          if (isRefusal) fields["design_style"] = "Warm Contemporary";
          else if (usrMsg.includes("modern")) fields["design_style"] = "Modern";
          else if (usrMsg.includes("minimal")) fields["design_style"] = "Minimalist";
          else if (usrMsg.includes("classic") || usrMsg.includes("traditional")) fields["design_style"] = "Classic";
          else if (!isEmail(usrRaw) && !isPhone(usrRaw) && usrMsg.split(/\s+/).length <= 5) {
            fields["design_style"] = usrRaw;
          }
        } else if (astMsg.includes("type of property")) {
          if (usrMsg.includes("apartment") || usrMsg.includes("flat")) {
            fields["property_type"] = "Apartment";
            fields["project_type"] = "Apartment Interiors";
          } else if (usrMsg.includes("villa") || usrMsg.includes("house") || usrMsg.includes("home")) {
            fields["property_type"] = "Villa";
            fields["project_type"] = "Full Home Interiors";
          } else if (usrMsg.includes("office") || usrMsg.includes("commercial")) {
            fields["property_type"] = "Office";
            fields["project_type"] = "Commercial Interiors";
          } else if (usrMsg.includes("kitchen")) {
            fields["property_type"] = "Kitchen";
            fields["project_type"] = "Modular Kitchens";
          } else if (!isRefusal && !isEmail(usrRaw) && !isPhone(usrRaw) && usrMsg.split(/\s+/).length <= 4) {
            fields["property_type"] = usrRaw;
          }
        } else if (astMsg.includes("located") || astMsg.includes("location") || astMsg.includes("where is your property")) {
          if (isRefusal) fields["location"] = "Not Shared";
          else if (!isEmail(usrRaw) && !isPhone(usrRaw) && usrMsg.split(/\s+/).length <= 4) {
            fields["location"] = usrRaw.replace(/^(i am in|i live in|located in|in|at)\s+/i, '').trim();
          }
        } else if (astMsg.includes("name, please") || astMsg.includes("know your name") || astMsg.includes("may i know your name")) {
          if (isRefusal) fields["name"] = "Valued Customer";
          else if (!isEmail(usrRaw) && !isPhone(usrRaw) && usrMsg.split(/\s+/).length <= 4) {
            fields["name"] = usrRaw.replace(/^(my name is|i am|this is|i'm)\s+/i, '').trim();
          }
        }
      }
    }
  }

  // Check if image/pricing prefix was ALREADY shown in history
  const fullHistoryText = messages.map(m => m.content).join(" ").toLowerCase();
  const alreadyShowedImage = fullHistoryText.includes("![nirabi");
  const alreadyShowedPricing = fullHistoryText.includes("3 primary interior packages");

  let servicePrefix = "";
  if (!alreadyShowedImage) {
    if (lastMsgLower.includes("villa")) {
      fields["property_type"] = "Villa";
      fields["project_type"] = "Full Home Interiors";
      servicePrefix = "For villas, NIRABI DESIGN STUDIO specializes in premium **Full Home Turnkey Interiors**, handling architectural layouts, custom woodwork, and ambient lighting.\n\nHere is one of our living spaces:\n![NIRABI Villa Project](/images/services/villa.jpeg)\n\n";
    } else if (lastMsgLower.includes("apartment") || lastMsgLower.includes("flat")) {
      fields["property_type"] = "Apartment";
      fields["project_type"] = "Apartment Interiors";
      servicePrefix = "For apartments, we design **space-maximizing modular cabinetry** and bespoke wall finishes.\n\nHere is an apartment project by NIRABI:\n![NIRABI Apartment Project](/images/services/apartment.jpeg)\n\n";
    } else if (lastMsgLower.includes("kitchen")) {
      fields["property_type"] = "Kitchen";
      fields["project_type"] = "Modular Kitchens";
      servicePrefix = "Our **Modular Kitchens** feature premium acrylic finishes, quartz stone surfaces, and German soft-close hardware.\n\nCheck out this kitchen design:\n![NIRABI Modular Kitchen](/images/services/kitchen.jpeg)\n\n";
    } else if (lastMsgLower.includes("office") || lastMsgLower.includes("commercial") || lastMsgLower.includes("corporate")) {
      fields["property_type"] = "Office";
      fields["project_type"] = "Commercial Interiors";
      servicePrefix = "For commercial projects, NIRABI delivers end-to-end **Office Fitouts** engineered for ergonomic focus.\n\nHere is an executive reception:\n![NIRABI Office Project](/images/services/office.jpg)\n\n";
    }
  }

  let pricingPrefix = "";
  const isAskingPrice = ["cost", "price", "pricing", "package", "packages", "rate", "rates", "how much"].some(w => lastMsgLower.includes(w));
  if (!alreadyShowedPricing && isAskingPrice && !lastAssistantMsg.includes("approximate budget")) {
    pricingPrefix = "At NIRABI DESIGN STUDIO, we provide 3 primary interior packages tailored to your vision:\n- **Standard** (₹1,000–₹1,500/sq.ft): Smart, high-quality finishes & modular cabinetry.\n- **Premium** (₹1,800–₹2,500/sq.ft): Custom woodwork, designer styling & false ceiling accents.\n- **Luxury** (₹3,500+/sq.ft): Elite Italian marble, bespoke architectural furniture & home automation.\n\n";
  }

  // Global fallback extraction on last user message
  const lastEmMatch = lastUserMsg.match(/[\w\.-]+@[\w\.-]+\.\w+/);
  if (lastEmMatch) fields.email = lastEmMatch[0];

  const lastPhMatch = lastUserMsg.match(/\b[6-9]\d{9}\b/);
  if (lastPhMatch) fields.phone = lastPhMatch[0];

  if (!fields.name && !lastAssistantMsg.includes("name")) {
    const nameMatch = lastUserMsg.match(/^(my name is|i am|this is|i'm)\s+([a-zA-Z\s]{2,20})/i);
    if (nameMatch && !isEmail(nameMatch[2]) && !isPhone(nameMatch[2])) {
      fields.name = nameMatch[2].trim();
    }
  }

  // Determine remaining required information in natural sequence
  const missing = ["name", "location", "property_type", "design_style", "budget", "email", "phone"].filter(f => !fields[f]);
  let isComplete = false;
  let reply = "";

  if (missing.length === 0) {
    reply = "Thank you! I have gathered all your project details. A senior architect from NIRABI DESIGN STUDIO will reach out to you shortly with tailored design concepts.";
    isComplete = true;
  } else {
    const nextF = missing[0];
    if (nextF === "name") {
      reply = "Got it. May I know your name, please?";
    } else if (nextF === "location") {
      reply = "Where is your property located? (e.g., Chennai, Madipakkam, Tambaram, etc.)";
    } else if (nextF === "property_type") {
      reply = "What type of property is this? (e.g., Villa, Apartment, Office, Kitchen)";
    } else if (nextF === "design_style") {
      reply = "What design style do you prefer? (e.g., Modern, Contemporary, Minimalist, Luxury)";
    } else if (nextF === "budget") {
      reply = "What is your approximate budget for this project?";
    } else if (nextF === "email") {
      reply = (lastAssistantMsg && lastAssistantMsg.includes("email address") && !fields.email)
        ? "It seems that's not a valid email address. Could you please share a valid email address?"
        : "Perfect. Could you please share your email address so we can send design proposals?";
    } else if (nextF === "phone") {
      reply = (lastAssistantMsg && lastAssistantMsg.includes("phone number") && !fields.phone)
        ? "It seems that's not a valid 10-digit phone number. Please share a valid phone number."
        : "Lastly, what is the best phone number to reach you?";
    } else {
      reply = "Could you tell me a little more about your space?";
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
