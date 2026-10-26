const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { query, TABLE_PREFIX } = require('./mysql');

const PROJECTS = [
  {
    slug: "modern-villa-chennai",
    title: "Modern Villa",
    location: "Chennai",
    category: "Villa",
    size_sqft: "1,850",
    year: "2026",
    hero_image: "/images/projects/modern-villa/hero.jpg",
    gallery: JSON.stringify([
      "/images/projects/modern-villa/living.jpg",
      "/images/projects/modern-villa/kitchen.jpg",
      "/images/projects/modern-villa/bedroom.jpg",
      "/images/projects/modern-villa/details.jpg",
    ]),
    concept: "A warm, material-led villa design built around natural light and quiet, considered spaces.",
    materials: "American oak, honed marble, brushed brass, linen upholstery.",
    design_approach: "Open-plan living anchored by a sculptural staircase, with zoned privacy for bedrooms.",
    challenges: "Integrating a double-height living space without losing the home's warmth.",
    result: "A calm, editorial family home that photographs like a magazine feature and lives like a home.",
  },
  {
    slug: "contemporary-apartment-3bhk",
    title: "3BHK Apartment Transformation",
    location: "Chennai",
    category: "Apartment",
    size_sqft: "1,400",
    year: "2026",
    hero_image: "/images/projects/apartment/hero.jpg",
    gallery: JSON.stringify([
      "/images/projects/apartment/living.jpg",
      "/images/projects/apartment/dining.jpg",
      "/images/projects/apartment/bedroom.jpg",
    ]),
    concept: "From an empty shell to a warm contemporary home for a young family.",
    materials: "Veneer, terrazzo, linen, matte-black hardware.",
    design_approach: "Zoned living and dining with custom modular furniture for a compact footprint.",
    challenges: "Maximizing storage without visual clutter in a mid-size apartment.",
    result: "A functional, light-filled apartment that never feels tight.",
  },
  {
    slug: "boutique-office-fitout",
    title: "Boutique Office Fit-Out",
    location: "Chennai",
    category: "Commercial",
    size_sqft: "3,200",
    year: "2025",
    hero_image: "/images/projects/office/hero.jpg",
    gallery: JSON.stringify([
      "/images/projects/office/lounge.jpg",
      "/images/projects/office/meeting.jpg",
    ]),
    concept: "A workspace designed to feel more like a considered residence than a corporate office.",
    materials: "Ash plywood, wool carpet, powder-coated steel.",
    design_approach: "Layered zones for focus work, collaboration, and informal meetings.",
    challenges: "Acoustic control in an open, exposed-ceiling shell.",
    result: "A workspace teams choose to come into.",
  },
  {
    slug: "minimalist-residential-home",
    title: "Minimalist Residence",
    location: "Chennai",
    category: "Residential",
    size_sqft: "2,200",
    year: "2026",
    hero_image: "/images/projects/residential/hero.jpg",
    gallery: JSON.stringify([
      "/images/projects/residential/hero.jpg",
    ]),
    concept: "An exercise in quiet luxury and structural alignment.",
    materials: "Travertine, raw concrete, oiled teak.",
    design_approach: "Strict linear flow opening out to a private courtyard.",
    challenges: "Achieving seamless flush junctions across multiple stone surfaces.",
    result: "A sanctuary of scale and silence.",
  },
  {
    slug: "sleek-modular-kitchen",
    title: "Sleek Modular Kitchen",
    location: "Chennai",
    category: "Kitchen",
    size_sqft: "380",
    year: "2026",
    hero_image: "/images/projects/kitchen/hero.jpg",
    gallery: JSON.stringify([
      "/images/projects/kitchen/hero.jpg",
    ]),
    concept: "A precise, line-led professional grade kitchen for modern cooking.",
    materials: "Fenix NTM, stainless steel, smoked glass.",
    design_approach: "Disappearing pocket door systems to conceal main work areas.",
    challenges: "Integrating dual-induction hobs within a custom cantilevered island.",
    result: "A kitchen that functions like a laboratory and feels like a gallery.",
  },
  {
    slug: "custom-wood-furniture",
    title: "Bespoke Walnut Credenza",
    location: "Chennai",
    category: "Furniture",
    size_sqft: "12",
    year: "2025",
    hero_image: "/images/projects/furniture/hero.jpg",
    gallery: JSON.stringify([
      "/images/projects/furniture/hero.jpg",
    ]),
    concept: "A custom storage piece matching the geometry of the living space.",
    materials: "Solid American walnut, black steel frame.",
    design_approach: "Floating credenza mount with integrated media cooling ventilation.",
    challenges: "Ensuring zero deflection across a wide unsupported solid span.",
    result: "A tailored piece that grounds the entertainment wall.",
  },
];

const SERVICES = [
  { slug: "residential-interiors", title: "Residential Interiors", order_index: 1, image: "/images/services/residential.jpeg", description: "Full-home interiors shaped around how you actually live, not a showroom template." },
  { slug: "villa-interiors", title: "Villa Interiors", order_index: 2, image: "/images/services/villa.jpeg", description: "Large-format spatial design for independent homes, indoors and out." },
  { slug: "apartment-interiors", title: "Apartment Interiors", order_index: 3, image: "/images/services/apartment.jpeg", description: "Space-efficient, editorial apartment design that never feels compromised." },
  { slug: "modular-kitchens", title: "Modular Kitchens", order_index: 4, image: "/images/services/kitchen.jpeg", description: "Custom kitchen systems engineered for daily use and built to last." },
  { slug: "custom-furniture", title: "Custom Furniture", order_index: 5, image: "/images/services/furniture.jpeg", description: "Bespoke furniture pieces designed and built specifically for your space." },
  { slug: "commercial-interiors", title: "Commercial Interiors", order_index: 6, image: "/images/services/commercial.jpeg", description: "Interiors for retail and hospitality spaces that hold a brand's attention." },
  { slug: "office-interiors", title: "Office Interiors", order_index: 7, image: "/images/services/office.jpg", description: "Workspaces designed for focus, culture, and everyday comfort." },
  { slug: "turnkey-solutions", title: "Turnkey Interior Solutions", order_index: 8, image: "/images/services/turnkey.jpeg", description: "End-to-end execution from concept to handover, managed by one team." },
];

async function seedData() {
  const usersTable = `${TABLE_PREFIX}users`;
  const projTable = `${TABLE_PREFIX}projects`;
  const servTable = `${TABLE_PREFIX}services`;

  // Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@nirabi.studio';
  const adminPassword = process.env.ADMIN_PASSWORD || 'adminpassword123';
  const existingUsers = await query(`SELECT * FROM ${usersTable} WHERE email = ?`, [adminEmail]);

  if (!existingUsers || existingUsers.length === 0) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const userId = uuidv4();
    await query(
      `INSERT INTO ${usersTable} (id, name, email, hashed_password, role) VALUES (?, ?, ?, ?, ?)`,
      [userId, 'NIRABI Admin', adminEmail, hashedPassword, 'admin']
    );
    console.log(`[Seed] Created default NIRABI admin user: ${adminEmail}`);
  } else {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await query(`UPDATE ${usersTable} SET hashed_password = ? WHERE email = ?`, [hashedPassword, adminEmail]);
    console.log(`[Seed] Verified NIRABI admin user credentials for: ${adminEmail}`);
  }

  // Seed Projects
  for (const p of PROJECTS) {
    const existing = await query(`SELECT * FROM ${projTable} WHERE slug = ?`, [p.slug]);
    if (!existing || existing.length === 0) {
      await query(
        `INSERT INTO ${projTable} (id, slug, title, location, category, size_sqft, year, hero_image, gallery, concept, materials, design_approach, challenges, result) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [uuidv4(), p.slug, p.title, p.location, p.category, p.size_sqft, p.year, p.hero_image, p.gallery, p.concept, p.materials, p.design_approach, p.challenges, p.result]
      );
    }
  }

  // Seed Services
  for (const s of SERVICES) {
    const existing = await query(`SELECT * FROM ${servTable} WHERE slug = ?`, [s.slug]);
    if (!existing || existing.length === 0) {
      await query(
        `INSERT INTO ${servTable} (id, slug, title, description, image, order_index) VALUES (?, ?, ?, ?, ?, ?)`,
        [uuidv4(), s.slug, s.title, s.description, s.image, s.order_index]
      );
    }
  }

  console.log('[Seed] NIRABI database initialization and seeding complete.');
}

module.exports = { seedData };
