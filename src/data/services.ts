export type Service = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  deliverables: string[];
  timeline: string;
  scope: string;
};

export const services: Service[] = [
  {
    id: "villa-architecture",
    slug: "villa-architecture",
    title: "Independent Villa Interiors",
    tagline: "Complete interior design and build for independent houses and villas.",
    description: "We design and build complete interiors for independent villas in Chennai. From spacious living rooms and stylish bedrooms to staircases and courtyards, we handle everything from design to final key handover.",
    image: "/generated/hero_villa.jpg",
    deliverables: ["3D Design & Realistic Walkthroughs", "Electrical & Plumbing Layouts", "Material Selection & Sourcing", "Complete On-Site Execution"],
    timeline: "16 – 24 Weeks",
    scope: "Full Turnkey Villa Interior",
  },
  {
    id: "luxury-residences",
    slug: "luxury-residences",
    title: "Apartment & Flat Interiors",
    tagline: "Smart, stylish, and comfortable interiors for modern apartments.",
    description: "Complete interior solutions for 2BHK, 3BHK, and duplex apartments. We maximize your space with smart storage, false ceilings, warm lighting, and durable finishes.",
    image: "/generated/service_apartment.jpg",
    deliverables: ["Floor Plans & 3D Views", "Custom Wardrobes & TV Units", "False Ceiling & Warm Lighting", "Full On-Site Installation"],
    timeline: "8 – 14 Weeks",
    scope: "Full Home Interior",
  },
  {
    id: "apartment-transformations",
    slug: "apartment-transformations",
    title: "Home Renovation & Remodeling",
    tagline: "Transform old rooms into fresh, modern, and open living spaces.",
    description: "Upgrade your existing home without the stress. We break down unwanted walls, replace old tiles, redo bathrooms, and install fresh modular woodwork to make your house look brand new.",
    image: "/generated/service_renovation.jpg",
    deliverables: ["Space Planning & Layout Changes", "Flooring & Tile Replacement", "Bathroom & Kitchen Remodel", "Complete Fresh Painting"],
    timeline: "6 – 12 Weeks",
    scope: "Complete Home Remodel",
  },
  {
    id: "bespoke-culinary-suites",
    slug: "bespoke-culinary-suites",
    title: "Modular Kitchens",
    tagline: "Durable, easy-to-clean kitchens built for everyday Indian cooking.",
    description: "Custom modular kitchens designed for everyday convenience. We use waterproof marine plywood, soft-close German fittings, quartz countertops, and high-suction chimneys.",
    image: "/generated/service_kitchen.jpg",
    deliverables: ["Modular Cabinet Design", "Quartz & Granite Countertops", "Soft-Close German Fittings", "Chimney & Hob Setup"],
    timeline: "4 – 6 Weeks",
    scope: "Design, Delivery & Installation",
  },
  {
    id: "corporate-workspaces",
    slug: "corporate-workspaces",
    title: "Office & Commercial Interiors",
    tagline: "Modern workspaces that inspire your team and impress clients.",
    description: "Complete interior fitouts for offices, IT workspaces, and commercial buildings. We build comfortable workstations, meeting rooms, reception areas, and private manager cabins.",
    image: "/generated/service_office.jpg",
    deliverables: ["Workstation & Cabin Layouts", "Conference Room Setup", "Electrical & Network Cabling", "Commercial Flooring & Ceilings"],
    timeline: "10 – 16 Weeks",
    scope: "Full Commercial Fitout",
  },
  {
    id: "boutique-commercial",
    slug: "boutique-commercial",
    title: "Retail Stores & Showrooms",
    tagline: "Inviting shop interiors designed to showcase your products.",
    description: "We design retail stores, boutiques, and showrooms with eye-catching display racks, bright spotlighting, checkout counters, and welcoming entryways.",
    image: "/generated/service_retail.jpg",
    deliverables: ["Store Layout & Customer Flow", "Display Racks & Cash Counters", "Spotlighting & Signage", "Turnkey Shop Setup"],
    timeline: "6 – 10 Weeks",
    scope: "Retail & Showroom Fitout",
  },
  {
    id: "custom-furniture-millwork",
    slug: "custom-furniture-millwork",
    title: "Custom Furniture & Carpentry",
    tagline: "Made-to-order furniture made to fit your exact room size.",
    description: "Custom sofas, dining tables, pooja units, study desks, and shoe racks made by skilled carpenters using quality wood, strong laminates, and reliable hardware.",
    image: "/generated/service_furniture.jpg",
    deliverables: ["Custom Size Measurements", "Quality Teak & Plywood", "Durable Polish & Laminates", "Delivered & Assembled at Home"],
    timeline: "3 – 6 Weeks",
    scope: "Custom Furniture Making",
  },
  {
    id: "turnkey-contracts",
    slug: "turnkey-contracts",
    title: "Complete Turnkey Solutions",
    tagline: "One trusted team for everything—from design to final key handover.",
    description: "No need to coordinate with multiple painters, carpenters, and electricians. We manage the entire project from start to finish with fixed pricing and guaranteed timelines.",
    image: "/generated/service_turnkey.jpg",
    deliverables: ["Single Point of Contact", "Regular Photo & Video Updates", "Fixed Price Guarantee", "10-Year Service Warranty"],
    timeline: "Based on Project Size",
    scope: "End-to-End Turnkey Delivery",
  },
];
