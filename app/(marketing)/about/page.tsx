import { Actions, Hero, Section, Closing, Breadcrumb, EditorialRows } from '@/app/components/Corporate';
import { aboutMetadata } from '@/lib/seo';
export const metadata = aboutMetadata();
export default function About() { return <>
  <Breadcrumb title="Company" path="/about" />
  <Hero eyebrow="The company / United Kingdom" title={<>Applied AI.<br /><em>Operational purpose.</em></>} copy="PROINVEST GLOBAL LTD is a UK technology company building AI-native systems for real operational environments. Our flagship platform is ProHotelAI." scene="company" variant="wide"><Actions href="/solutions/prohotelai" /></Hero>
  <Section eyebrow="Applied AI technology" title="What we build."><p className="section-lead">We connect knowledge with useful decisions and accountable execution. Hospitality is our current commercial focus; emerging platforms explore how that approach can serve other operational needs.</p><EditorialRows items={[
    {title:'Operational AI',copy:'Systems that connect real business knowledge to real operational execution.'},
    {title:'Governed Intelligence',copy:'AI operating within defined permissions, ownership, evidence and review.'},
    {title:'Commercial Intelligence',copy:'Technology that connects relevant services, opportunities and operational context.'},
  ]} /><p className="corporate-note">ProHotelAI leads our commercial offering. ProCafeAI and VisaRiskAI remain under development in the Innovation Pipeline.</p></Section>
  <Section eyebrow="Our purpose" title="Our mission."><p className="section-lead">Turn fragmented operational knowledge into governed intelligence that helps organisations understand, decide and act.</p></Section>
  <Section eyebrow="Corporate information" title="PROINVEST GLOBAL LTD"><dl className="corporate-facts"><div><dt>UK Company Number</dt><dd>16851428</dd></div><div><dt>Registered address</dt><dd>2 Frederick Street<br />Kings Cross<br />London WC1X 0ND<br />United Kingdom</dd></div><div><dt>Corporate email</dt><dd><a href="mailto:info@proinvest.global">info@proinvest.global</a></dd></div><div><dt>Flagship platform</dt><dd>ProHotelAI — The Hotel Digital Brain</dd></div></dl></Section>
  <Closing />
</>; }
