import { Actions, Hero, Section, Relationships, Cycle, Closing, Breadcrumb, EditorialRows, trustClaims } from '@/app/components/Corporate';
import { proHotelAIMetadata } from '@/lib/seo';
import { generateProHotelAISchema } from '@/lib/structuredData';
export const metadata = proHotelAIMetadata();
export default function ProHotelAI() { return <>
  <Breadcrumb title="ProHotelAI" path="/solutions/prohotelai" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html:JSON.stringify(generateProHotelAISchema()) }} />
  <Hero eyebrow="Our flagship platform / ProHotelAI" title={<>The Digital Brain for the <em><span className="no-break">AI-Native</span> Hotel.</em></>} copy="A governed intelligence layer connects guests, staff, management and partners through shared hotel knowledge and accountable execution." scene="brain" variant="home" motion><Actions href="https://prohotelai.com/product" secondary="Request a demonstration" secondaryHref="https://prohotelai.com/contact" /></Hero>
  <Section eyebrow="One brain. Four relationships." title="One hotel context. The right view for each person."><Relationships /></Section>
  <Section eyebrow="The operating cycle" title="Understand → Decide → Act → Learn" dark><Cycle /></Section>
  <Section eyebrow="Current platform capabilities" title="Intelligence connected to the work."><EditorialRows items={[
    {title:'Governed Hotel Digital Brain',copy:'Eligible hotel knowledge, source ownership and approved corrections inform factual answers and supported actions.',href:'https://prohotelai.com/hotel-digital-brain',link:'Hotel knowledge'},
    {title:'Guest AI Concierge',copy:'Natural guest conversations, verified-stay context, supported requests and human handoff.',href:'https://prohotelai.com/ai-concierge',link:'Guest experience'},
    {title:'Staff & operational execution',copy:'Supported requests become structured, trackable work with department ownership and permission boundaries.',href:'https://prohotelai.com/hotel-operations',link:'Staff workflows'},
    {title:'Commerce & partners',copy:'Configured hotel offerings and approved partner experiences support relevant recommendations and confirmed bookings.',href:'https://prohotelai.com/revenue-intelligence',link:'Commercial intelligence'},
    {title:'Management intelligence & AI Reports',copy:'Available activity and evidence help authorised managers investigate issues and review knowledge improvements.',href:'https://prohotelai.com/hotel-intelligence',link:'Management intelligence'},
    {title:'PMS-neutral integration',copy:'Existing hotel systems keep their authority. Hotel-data connections depend on supported connectors and configuration; governed manual setup is available where configured.',href:'https://prohotelai.com/integrations',link:'Integration approach'},
    {title:'Governance & isolation',copy:'Tenant and hotel isolation, role permissions, guest verification and audit evidence define which context and actions are available.',href:'https://prohotelai.com/security',link:'Governance'},
  ]} /><p className="corporate-note">Capabilities depend on enabled services, hotel configuration, permissions and supported connectors. Product-specific detail is maintained at prohotelai.com.</p></Section>
  <Section eyebrow="Trust & commercial model" title="Clear terms. Governed activation."><div className="trust-band">{trustClaims.map(claim => <span key={claim}>{claim}</span>)}</div><p className="section-lead">Prepaid Credit / Pay-As-You-Go. Measured usage, one credit balance and hotel-facing usage visibility.</p><p>Instant Deployment — Start in minutes. No Setup Fees. Cancel Anytime. Funding does not bypass hotel onboarding and readiness.</p><Actions primary="Explore PAYG" href="https://prohotelai.com/pricing" secondary="Product fact sheet" secondaryHref="https://prohotelai.com/fact-sheet" /></Section>
  <Closing title="Join leading hospitality businesses." copy="Review your hotel’s knowledge, guest service and operational priorities with the ProHotelAI team." />
</>; }
