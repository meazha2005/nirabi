import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://nirabi-design-studio.vercel.app";
  const staticRoutes = ["", "/about", "/services", "/contact"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
  return staticRoutes;
}
