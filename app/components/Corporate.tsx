import Link from 'next/link';
import type { ReactNode } from 'react';
import { generateBreadcrumbSchema } from '@/lib/structuredData';

export const productOrigin = 'https://prohotelai.com';
export function Actions({ primary = 'Explore ProHotelAI', href = productOrigin, secondary = 'Contact Our Team', secondaryHref = '/contact' }: { primary?: string; href?: string; secondary?: string; secondaryHref?: string }) {
  return <div className="corporate-actions"><Link className="corporate-button" href={href}>{primary}<span aria-hidden="true">↗</span></Link><Link className="corporate-button secondary" href={secondaryHref}>{secondary}<span aria-hidden="true">→</span></Link></div>;
}

type Scene = 'corporate' | 'brain' | 'platform' | 'company' | 'operations' | 'management' | 'partners' | 'knowledge';
const scenes: Record<Scene, { image: string; mobile?: string; alt: string; width: number; height: number; core?: [number, number, number, number] }> = {
  corporate: { image: 'marketing-hotel-blue-hour.webp', alt: 'Contemporary coastal hotel architecture at blue hour, with warm interior light.', width: 1400, height: 933, core: [730, 535, 100, 95] },
  brain: { image: 'marketing-hero-brain-desktop.webp', mobile: 'marketing-hero-brain-mobile.webp', alt: 'ProHotelAI architectural intelligence identity integrated into a hotel, with existing blue connections linking its spaces.', width: 1920, height: 1086, core: [1320, 415, 170, 180] },
  platform: { image: 'product-hero.webp', alt: 'Hotel courtyard with existing blue connections meeting at a central gold intelligence node.', width: 1600, height: 1195, core: [845, 590, 110, 100] },
  company: { image: 'about-hero.webp', alt: 'Refined hospitality architecture opening onto a coastal landscape at dusk.', width: 1600, height: 1195 },
  operations: { image: 'hotel-operations-hero.webp', alt: 'Hotel colleagues coordinating service in a warmly lit corridor.', width: 1600, height: 1195 },
  management: { image: 'hotel-intelligence-hero.webp', alt: 'Hotel leaders reviewing operational information together.', width: 1600, height: 1195 },
  partners: { image: 'partner-ecosystem-hero.webp', alt: 'A hotel concierge and a local partner welcoming guests.', width: 1600, height: 1195 },
  knowledge: { image: 'hotel-digital-brain-hero.webp', alt: 'An architectural intelligence core and existing blue connections within a hotel atrium.', width: 1600, height: 1195, core: [794, 517, 110, 110] },
};

export function Hero({ eyebrow, title, copy, scene = 'corporate', variant = 'editorial', children, motion = false }: { eyebrow: string; title: ReactNode; copy: string; scene?: Scene; variant?: 'home' | 'editorial' | 'wide'; children?: ReactNode; motion?: boolean }) {
  const asset = scenes[scene];
  return <section className={`corporate-hero hero-${variant} scene-${scene}`} data-hero={scene} data-motion={motion && !!asset.core}>
    <div className="hero-scene" aria-hidden="true">
      <picture>{asset.mobile && <source media="(max-width: 700px)" srcSet={`/images/${asset.mobile}`} />}
        {/* Local, pre-optimised assets: picture preserves the approved mobile composition. */}
        <img src={`/images/${asset.image}`} alt="" width={asset.width} height={asset.height} fetchPriority="high" />
      </picture>
      {motion && asset.core && <svg className="hero-light" viewBox={`0 0 ${asset.width} ${asset.height}`} preserveAspectRatio="xMidYMid slice"><defs><radialGradient id={`glow-${scene}`}><stop offset="0" stopColor="#68caff" stopOpacity=".65" /><stop offset=".5" stopColor="#258dff" stopOpacity=".3" /><stop offset="1" stopColor="#258dff" stopOpacity="0" /></radialGradient></defs><ellipse className="intelligence-glow" cx={asset.core[0]} cy={asset.core[1]} rx={asset.core[2]} ry={asset.core[3]} fill={`url(#glow-${scene})`} /></svg>}
    </div>
    <div className="hero-shade" />
    <div className="corporate-container hero-content"><p className="corporate-eyebrow">{eyebrow}</p><h1>{title}</h1><p className="hero-copy">{copy}</p>{children}<span className="hero-caption">{asset.alt}</span></div>
  </section>;
}
export function Section({ number, eyebrow, title, children, dark = false, id }: { number?: string; eyebrow: string; title: string; children: ReactNode; dark?: boolean; id?: string }) {
  return <section id={id} className={`corporate-section${dark ? ' dark-section' : ''}`}><div className="corporate-container"><div className="section-heading"><p className="corporate-eyebrow">{number && <span className="section-number">{number} / </span>}{eyebrow}</p><h2>{title}</h2></div>{children}</div></section>;
}
export const relationships = [
  { title: 'Guests', copy: 'Natural conversations, approved hotel answers and supported service requests.', href: '/ai-concierge' },
  { title: 'Staff', copy: 'Guest intent becomes accountable work, with department ownership and visible progress.', href: '/hotel-operations' },
  { title: 'Management', copy: 'Operational evidence, AI Reports and reviewed knowledge corrections inform decisions.', href: '/hotel-intelligence' },
  { title: 'Partners', copy: 'Hotel-approved experiences connect to the guest journey under defined access and terms.', href: '/partner-ecosystem' },
];
export function Relationships() { return <div className="relationship-grid">{relationships.map((item, i) => <article key={item.title}><span className="item-index">0{i + 1}</span><h3>{item.title}</h3><p>{item.copy}</p><Link className="text-link" href={productOrigin + item.href}>Explore {item.title.toLowerCase()} <span aria-hidden="true">↗</span></Link></article>)}</div>; }
export function Cycle() { return <ol className="intelligence-cycle">{[
  ['Understand', 'Use eligible hotel knowledge and verified context.'],
  ['Decide', 'Check hotel policy, available services and user authority.'],
  ['Act', 'Execute supported actions with permission and relevant confirmation.'],
  ['Learn', 'Review evidence and approve corrections to hotel knowledge.'],
].map(([name, copy], i) => <li key={name}><span className="item-index">0{i + 1}</span><h3>{name}<span aria-hidden="true">{i < 3 ? ' →' : ' ↺'}</span></h3><p>{copy}</p></li>)}</ol>; }
export function Pipeline() { return <div className="pipeline-grid">{[
  ['ProCafeAI', 'AI-native café & restaurant operations.', '/solutions/procafeai'],
  ['VisaRiskAI', 'AI-assisted visa risk and application-readiness intelligence.', '/solutions/visariskai'],
].map(([name, copy, href]) => <article key={name}><p className="development-status">Under Development</p><h3>{name}</h3><p>{copy}</p><Link className="text-link" href={href}>Explore the direction <span aria-hidden="true">→</span></Link></article>)}</div>; }
export function Closing({ title = 'Intelligence built for real operations.', copy = 'Explore the flagship platform, or talk to PROINVEST GLOBAL about your organisation, partnership or operational priorities.' }: { title?: string; copy?: string }) { return <section className="corporate-closing"><div className="corporate-container"><p className="corporate-eyebrow">The next conversation</p><h2>{title}</h2><p>{copy}</p><Actions /></div></section>; }
export function Breadcrumb({ title, path }: { title: string; path: string }) { return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(path === '/' ? [{ name: 'Home', url: 'https://proinvest.global' }] : [{ name: 'Home', url: 'https://proinvest.global' }, { name: title, url: `https://proinvest.global${path}` }])).replace(/</g, '\\u003c') }} />; }
export function EditorialRows({ items }: { items: { title: string; copy: string; href?: string; link?: string }[] }) { return <div className="editorial-rows">{items.map((item, i) => <article key={item.title}><span className="item-index">0{i + 1}</span><h3>{item.title}</h3><div><p>{item.copy}</p>{item.href && <Link className="text-link" href={item.href}>{item.link || 'Explore'} <span aria-hidden="true">↗</span></Link>}</div></article>)}</div>; }
export const trustClaims = ['ISO 27001', 'GDPR Compliant', 'Bank-level encryption', 'UK data sovereignty'];
