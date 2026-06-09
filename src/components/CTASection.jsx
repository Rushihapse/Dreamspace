import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CTASection({ title, text, buttonText }) {
  const { t } = useTranslation();

  return (
    <section className="bg-charcoal py-16 text-white sm:py-24">
      <div className="container-page grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <p className="eyebrow">DREAMSPACE</p>
          <h2 className="serif-heading mt-3 text-4xl font-semibold leading-tight sm:text-6xl">{title || t('cta.title')}</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/68">{text || t('cta.text')}</p>
        </div>
        <Link to="/contact" data-cursor="Contact" data-cursor-arrow="true" className="focus-ring inline-flex w-fit items-center gap-2 bg-gold px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-dark">
          {buttonText || t('common.contactDreamspace')} <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
