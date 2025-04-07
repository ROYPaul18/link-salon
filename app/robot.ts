import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://beaudy-ink.com";
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
      disallow: "/dashbpard/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
