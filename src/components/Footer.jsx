import { ArrowUpRight } from 'lucide-react';
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
          <p className="serif-heading text-3xl tracking-[0.12em]">DREAMSPACE</p>
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
          <Link to="/contact" className="mt-7 inline-flex items-center gap-2 border border-white/25 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] transition hover:border-gold hover:bg-gold">
            {t('common.startProject')} <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
      <div className="container-page mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.14em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 DREAMSPACE</p>
        <p>Architects | Planning | Liaisoning</p>
      </div>
    </footer>
  );
}
