export type Project = {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: "Residential" | "Villa" | "Apartment" | "Commercial" | "Kitchen" | "Bespoke Millwork";
  sizeSqft: string;
  year: string;
  heroImage: string;
  gallery: string[];
  concept: string;
  materials: string;
  designApproach: string;
  challenges: string;
  result: string;
  beforeImage?: string;
  afterImage?: string;
};

export const projectCategories = [
  "All",
  "Villa",
  "Residential",
  "Apartment",
  "Commercial",
  "Kitchen",
] as const;

export const projects: Project[] = [
  {
    id: "neelankarai-coastal-residence",
    slug: "neelankarai-coastal-residence",
    title: "Coastal Villa Residence",
    location: "East Coast Road (ECR), Chennai",
    category: "Villa",
    sizeSqft: "6,200",
    year: "2026",
    heroImage: "/generated/hero_villa.jpg",
    gallery: [
      "/generated/hero_villa.jpg",
      "/generated/project_bedroom.jpg",
      "/generated/project_dining.jpg",
      "/generated/service_furniture.jpg",
    ],
    concept: "A spacious 4-bedroom villa designed for relaxed family living, with large open spaces, cross-ventilation, and plenty of natural sunlight.",
    materials: "Italian marble, natural teakwood, warm brass fittings, and linen fabrics.",
    designApproach: "We created an open living room that connects smoothly to the outdoor garden, giving the family a calm and refreshing home.",
    challenges: "Protecting outdoor fittings and hardware against coastal humidity and salt air by using high-grade stainless steel and marine coatings.",
    result: "A bright, peaceful home with open spaces, cool sea breezes, and durable finishes that are easy to maintain.",
    beforeImage: "/generated/renovation_before.jpg",
    afterImage: "/generated/renovation_after.jpg",
  },
  {
    id: "boat-club-penthouse",
    slug: "boat-club-penthouse",
    title: "Modern Duplex Apartment",
    location: "R.A. Puram, Chennai",
    category: "Apartment",
    sizeSqft: "4,100",
    year: "2026",
    heroImage: "/generated/service_apartment.jpg",
    gallery: [
      "/generated/service_apartment.jpg",
      "/generated/project_dining.jpg",
      "/generated/project_bedroom.jpg",
      "/generated/renovation_after.jpg",
    ],
    concept: "A modern 3BHK duplex apartment featuring smart space-saving storage, a floating staircase, and clean open living spaces.",
    materials: "Polished marble flooring, rich walnut veneer, fluted glass partitions, and warm LED cove lighting.",
    designApproach: "We removed unnecessary partition walls to make the living and dining areas feel much bigger, brighter, and more connected.",
    challenges: "Fitting central air conditioning and false ceiling lights without reducing the room height.",
    result: "A spacious, clutter-free apartment with smart hidden storage and warm, inviting spaces for daily family life.",
  },
  {
    id: "poes-garden-residence",
    slug: "poes-garden-residence",
    title: "Luxury Family Residence",
    location: "Poes Garden, Chennai",
    category: "Residential",
    sizeSqft: "5,500",
    year: "2025",
    heroImage: "/generated/style_traditional.jpg",
    gallery: [
      "/generated/style_traditional.jpg",
      "/generated/service_furniture.jpg",
      "/generated/material_wood.jpg",
      "/generated/material_fabric.jpg",
    ],
    concept: "A warm and elegant family house that blends classic South Indian warmth with clean modern interiors.",
    materials: "Hand-polished teakwood, natural Kadappa stone, textured walls, and brass accents.",
    designApproach: "We planned a central courtyard and pooja room around which the living and family dining spaces naturally flow.",
    challenges: "Blending the family's antique wooden furniture with modern modular cabinetry and sleek lighting.",
    result: "A timeless, comfortable home that honors traditional craftsmanship while offering all modern conveniences.",
  },
  {
    id: "omr-executive-innovation-atelier",
    slug: "omr-executive-innovation-atelier",
    title: "IT Office Workspace",
    location: "OMR IT Corridor, Chennai",
    category: "Commercial",
    sizeSqft: "8,400",
    year: "2026",
    heroImage: "/generated/service_office.jpg",
    gallery: [
      "/generated/service_office.jpg",
      "/generated/project_lounge.jpg",
      "/generated/project_meeting.jpg",
    ],
    concept: "A modern, open-plan office built with ergonomic workstations, collaborative meeting zones, and quiet focus cabins.",
    materials: "Sound-absorbing acoustic panels, matte black frames, warm wooden desks, and indoor plants.",
    designApproach: "We separated noisy break areas from quiet working zones while making sure natural daylight reaches every desk.",
    challenges: "Completing 8,400 sq.ft of turnkey interior work within a strict 12-week commercial deadline.",
    result: "A productive, bright office environment that team members love working in every day.",
  },
  {
    id: "anna-nagar-culinary-suite",
    slug: "anna-nagar-culinary-suite",
    title: "Modern Modular Kitchen",
    location: "Anna Nagar West, Chennai",
    category: "Kitchen",
    sizeSqft: "2,900",
    year: "2025",
    heroImage: "/generated/service_kitchen.jpg",
    gallery: [
      "/generated/service_kitchen.jpg",
      "/generated/project_dining.jpg",
      "/generated/material_marble.jpg",
    ],
    concept: "A clean, functional kitchen designed with plenty of counter space, smart pull-out organizers, and powerful ventilation.",
    materials: "Scratch-resistant quartz stone, waterproof marine ply, acrylic cabinet shutters, and soft-close German drawers.",
    designApproach: "We arranged the sink, hob, and refrigerator in an easy-to-use triangle for smooth everyday cooking.",
    challenges: "Hiding all chimney pipes and gas lines neatly inside the false ceiling without losing cabinet storage.",
    result: "A spotless, easy-to-clean modular kitchen that makes daily cooking easy, fast, and enjoyable.",
  },
  {
    id: "khader-nawaz-khan-atelier",
    slug: "khader-nawaz-khan-atelier",
    title: "Designer Fashion Boutique",
    location: "Khader Nawaz Khan Rd, Nungambakkam",
    category: "Commercial",
    sizeSqft: "3,200",
    year: "2025",
    heroImage: "/generated/service_retail.jpg",
    gallery: [
      "/generated/service_retail.jpg",
      "/generated/project_lounge.jpg",
      "/generated/material_stone.jpg",
    ],
    concept: "A chic, brightly lit retail boutique with custom garment display racks, spacious trial rooms, and warm welcome lounge.",
    materials: "Brushed gold display racks, polished flooring, warm spotlights, and full-height mirrors.",
    designApproach: "We focused on warm flattering lighting and wide walkways so customers can browse comfortably.",
    challenges: "Installing customized gold hanging fixtures quickly to meet the store's grand opening date.",
    result: "An inviting, premium shopping space that draws in walk-in customers and highlights the collection beautifully.",
  },
];
