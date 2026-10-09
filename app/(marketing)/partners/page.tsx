import Link from 'next/link';
import { Actions, Hero, Section, Closing, Breadcrumb, EditorialRows } from '@/app/components/Corporate';
import { generateMetadata } from '@/lib/seo';
export const metadata = generateMetadata({title:'Partners | PROINVEST Partner Network',description:'Join the PROINVEST Partner Network, review tracked referrals and commissions under approved terms, or explore hotel and technology partnerships around ProHotelAI.',path:'/partners'});
export default function Partners() { return <>
  <Breadcrumb title="Partners" path="/partners" />
  <Hero eyebrow="Partnerships / Shared operational value" title={<>Useful relationships.<br /><em>Clear responsibilities.</em></>} copy="We work with organisations that connect relevant hospitality expertise, technology and commercial relationships to our flagship platform, ProHotelAI." scene="partners"><Actions primary="Discuss a partnership" href="/contact" secondary="Partner login" secondaryHref="/ppn/login" /></Hero>
  <Section eyebrow="Partnership routes" title="Corporate partnerships and hotel-approved services."><EditorialRows items={[
    {title:'PROINVEST Partner Network',copy:'The corporate referral programme supports partner registration and approval, unique tracked referral links, approved marketing assets and dashboard visibility. Eligibility, available products and commercial terms follow your approved agreement and portal configuration.',href:'/ppn/signup',link:'Apply to the Partner Network'},
    {title:'Hotel partner ecosystem',copy:'ProHotelAI connects hotel-approved services and local experiences to guests through configured offerings and governed workflows. This is a hotel relationship, distinct from the corporate referral programme.',href:'https://prohotelai.com/partner-ecosystem',link:'Explore the hotel ecosystem'},
    {title:'Technology & implementation',copy:'Discuss supported integrations, hotel requirements and how your organisation can contribute to a practical implementation.',href:'/contact',link:'Contact our team'},
  ]} /></Section>
  <Section id="ppn-how-it-works" eyebrow="PROINVEST Partner Network" title="How the PROINVEST Partner Network works."><EditorialRows items={[
    {title:'Join',copy:'Apply for a partner account and, once approved, access eligible referral tools and approved marketing assets.'},
    {title:'Introduce',copy:'Use tracked referral links and approved marketing material to introduce eligible customers to available PROINVEST products.'},
    {title:'Earn',copy:'Track qualified referrals and commission activity through the partner dashboard under your approved commercial terms.'},
  ]} /><p className="corporate-note">The partner dashboard provides referral and conversion visibility alongside commission records. Available products, assets and commission eligibility follow your approved account and commercial terms.</p><div className="corporate-actions"><Link className="corporate-button" href="/ppn/signup">Apply to the Partner Network <span aria-hidden="true">→</span></Link><Link className="corporate-button secondary" href="/ppn/login">Partner Login <span aria-hidden="true">→</span></Link></div></Section>
  <Section eyebrow="Portfolio priority" title="ProHotelAI leads our commercial focus."><p className="section-lead">ProCafeAI and VisaRiskAI remain under development in the Innovation Pipeline. Existing PPN accounts, agreements and configured assets remain managed through the partner portal.</p><Link className="text-link" href="/solutions">Explore the portfolio <span aria-hidden="true">→</span></Link></Section>
  <Closing title="Build a partnership around real value." />
</>; }
