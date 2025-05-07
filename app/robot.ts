import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.salon-link.fr/";
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/piercing",
        "/prothese",
        "/salon",
        "/tatouage",
        "/tatouage/autres",
        "/tatouage/gael",
        "/tatouage/chloe",
        "/tatouage/axelle",
      ],
      disallow:["/admin/","/dashboard"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
