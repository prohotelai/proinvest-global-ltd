/**
 * SEO Metadata Generator
 * Optimized for search engines, AI systems, and LLMs
 */

import { Metadata } from 'next';
import { Locale, getTranslation, languages } from './i18n';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  path: string;
  locale?: Locale;
  type?: 'website' | 'article';
  images?: Array<{ url: string; width: number; height: number; alt: string }>;
}

export const baseUrl = 'https://proinvest.global';
const companyName = 'PROINVEST GLOBAL LTD';

/**
 * Generate comprehensive metadata for AI-readable pages
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const locale = config.locale || 'en';
  const lang = languages[locale];
  
  const title = `${config.title} | ${companyName}`;
  const url = locale === 'en' 
    ? `${baseUrl}${config.path}`
    : `${baseUrl}/${locale}${config.path}`;

  return {
    title,
    description: config.description,
    keywords: config.keywords,
    authors: [{ name: companyName }],
    creator: companyName,
    publisher: companyName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
      languages: {
        'en': `${baseUrl}${config.path}`,
        'ar': `${baseUrl}/ar${config.path}`,
        'x-default': `${baseUrl}${config.path}`
      }
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url,
      siteName: companyName,
      locale: lang.locale,
      type: config.type || 'website',
      images: config.images || [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: companyName
        }
      ]
    },
    metadataBase: new URL(baseUrl),
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: config.images?.[0]?.url || `${baseUrl}/og-image.jpg`
    },
    other: {
      'company-registration': '16851428',
      'company-country': 'United Kingdom',
      'company-type': 'Applied AI SaaS',
      'industries-served': 'Hospitality, Hotels, Restaurants, Cafes, F&B',
      'ai-category': 'Applied Artificial Intelligence, Operational AI'
    }
  };
}

/**
 * Home page metadata
 */
export const homeMetadata = (locale: Locale = 'en'): Metadata => {
  const t = getTranslation(locale);
  return generateMetadata({
    title: t.seo.defaultTitle,
    description: t.seo.defaultDescription,
    keywords: t.seo.keywords,
    path: '/',
    locale,
    type: 'website'
  });
};

/**
 * About page metadata
 */
export const aboutMetadata = (locale: Locale = 'en'): Metadata => {
  return generateMetadata({
    title: locale === 'en' 
      ? 'About PROINVEST GLOBAL LTD - UK Applied AI Company'
      : 'حول بروانفست جلوبال - شركة ذكاء اصطناعي بريطانية',
    description: locale === 'en'
      ? 'PROINVEST GLOBAL LTD (UK Company No. 16851428) is a United Kingdom-based Applied AI company specializing in operational artificial intelligence for hospitality and F&B industries. We develop ProHotelAI and ProCafeAI platforms.'
      : 'بروانفست جلوبال المحدودة (رقم الشركة البريطانية 16851428) هي شركة ذكاء اصطناعي تطبيقي مقرها المملكة المتحدة متخصصة في الذكاء الاصطناعي التشغيلي لقطاعات الضيافة والأغذية والمشروبات.',
    keywords: 'Applied AI company UK, hospitality AI company, operational AI, ProHotelAI, ProCafeAI, UK tech company, company number 16851428',
    path: '/about',
    locale
  });
};

/**
 * ProHotelAI metadata
 */
export const proHotelAIMetadata = (locale: Locale = 'en'): Metadata => {
  return generateMetadata({
    title: locale === 'en'
      ? 'ProHotelAI - AI Hotel Management System & Guest Assistant'
      : 'بروهوتل إيه آي - نظام إدارة فنادق ذكي ومساعد ضيوف',
    description: locale === 'en'
      ? 'ProHotelAI: ProHotelAI is an AI-native hotel operations platform built around a governed Hotel Digital Brain. It connects guest concierge, hotel knowledge, operational workflows, service fulfilment, commerce, reporting and hotel data into one governed operating layer for hotels and resorts.'
      : 'بروهوتل إيه آي: منصة عمليات فندقية تعمل بالذكاء الاصطناعي للفنادق من فئة 4 و 5 نجوم. مساعد ضيوف ذكي على مدار الساعة، تسجيل دخول وخروج آلي، أتمتة مكتب الاستقبال، معالجة طلبات الخدمة، تحليلات تشغيلية.',
    keywords: 'hotel digital brain, AI hotel operations platform, AI guest concierge, hotel knowledge governance, hotel automation, ProHotelAI, hospitality AI, hotel commerce, hotel operational intelligence',
    path: '/solutions/prohotelai',
    locale
  });
};

/**
 * ProCafeAI metadata
 */
export const proCafeAIMetadata = (locale: Locale = 'en'): Metadata => {
  return generateMetadata({
    title: locale === 'en'
      ? 'ProCafeAI - AI Restaurant Ordering System & Operations Platform'
      : 'بروكافيه إيه آي - نظام طلب مطاعم ذكي ومنصة عمليات',
    description: locale === 'en'
      ? 'ProCafeAI is an AI-native operations platform for cafés and restaurants, connecting digital ordering, menu intelligence, customer interaction and operational workflows in one cloud platform.'
      : 'بروكافيه إيه آي (كافي جروك إيه آي): منصة عمليات تعمل بالذكاء الاصطناعي للمقاهي والمطاعم. طلب عبر رمز الاستجابة السريعة، توصيات قائمة ذكية، معالجة طلبات آلية، تنسيق المطبخ، إدارة المخزون.',
    keywords: 'AI restaurant ordering system, QR code ordering, café automation, restaurant AI platform, ProCafeAI, CafeGrok AI, F&B technology, restaurant operations software, menu AI',
    path: '/solutions/procafeai',
    locale
  });
};

/**
 * Solutions overview metadata
 */
export const solutionsMetadata = (locale: Locale = 'en'): Metadata => {
  return generateMetadata({
    title: locale === 'en'
      ? 'AI Solutions for Hospitality - ProHotelAI & ProCafeAI'
      : 'حلول ذكاء اصطناعي للضيافة - بروهوتل إيه آي وبروكافيه إيه آي',
    description: locale === 'en'
      ? 'Applied AI platforms for hospitality operations: ProHotelAI for hotels and ProCafeAI for restaurants. Automate guest services, optimize operations, reduce costs, increase revenue with operational AI systems.'
      : 'منصات ذكاء اصطناعي تطبيقي لعمليات الضيافة: بروهوتل إيه آي للفنادق وبروكافيه إيه آي للمطاعم. أتمتة خدمات الضيوف، تحسين العمليات، تقليل التكاليف، زيادة الإيرادات.',
    keywords: 'AI hospitality solutions, hotel AI platform, restaurant AI platform, hospitality automation, operational AI, ProHotelAI, ProCafeAI',
    path: '/solutions',
    locale
  });
};

/**
 * Contact page metadata
 */
export const contactMetadata = (locale: Locale = 'en'): Metadata => {
  return generateMetadata({
    title: locale === 'en'
      ? 'Contact PROINVEST GLOBAL LTD - Applied AI for Hospitality'
      : 'اتصل ببروانفست جلوبال - ذكاء اصطناعي تطبيقي للضيافة',
    description: locale === 'en'
      ? 'Contact PROINVEST GLOBAL LTD for ProHotelAI and ProCafeAI solutions. UK-based Applied AI company (Company No. 16851428) specializing in hospitality operations automation.'
      : 'اتصل ببروانفست جلوبال المحدودة للحصول على حلول بروهوتل إيه آي وبروكافيه إيه آي. شركة ذكاء اصطناعي تطبيقي مقرها المملكة المتحدة.',
    keywords: 'contact proinvest global, ProHotelAI contact, ProCafeAI contact, hospitality AI contact, UK AI company',
    path: '/contact',
    locale
  });
};
