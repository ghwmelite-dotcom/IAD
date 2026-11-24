'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedLogo } from '@/components/layout/animated-logo';
import { useLanguage } from '@/components/layout/language-context';
import type { Dictionary } from '@/lib/i18n';

const currentYear = new Date().getFullYear();

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com/OHCSGhana', Icon: FacebookIcon },
  { label: 'X (Twitter)', href: 'https://x.com/OHCSGhana', Icon: XIcon },
  { label: 'Instagram', href: 'https://instagram.com/OHCSGhana', Icon: InstagramIcon },
  { label: 'YouTube', href: 'https://youtube.com/@OHCSGhana', Icon: YouTubeIcon },
];

const quickLinks: { key: keyof Dictionary['footer']['links']; href: string }[] = [
  { key: 'aboutIad', href: '/about' },
  { key: 'auditUnits', href: '/audit-units' },
  { key: 'publications', href: '/publications' },
  { key: 'newsEvents', href: '/news' },
  { key: 'rti', href: '/services/rti' },
  { key: 'contactUs', href: '/contact' },
];

const serviceLinks: { key: keyof Dictionary['footer']['serviceLinks']; href: string }[] = [
  { key: 'specialAudit', href: '/services/special-audit' },
  { key: 'consultancy', href: '/services/consultancy' },
  { key: 'reportFraud', href: '/services/report-fraud' },
  { key: 'feedback', href: '/services/feedback' },
  { key: 'track', href: '/track' },
];

export function Footer({ className }: { className?: string }) {
  const { dict } = useLanguage();
  const footerLink = 'inline-flex min-h-11 items-center font-brand text-sm text-white/75 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-light';

  return (
    <footer className={cn('bg-home-dark text-white', className)}>
      <div aria-hidden="true" className="h-1 bg-[linear-gradient(90deg,var(--color-kente-red)_0%,var(--color-kente-red)_33.33%,var(--color-accent)_33.33%,var(--color-accent)_66.66%,var(--color-primary)_66.66%)]" />
      <div className="mx-auto max-w-content px-4 pt-14 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 pb-12 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-2 lg:col-span-12 xl:col-span-5 xl:pr-6">
            <AnimatedLogo variant="footer" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">{dict.footer.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/75 transition-colors duration-200 hover:border-accent-light/60 hover:text-accent-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-light"><Icon className="h-4 w-4" /></a>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3 xl:col-span-2">
            <h3 className="mb-4 font-brand text-sm font-semibold text-white">{dict.footer.quickLinks}</h3>
            <ul>{quickLinks.map(({ key, href }) => <li key={key}><Link href={href} className={footerLink}>{dict.footer.links[key]}</Link></li>)}</ul>
          </div>
          <div className="lg:col-span-3 xl:col-span-2">
            <h3 className="mb-4 font-brand text-sm font-semibold text-white">{dict.footer.services}</h3>
            <ul>{serviceLinks.map(({ key, href }) => <li key={key}><Link href={href} className={footerLink}>{dict.footer.serviceLinks[key]}</Link></li>)}</ul>
          </div>
          <div className="col-span-2 lg:col-span-6 xl:col-span-3 xl:pl-3">
            <h3 className="mb-5 font-brand text-sm font-semibold text-white">{dict.footer.getInTouch}</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0 text-accent-light" aria-hidden="true" /><p className="text-sm leading-relaxed text-white/70">{dict.footer.addressLine1}<br />{dict.footer.addressLine2}<br />{dict.footer.addressLine3}</p></li>
              <li className="flex items-start gap-3"><Phone className="mt-3 h-4 w-4 shrink-0 text-accent-light" aria-hidden="true" /><div><p className="font-brand text-xs text-white/60">{dict.footer.phone}</p><a href="tel:+233302682340" className={footerLink}>+233 (0)30 268 2340</a></div></li>
              <li className="flex items-start gap-3"><Mail className="mt-3 h-4 w-4 shrink-0 text-accent-light" aria-hidden="true" /><div><p className="font-brand text-xs text-white/60">{dict.footer.email}</p><a href="https://ohcs.gov.gh/contact/" className={footerLink}>OHCS contact directory</a></div></li>
              <li className="flex items-start gap-3"><Clock className="mt-1 h-4 w-4 shrink-0 text-accent-light" aria-hidden="true" /><div><p className="font-brand text-xs text-white/60">{dict.footer.officeHours}</p><p className="mt-1 text-sm leading-relaxed text-white/70">{dict.footer.officeHoursValue}</p></div></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-5 border-t border-white/15 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0"><p className="font-brand text-xs leading-relaxed text-white/75">&copy; {currentYear} {dict.footer.copyright}</p><p className="mt-1 font-brand text-xs text-white/60">{dict.footer.rights}</p></div>
          <nav aria-label="Policy links"><ul className="flex flex-wrap gap-x-5 gap-y-1">{[{ label: dict.footer.privacy, href: '/privacy' },{ label: dict.footer.accessibility, href: '/accessibility' },{ label: dict.footer.sitemap, href: '/sitemap.xml' }].map(({ label, href }) => <li key={href}><Link href={href} className={footerLink}>{label}</Link></li>)}</ul></nav>
        </div>
      </div>
    </footer>
  );
}
