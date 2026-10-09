import Link from 'next/link';

const master = '/images/corporate-campus-master.webp';

// Both overlays share the photograph's coordinates. The mobile derivative is
// B3 mobile crop: x=1300, y=0, width=2000, height=1648 from the 3840px master.
function IntelligenceLight({ mobile = false }: { mobile?: boolean }) {
  const id = mobile ? 'campus-mobile' : 'campus-desktop';
  return <svg className={`campus-light campus-light-${mobile ? 'mobile' : 'desktop'}`} viewBox={mobile ? '1300 0 2000 1648' : '0 0 3840 1648'} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id={`${id}-falloff`}><stop offset="0" stopColor="white" /><stop offset=".35" stopColor="white" stopOpacity=".8" /><stop offset="1" stopColor="white" stopOpacity="0" /></radialGradient>
      <filter id={`${id}-soften`} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9" /></filter>
      <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="3840" height="1648">
        <ellipse className="campus-core" cx="2175" cy="720" rx="195" ry="185" fill={`url(#${id}-falloff)`} />
        <g fill="none" stroke="white" strokeWidth="35" strokeLinecap="round" filter={`url(#${id}-soften)`}>
          <path className="campus-flow" pathLength="1000" d="M 2070 650 C 1930 585 1900 480 1760 480 L 1380 478" />
          <path className="campus-flow" pathLength="1000" d="M 2370 685 C 2510 685 2530 565 2650 560 L 2810 565" />
          <path className="campus-flow" pathLength="1000" d="M 2340 790 C 2500 790 2550 840 2700 865 S 3050 900 3525 890" />
          <path className="campus-flow" pathLength="1000" d="M 2060 860 C 1810 990 1560 1090 1180 1170" />
        </g>
      </mask>
    </defs>
    {/* Illuminate pixels already present in the photo; never draw new paths. */}
    <image href={mobile ? '/images/corporate-campus-mobile.webp' : '/images/corporate-campus-desktop.webp'} x={mobile ? 1300 : 0} width={mobile ? 2000 : 3840} height="1648" mask={`url(#${id}-mask)`} />
  </svg>;
}

export default function HomepageHero() {
  return <section className="corporate-hero campus-hero" data-hero="campus" data-motion="true" aria-labelledby="homepage-heading">
    <div className="campus-scene" aria-hidden="true">
      <picture>
        <source media="(max-width:700px)" srcSet="/images/corporate-campus-mobile.webp" />
        <source media="(max-width:1600px)" srcSet="/images/corporate-campus-desktop.webp" />
        <img src={master} width="3840" height="1648" alt="" fetchPriority="high" />
      </picture>
      <IntelligenceLight /><IntelligenceLight mobile />
    </div>
    <div className="campus-shade" aria-hidden="true" />
    <div className="corporate-container campus-content">
      <p className="corporate-eyebrow">THE APPLIED AI COMPANY FOR HOSPITALITY</p>
      <h1 id="homepage-heading">We’re Building the <em>Digital Brain</em> for Hospitality.</h1>
      <p className="hero-copy">PROINVEST GLOBAL develops AI-native technology for real hospitality operations. Our flagship platform, ProHotelAI, connects guests, staff, management and partners through one governed Hotel Digital Brain.</p>
      <div className="corporate-actions">
        <Link className="corporate-button" href="https://prohotelai.com/product">Explore ProHotelAI <span aria-hidden="true">→</span></Link>
        <Link className="campus-secondary" href="#how-it-works">See How It Works</Link>
      </div>
      <p className="campus-trust">UK Technology Company · ISO 27001 · GDPR Compliant · UK Data Sovereignty</p>
    </div>
  </section>;
}
