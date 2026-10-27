export type Testimonial = {
  id: string;
  quote: string;
  client: string;
  title: string;
  location: string;
  year: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "NIRABI DESIGN STUDIO completely transformed our villa on ECR. The quality of woodwork, lighting, and finish was fantastic. Best of all, they completed everything on time without any headache for us.",
    client: "Dr. K. Sivaraman",
    title: "Villa Owner",
    location: "ECR, Chennai",
    year: "2026",
  },
  {
    id: "t2",
    quote: "The team gave our duplex apartment a modern, open feel with lots of clever hidden storage. Their carpenters and project managers were polite, professional, and attentive to every single detail.",
    client: "Anita & Rajesh Chandran",
    title: "Apartment Owners",
    location: "R.A. Puram, Chennai",
    year: "2026",
  },
  {
    id: "t3",
    quote: "We hired NIRABI for our 8,400 sq.ft office space in OMR. They finished the entire interior work two weeks ahead of schedule and within our agreed budget. Our team loves the new workspace.",
    client: "M. Venkatesh",
    title: "Director, Apex FinTech",
    location: "OMR, Chennai",
    year: "2026",
  },
  {
    id: "t4",
    quote: "We wanted to renovate our family house in Poes Garden while keeping its warm traditional charm. NIRABI used beautiful teakwood and modern lighting to make our home look fresh and elegant.",
    client: "S. Meenakshi Sundaram",
    title: "Homeowner",
    location: "Poes Garden, Chennai",
    year: "2025",
  },
];
