/**
 * Structured Data Generator for PROINVEST GLOBAL LTD
 * Generates Schema.org JSON-LD markup for AI systems, search engines, and LLMs
 */

import { Organization, WithContext, SoftwareApplication, Product, Corporation, FAQPage, BreadcrumbList } from 'schema-dts';

// Company entity information
export const COMPANY_INFO = {
  legalName: 'PROINVEST GLOBAL LTD',
  brandName: 'Proinvest Global',
  companyNumber: '16851428',
  country: 'United Kingdom',
  foundingDate: '2025',
  url: 'https://proinvest.global',
  email: 'info@proinvest.global',
  address: {
    streetAddress: '',
    addressLocality: 'London',
    addressRegion: 'England',
    postalCode: '',
    addressCountry: 'GB'
  },
  description: 'Applied AI platforms that run real hospitality and F&B operations — not experiments. UK-based technology company specializing in operational artificial intelligence for hotels, cafés, and restaurants.',
  industry: ['Hospitality Technology', 'Artificial Intelligence', 'SaaS', 'Hotel Technology', 'Restaurant Technology'],
  keywords: [
    'AI hospitality operations',
    'AI hotel management system',
    'AI guest assistant',
    'AI restaurant ordering system',
    'Applied AI SaaS',
    'Hospitality automation software',
    'Restaurant AI platform',
    'Hotel AI operations'
  ]
};

/**
 * Generate Organization structured data (root entity)
 */
export function generateOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${COMPANY_INFO.url}#organization`,
    name: COMPANY_INFO.legalName,
    legalName: COMPANY_INFO.legalName,
    alternateName: COMPANY_INFO.brandName,
    description: COMPANY_INFO.description,
    url: COMPANY_INFO.url,
    foundingDate: COMPANY_INFO.foundingDate,
    foundingLocation: {
      '@type': 'Country',
      name: COMPANY_INFO.country
    },
    // UK Company Registration
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'UK Company Number',
      value: COMPANY_INFO.companyNumber
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY_INFO.address.streetAddress,
      addressLocality: COMPANY_INFO.address.addressLocality,
      addressRegion: COMPANY_INFO.address.addressRegion,
      postalCode: COMPANY_INFO.address.postalCode,
      addressCountry: COMPANY_INFO.address.addressCountry
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: COMPANY_INFO.email,
      contactType: 'Customer Service',
      availableLanguage: ['en', 'ar']
    },
    // Industries served
    knowsAbout: COMPANY_INFO.industry,
    // Products/Brands
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: 'ProHotelAI',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Cloud',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          }
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: 'ProCafeAI',
          alternateName: 'CafeGrok AI',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Cloud',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          }
        }
      }
    ],
    // Future social profiles (placeholders ready for AI systems)
    sameAs: [
      // LinkedIn, Twitter, etc. to be added
    ]
  };
}

/**
 * Generate ProHotelAI Product Schema
 */
export function generateProHotelAISchema(): WithContext<SoftwareApplication> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${COMPANY_INFO.url}/solutions/prohotelai#product`,
    name: 'ProHotelAI',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Hotel Management Software',
    operatingSystem: 'Cloud',
    description: 'AI-powered hotel operations platform for 4 & 5 star hotels. Automates guest interactions, front desk operations, service requests, and operational analytics. Features 24/7 AI guest assistant, automated check-in/check-out, and real-time operational intelligence.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    provider: {
      '@type': 'Organization',
      '@id': `${COMPANY_INFO.url}#organization`,
      name: COMPANY_INFO.legalName
    },
    featureList: [
      '24/7 AI Guest Assistant',
      'Automated Check-in/Check-out',
      'Guest Service Request Automation',
      'Front Desk Automation',
      'Housekeeping Coordination',
      'Multilingual Guest Support',
      'Real-time Operational Analytics',
      'Revenue Optimization',
      'Guest Sentiment Analysis'
    ],
    audience: {
      '@type': 'BusinessAudience',
      audienceType: '4-Star Hotels, 5-Star Hotels, Hotel Chains, Resorts'
    },
    keywords: 'AI hotel management, hotel automation, AI guest assistant, hotel operations platform, hospitality AI, hotel technology'
  };
}

/**
 * Generate ProCafeAI Product Schema
 */
export function generateProCafeAISchema(): WithContext<SoftwareApplication> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${COMPANY_INFO.url}/solutions/procafeai#product`,
    name: 'ProCafeAI',
    alternateName: 'CafeGrok AI',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Restaurant Management Software',
    operatingSystem: 'Cloud',
    description: 'AI-powered operations platform for cafés and restaurants. Automates customer ordering via QR codes, kitchen operations, inventory management, and customer service. Features AI-driven menu recommendations, automated order processing, and real-time operational analytics.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    provider: {
      '@type': 'Organization',
      '@id': `${COMPANY_INFO.url}#organization`,
      name: COMPANY_INFO.legalName
    },
    featureList: [
      'QR Code Ordering System',
      'AI Menu Recommendations',
      'Automated Order Processing',
      'Kitchen Display System Integration',
      'Inventory Management',
      'Customer Service Automation',
      'Multilingual Menu Support',
      'Real-time Sales Analytics',
      'Customer Behavior Analytics'
    ],
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Cafés, Restaurants, Quick Service Restaurants, Coffee Shops, Food Service Operators'
    },
    keywords: 'AI restaurant ordering, café automation, QR ordering system, restaurant AI platform, F&B technology, restaurant operations software'
  };
}

/**
 * Generate FAQ Schema for a page
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Generate BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/**
 * Helper function to inject JSON-LD script
 */
export function injectStructuredData(data: any): string {
  return JSON.stringify(data, null, 0);
}
