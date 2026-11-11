import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://flexathonrun.org';
  const lastModified = new Date();

  return [
    { url: `${baseUrl}/`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/editions`, lastModified, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/hydoct18`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/hydoct18/the-run`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/hydoct18/prize-details`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/hydoct18/global-goal`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/hydoct18/social-card`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/hydoct18/runner-stories`, lastModified, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/hydoct18/faqs`, lastModified, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/hydoct18/gallery`, lastModified, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/hydoct18/results`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/kochi2027`, lastModified, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/global-goals`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/impact`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/gallery`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/partners`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/get-involved`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, lastModified, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/terms-of-use`, lastModified, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/refund-policy`, lastModified, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/participant-waiver`, lastModified, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/safeguarding-policy`, lastModified, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/accessibility-statement`, lastModified, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/disclaimer`, lastModified, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/brand-sdg-disclaimer`, lastModified, changeFrequency: 'yearly', priority: 0.4 },
  ];
}
