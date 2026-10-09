import type { Organization, WithContext, SoftwareApplication, FAQPage, BreadcrumbList } from 'schema-dts';
export const COMPANY_INFO = {
  legalName:'PROINVEST GLOBAL LTD', brandName:'PROINVEST GLOBAL',companyNumber:'16851428',country:'United Kingdom',foundingDate:'2025',url:'https://proinvest.global',email:'info@proinvest.global',
  address:{streetAddress:'2 Frederick Street, Kings Cross',addressLocality:'London',addressRegion:'England',postalCode:'WC1X 0ND',addressCountry:'GB'},
  description:'A UK technology company developing applied AI systems for real operational environments, led by ProHotelAI — the Hotel Digital Brain. ProCafeAI and VisaRiskAI are under development in the Innovation Pipeline.',
  industry:['Applied Artificial Intelligence','Hospitality Technology','Hotel Operations'],
};
const provider = {'@type':'Organization' as const,'@id':`${COMPANY_INFO.url}#organization`,name:COMPANY_INFO.legalName};
export function generateOrganizationSchema():WithContext<Organization> { return {
  '@context':'https://schema.org','@type':'Organization','@id':provider['@id'],name:COMPANY_INFO.legalName,legalName:COMPANY_INFO.legalName,alternateName:COMPANY_INFO.brandName,
  description:COMPANY_INFO.description,url:COMPANY_INFO.url,logo:`${COMPANY_INFO.url}/brand/proinvest-logo.svg`,foundingDate:COMPANY_INFO.foundingDate,
  identifier:{'@type':'PropertyValue',propertyID:'UK Company Number',value:COMPANY_INFO.companyNumber},
  address:{'@type':'PostalAddress',...COMPANY_INFO.address},contactPoint:{'@type':'ContactPoint',email:COMPANY_INFO.email,contactType:'Corporate enquiries',availableLanguage:['en']},knowsAbout:COMPANY_INFO.industry,
  brand:[{'@type':'Brand',name:'ProHotelAI',url:'https://prohotelai.com',description:'Flagship platform — The Hotel Digital Brain.'},{'@type':'Brand',name:'ProCafeAI',url:`${COMPANY_INFO.url}/solutions/procafeai`,description:'Under Development — AI-native café and restaurant operations.'},{'@type':'Brand',name:'VisaRiskAI',url:`${COMPANY_INFO.url}/solutions/visariskai`,description:'Under Development — AI-assisted visa risk and application-readiness intelligence.'}],
  makesOffer:{'@type':'Offer',itemOffered:{'@type':'SoftwareApplication','@id':'https://prohotelai.com/#software',name:'ProHotelAI',url:'https://prohotelai.com/product',applicationCategory:'BusinessApplication',operatingSystem:'Web browser'}}
}; }
export function generateProHotelAISchema():WithContext<SoftwareApplication> { return {
  '@context':'https://schema.org','@type':'SoftwareApplication','@id':'https://prohotelai.com/#software',name:'ProHotelAI',url:'https://prohotelai.com/product',applicationCategory:'BusinessApplication',operatingSystem:'Web browser',
  description:'The Digital Brain for the AI-Native Hotel. A governed intelligence layer connecting guests, staff, management and partners through approved knowledge, operational execution, commerce and evidence.',provider,
  featureList:['Governed Hotel Digital Brain','Guest AI Concierge','Hotel Knowledge Governance','Staff and Operational Execution','Hotel Commerce','Management Intelligence and AI Reports','Hotel-approved Partner Ecosystem','PMS-neutral Hotel-data Integration','Tenant and Hotel Isolation'],
  audience:{'@type':'BusinessAudience',audienceType:'Hotels, resorts and hospitality operators'}
}; }
function emergingPlatform(name:string,path:string,description:string,officialUrl:string):WithContext<SoftwareApplication> { return {
  '@context':'https://schema.org','@type':'SoftwareApplication','@id':`${COMPANY_INFO.url}${path}#product`,name,url:`${COMPANY_INFO.url}${path}`,sameAs:officialUrl,applicationCategory:'BusinessApplication',operatingSystem:'Cloud',description:`Under Development — ${description}`,creativeWorkStatus:'Under Development',provider,
}; }
export const generateProCafeAISchema = () => emergingPlatform('ProCafeAI','/solutions/procafeai','AI-native café and restaurant operations.','https://www.procafeai.com');
export const generateVisaRiskAISchema = () => emergingPlatform('VisaRiskAI','/solutions/visariskai','AI-assisted visa risk and application-readiness intelligence.','https://www.visariskai.com');
export function generateFAQSchema(faqs:Array<{question:string;answer:string}>):WithContext<FAQPage> { return {'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map(faq => ({'@type':'Question',name:faq.question,acceptedAnswer:{'@type':'Answer',text:faq.answer}}))}; }
export function generateBreadcrumbSchema(items:Array<{name:string;url:string}>):WithContext<BreadcrumbList> { return {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:items.map((item,index) => ({'@type':'ListItem',position:index+1,name:item.name,item:item.url}))}; }
export function injectStructuredData(data:unknown):string { return JSON.stringify(data).replace(/</g,'\\u003c'); }
