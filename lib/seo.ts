import type { Metadata } from 'next';
import type { Locale } from './i18n';
interface SEOConfig { title:string; description:string; keywords?:string; path:string; locale?:Locale; type?:'website'|'article'; images?:Array<{url:string;width:number;height:number;alt:string}>; }
export const baseUrl = 'https://proinvest.global';
const companyName = 'PROINVEST GLOBAL LTD';
export function generateMetadata(config:SEOConfig):Metadata {
  const url = `${baseUrl}${config.path === '/' ? '' : config.path}`;
  const title = `${config.title} | ${companyName}`;
  const index = process.env.VERCEL_ENV !== 'preview';
  const images = config.images || [{url:`${baseUrl}/og-image.png`,width:1200,height:630,alt:'PROINVEST GLOBAL — Applied AI technology, led by ProHotelAI.'}];
  return {title,description:config.description,keywords:config.keywords,metadataBase:new URL(baseUrl),authors:[{name:companyName}],creator:companyName,publisher:companyName,
    robots:{index,follow:index,googleBot:{index,follow:index,'max-image-preview':'large','max-snippet':-1,'max-video-preview':-1}},
    alternates:{canonical:url,languages:{en:url,'x-default':url}},
    openGraph:{title,description:config.description,url,siteName:companyName,locale:'en_GB',type:config.type || 'website',images},
    twitter:{card:'summary_large_image',title,description:config.description,images:images.map(image => image.url)},
    other:{'company-registration':'16851428','company-country':'United Kingdom','company-type':'Applied AI Technology','flagship-platform':'ProHotelAI — The Hotel Digital Brain'}
  };
}
export const homeMetadata = (locale:Locale = 'en') => generateMetadata({title:'Applied AI for Hospitality',description:'PROINVEST GLOBAL develops AI-native technology for real hospitality operations. Our flagship platform, ProHotelAI, connects guests, staff, management and partners through one governed Hotel Digital Brain.',path:'/',locale});
export const aboutMetadata = (locale:Locale = 'en') => generateMetadata({title:'Company | Applied AI Technology',description:'PROINVEST GLOBAL LTD, UK Company Number 16851428. A UK technology company building AI-native systems for real operations, led by ProHotelAI.',path:'/about',locale});
export const proHotelAIMetadata = (locale:Locale = 'en') => generateMetadata({title:'ProHotelAI | The Digital Brain for the AI-Native Hotel',description:'Our flagship platform connects guests, staff, management and partners through governed hotel knowledge, operational execution, commerce and AI Reports.',path:'/solutions/prohotelai',locale});
export const proCafeAIMetadata = (locale:Locale = 'en') => generateMetadata({title:'ProCafeAI | Under Development',description:'AI-native café and restaurant operations. An emerging PROINVEST GLOBAL platform under development in the Innovation Pipeline.',path:'/solutions/procafeai',locale});
export const solutionsMetadata = (locale:Locale = 'en') => generateMetadata({title:'Platforms & Innovation | ProHotelAI Flagship',description:'ProHotelAI leads our commercial portfolio. ProCafeAI and VisaRiskAI form our Innovation Pipeline, with both platforms under development.',path:'/solutions',locale});
export const contactMetadata = (locale:Locale = 'en') => generateMetadata({title:'Contact Our Team',description:'Contact PROINVEST GLOBAL about ProHotelAI, corporate partnerships or operational priorities. Official corporate email: info@proinvest.global.',path:'/contact',locale});
