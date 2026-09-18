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
    streetAddress: '2 Frederick Street',
    addressLocality: 'London',
    addressRegion: 'England',
    postalCode: 'WC1X 0ND',
    addressCountry: 'GB'
  },
  description: 'UK technology and investment company building applied AI products for real operational workflows. Its product portfolio includes ProHotelAI for hotels and resorts, ProCafeAI for cafés and restaurants, and VisaRiskAI for visa risk and application-readiness analysis.',
  industry: ['Artificial Intelligence', 'SaaS', 'Hospitality Technology', 'Hotel Technology', 'Restaurant Technology', 'Travel Technology'],
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
          url: 'https://prohotelai.com',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Cloud'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: 'ProCafeAI',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Cloud',
          url: 'https://www.procafeai.com'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: 'VisaRiskAI',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Cloud',
          url: 'https://www.visariskai.com'
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
    description: 'AI-native hotel operations platform built around a governed Hotel Digital Brain, connecting guest concierge, hotel knowledge, operational workflows, service fulfilment, commerce, reporting and hotel data.',
    provider: {
      '@type': 'Organization',
      '@id': `${COMPANY_INFO.url}#organization`,
      name: COMPANY_INFO.legalName
    },
    featureList: [
      'Governed Hotel Digital Brain',
      'Public and Verified Guest Concierge',
      'Hotel Knowledge Governance',
      'Guest Service Request Workflows',
      'Operational Fulfilment',
      'Hotel Commerce',
      'AI Reports and Operational Intelligence',
      'PMS and Hotel Data Integration',
      'Partner Ecosystem Integration'
    ],
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Hotels, Resorts, Hotel Groups and Hospitality Operators'
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
 * Generate VisaRiskAI Product Schema
 */
export function generateVisaRiskAISchema(): WithContext<SoftwareApplication> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${COMPANY_INFO.url}/solutions/visariskai#product`,
    name: 'VisaRiskAI',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Visa & Immigration Risk Analysis Software',
    operatingSystem: 'Cloud',
    description: 'AI-powered visa approval risk analysis platform. Helps applicants and advisors evaluate visa case strength, detect risk factors, and improve submission readiness before applying.',
    url: 'https://www.visariskai.com/',
    provider: {
      '@type': 'Organization',
      '@id': `${COMPANY_INFO.url}#organization`,
      name: COMPANY_INFO.legalName
    },
    featureList: [
      'Visa Case Risk Assessment',
      'File Readiness Analysis',
      'Risk Factor Detection',
      'Decision Confidence Scoring',
      'Case Preparation Guidance',
      'Multi-jurisdiction Support',
      'Real-time Case Review',
      'Immigration Advisor Dashboard'
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'Visa Applicants, Immigration Advisors, Immigration Consultants, Travel Agencies, Visa Service Businesses'
    },
    keywords: 'visa risk analysis, visa approval prediction, immigration AI, visa case assessment, visa file readiness, AI visa tool'
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
