import { ArrowUpRight, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { company } from '../data/company';

export default function Footer() {
  const { t } = useTranslation();
  const links = [
    ['/about', t('nav.about')],
    ['/services', t('nav.services')],
    ['/projects', t('nav.projects')],
    ['/blogs', t('nav.blogs')],
    ['/contact', t('nav.contact')]
  ];

  return (
    <footer className="bg-dark py-14 text-white sm:py-20">
      <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <img src="/logo.png" alt={company.shortName} className="h-20 w-auto" />
          <p className="serif-heading mt-4 text-2xl text-white">{company.slogan}</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold">{company.name}</p>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/65">{t('footer.text')}</p>
          <p className="mt-8 text-xs uppercase tracking-[0.18em] text-gold">Founder: {company.founder}</p>
        </div>
        <div>
          <p className="eyebrow">Navigate</p>
          <div className="mt-5 grid gap-3">
            {links.map(([to, label]) => (
              <Link key={to} to={to} className="link-underline w-fit text-sm text-white/80 hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">Connect</p>
          <div className="mt-5 grid gap-3 text-sm text-white/70">
            {company.phones.map((phone) => (
              <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`} className="link-underline w-fit">{phone}</a>
            ))}
            <a href={`mailto:${company.email}`} className="link-underline w-fit">{company.email}</a>
            <span>{company.address}</span>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={company.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Dreamspace on Instagram"
              className="focus-ring grid h-10 w-10 place-items-center border border-white/25 text-white/70 transition hover:border-gold hover:text-gold"
            >
              <Instagram size={18} />
            </a>
            <a
              href={`mailto:${company.email}`}
              aria-label="Email Dreamspace"
              className="focus-ring grid h-10 w-10 place-items-center border border-white/25 text-white/70 transition hover:border-gold hover:text-gold"
            >
              <Mail size={18} />
            </a>
          </div>
          <Link to="/contact" className="mt-7 inline-flex items-center gap-2 border border-white/25 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] transition hover:border-gold hover:bg-gold">
            {t('common.startProject')} <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
      <div className="container-page mt-12 border-t border-white/10 pt-6">
        <p className="text-xs normal-case tracking-[0.02em] text-white/40">
          <span className="font-bold uppercase tracking-[0.14em] text-white/55">Registered Office:</span> {company.registeredOffice}
        </p>
        <div className="mt-3 flex flex-col gap-3 text-xs uppercase tracking-[0.14em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 {company.name}</p>
          <p>{company.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
