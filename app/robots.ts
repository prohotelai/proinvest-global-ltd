import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/ppn/', '/api/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'PerplexityBot'],
        allow: '/',
        disallow: ['/ppn/', '/api/'],
      },
    ],
    sitemap: 'https://proinvest.global/sitemap.xml',
  };
}
