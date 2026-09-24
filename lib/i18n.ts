/**
 * Internationalization (i18n) Configuration
 * Supports multi-language SEO with hreflang tags
 */

export const locales = ['en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const languages = {
  en: {
    code: 'en',
    name: 'English',
    direction: 'ltr',
    locale: 'en_GB'
  }
} as const;

/**
 * Generate hreflang tags for a page
 */
export function generateHreflangTags(basePath: string, currentLocale: Locale) {
  const baseUrl = 'https://proinvest.global';
  
  return locales.map(locale => ({
    rel: 'alternate',
    hrefLang: locale,
    href: locale === defaultLocale 
      ? `${baseUrl}${basePath}`
      : `${baseUrl}/${locale}${basePath}`
  }));
}

/**
 * Get locale-specific metadata
 */
export function getLocalizedMetadata(locale: Locale) {
  return {
    locale: languages[locale].locale,
    direction: languages[locale].direction,
    language: languages[locale].code
  };
}

/**
 * Translations structure (ready for professional translation)
 */
export const translations = {
  en: {
    common: {
      companyName: 'PROINVEST GLOBAL LTD',
      companyTagline: 'Applied AI products for real operational workflows.',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      requestDemo: 'Request a Demo',
      contactUs: 'Contact Us',
      readMore: 'Read More'
    },
    nav: {
      home: 'Home',
      about: 'About',
      solutions: 'Solutions',
      industries: 'Industries',
      caseStudies: 'Case Studies',
      insights: 'Insights',
      contact: 'Contact'
    },
    seo: {
      defaultTitle: 'PROINVEST GLOBAL LTD — Applied AI Products for Real Operations',
      defaultDescription: 'PROINVEST GLOBAL LTD is a UK technology and investment company building applied AI products including ProHotelAI, ProCafeAI and VisaRiskAI.',
      keywords: 'AI hospitality operations, AI hotel management system, AI guest assistant, AI restaurant ordering system, Applied AI SaaS, Hospitality automation software'
    }
  },
  ar: {
    common: {
      companyName: 'بروانفست جلوبال المحدودة',
      companyTagline: 'ذكاء اصطناعي يدير عمليات الضيافة الحقيقية — وليس تجارب',
      getStarted: 'ابدأ الآن',
      learnMore: 'اعرف المزيد',
      requestDemo: 'اطلب عرضًا توضيحيًا',
      contactUs: 'اتصل بنا',
      readMore: 'اقرأ المزيد'
    },
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      solutions: 'الحلول',
      industries: 'القطاعات',
      caseStudies: 'دراسات الحالة',
      insights: 'الرؤى',
      contact: 'اتصل بنا'
    },
    seo: {
      defaultTitle: 'بروانفست جلوبال - ذكاء اصطناعي تطبيقي لعمليات الضيافة',
      defaultDescription: 'منصات ذكاء اصطناعي تطبيقي تدير عمليات الضيافة والأغذية والمشروبات الحقيقية. أنظمة إدارة فندقية ذكية ومساعدين افتراضيين للضيوف ومنصات طلب ذكية للمطاعم.',
      keywords: 'عمليات الضيافة بالذكاء الاصطناعي، نظام إدارة فنادق ذكي، مساعد ضيوف ذكي، نظام طلب مطاعم ذكي، برمجيات أتمتة الضيافة'
    }
  }
} as const;

export function getTranslation(locale: Locale) {
  return translations[locale];
}
