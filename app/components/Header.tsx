'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
const links = [['Company','/about'],['ProHotelAI','/solutions/prohotelai'],['Innovation','/solutions'],['Industries','/industries'],['Partners','/partners'],['Insights','/insights'],['Contact','/contact']];
export default function Header() {
  const [open,setOpen] = useState(false);
  const path = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); } }; document.addEventListener('keydown',onKey); return () => document.removeEventListener('keydown',onKey); },[]);
  return <header className="corporate-header"><a className="skip-link" href="#main-content">Skip to content</a><div className="corporate-container header-inner"><Link className="corporate-logo" href="/" aria-label="PROINVEST GLOBAL — Home"><Image src="/brand/proinvest-logo-dark.svg" alt="PROINVEST GLOBAL" width={224} height={44} priority /></Link><nav className="desktop-nav" aria-label="Main navigation">{links.map(([label,href]) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined} className={label === 'ProHotelAI' ? 'nav-flagship' : label === 'Contact' ? 'nav-contact' : ''}>{label}</Link>)}</nav><button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button></div>{open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{links.map(([label,href]) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</Link>)}<Link href="/case-studies" onClick={() => setOpen(false)}>Implementation evidence</Link></nav>}</header>;
}
