import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://proinvest-global.com';
  const lastModified = new Date();
  
  // Main pages (English - default)
  const mainPages = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 1,
      alternates: {
        languages: {
          en: baseUrl,
          ar: `${baseUrl}/ar`,
        }
      }
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/about`,
          ar: `${baseUrl}/ar/about`,
        }
      }
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/solutions`,
          ar: `${baseUrl}/ar/solutions`,
        }
      }
    },
    {
      url: `${baseUrl}/solutions/prohotelai`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/solutions/prohotelai`,
          ar: `${baseUrl}/ar/solutions/prohotelai`,
        }
      }
    },
    {
      url: `${baseUrl}/solutions/procafeai`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/solutions/procafeai`,
          ar: `${baseUrl}/ar/solutions/procafeai`,
        }
      }
    },
    {
      url: `${baseUrl}/industries`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/industries`,
          ar: `${baseUrl}/ar/industries`,
        }
      }
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/case-studies`,
          ar: `${baseUrl}/ar/case-studies`,
        }
      }
    },
    {
      url: `${baseUrl}/insights`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/insights`,
          ar: `${baseUrl}/ar/insights`,
        }
      }
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/contact`,
          ar: `${baseUrl}/ar/contact`,
        }
      }
    },
  ];
  
  return mainPages;
}
