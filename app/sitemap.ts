import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.salon-link.fr";
  
  // Date de dernière modification (aujourd'hui)
  const lastModified = new Date().toISOString().split('T')[0];
  
  // Pages du site
  const routes = [
    {
      url: `${baseUrl}/`,
      lastModified,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/piercing`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/prothese`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/salon`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tatouage`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tatouage/autres`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tatouage/gael`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tatouage/chloe`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tatouage/axelle`,
      lastModified,
      priority: 0.8,
    },
  ];

  return routes;
}