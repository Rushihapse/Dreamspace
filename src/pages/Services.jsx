import { Helmet } from 'react-helmet-async';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import ServiceCard from '../components/ServiceCard';
import CTASection from '../components/CTASection';
import { services } from '../data/services';

const filters = ['All', 'Design', 'Planning', 'Liaisoning', 'Consultation'];

export default function Services() {
  const { t } = useTranslation();
  const [active, setActive] = useState('All');
  const filtered = useMemo(() => (active === 'All' ? services : services.filter((service) => service.category === active)), [active]);

  return (
    <>
      <Helmet>
        <title>Services | DREAMSPACE</title>
        <meta name="description" content="Architecture, planning, liaisoning, conversion and project consultation services by Dreamspace." />
      </Helmet>
      <PageHeader title={t('services.title')} subtitle={t('services.subtitle')} image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85" />
      <section className="py-16 sm:py-24">
        <div className="container-page">
          <div className="mb-10 flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={`focus-ring border px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] transition ${
                  active === filter ? 'border-dark bg-dark text-white' : 'border-dark/15 bg-white text-dark hover:border-gold hover:text-gold'
                }`}
              >
                {filter === 'All' ? t('common.all') : filter}
              </button>
            ))}
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
