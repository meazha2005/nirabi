export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  projectType: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "NIRABI transformed our house into an architectural sanctuary that genuinely feels like us.",
    name: "Residential Client",
    projectType: "Villa Interior, Chennai",
  },
  {
    id: "t2",
    quote: "Every material choice had a distinct purpose and beauty. Nothing felt decorative for its own sake.",
    name: "Residential Client",
    projectType: "3BHK Apartment, Chennai",
  },
  {
    id: "t3",
    quote: "NIRABI DESIGN STUDIO understood our brand ethos before drawing a single wall. Outstanding execution.",
    name: "Commercial Client",
    projectType: "Office Fit-Out, Chennai",
  },
];
