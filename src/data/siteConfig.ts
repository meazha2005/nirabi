export const siteConfig = {
  name: "NIRABI DESIGN STUDIO",
  studioType: "Interior Design & Turnkey Solutions",
  tagline: "Modern, Beautiful & Comfortable Homes",
  supportingTagline: "Complete interior design and execution with quality materials and honest pricing.",
  heroSupportingText:
    "From stylish apartments to luxury independent villas in Chennai, NIRABI DESIGN STUDIO designs and builds homes you will love living in—on time and within budget.",
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  primaryCta: "Get Free Quote",
  secondaryCta: "Our Services",
  contact: {
    phone: "9543117399",
    phoneDisplay: "+91 95431 17399",
    whatsapp: "919543117399",
    email: "nirabiinteriordesign@gmail.com",
    address: "1/37, Bharathiyar St, Moovarasanpet, Bharathiyar Nagar, Madipakkam, Chennai, Tambaram, Tamil Nadu 600091",
    shortAddress: "Madipakkam, Chennai, Tamil Nadu 600091",
    hours: "Monday – Saturday: 9:30 AM – 7:30 PM (Sunday by appointment)",
    instagram: "https://www.instagram.com/nirabidesignstudio/",
    facebook: "https://www.facebook.com/nirabidesignstudio/",
    linkedin: "https://linkedin.com",
  },
  apiBaseUrl: typeof window !== "undefined" ? "" : (process.env.NEXT_PUBLIC_API_BASE_URL || ""),
};
