export const siteConfig = {
  name: "NIRABI DESIGN STUDIO",
  tagline: "Spaces that become stories.",
  supportingTagline: "Interior spaces, thoughtfully designed.",
  heroSupportingText:
    "Thoughtfully designed interiors shaped around the way you live.",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],
  primaryCta: "Start Your Project",
  contact: {
    phone: "9543117399",
    email: "nirabiinteriordesign@gmail.com",
    address: "1/37, Bharathiyar St, Moovarasanpet, Bharathiyar Nagar, Madipakkam, Chennai, Tambaram, Tamil Nadu 600091",
    instagram: "https://www.instagram.com/nirabidesignstudio/",
    facebook: "https://www.facebook.com/nirabidesignstudio/",
    linkedin: "https://linkedin.com",
  },
  apiBaseUrl: typeof window !== "undefined" ? "" : (process.env.NEXT_PUBLIC_API_BASE_URL || ""),
};
