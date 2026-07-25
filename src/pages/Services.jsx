import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import ServiceCard from '../components/ServiceCard';
import CTASection from '../components/CTASection';
import SeoTags from '../components/SeoTags';
import { services, serviceGroups } from '../data/services';

const filters = [{ key: 'All', label: 'All' }, ...serviceGroups.map((group) => ({ key: group.key, label: group.label }))];

export default function Services() {
  const { t } = useTranslation();
  const [active, setActive] = useState('All');
  const filtered = useMemo(() => (active === 'All' ? services : services.filter((service) => service.groupKey === active)), [active]);

  return (
    <>
      <SeoTags
        title="Services | Dreamspace Infrastructure & Liaisoning Pvt Ltd"
        description="Integrated architecture, planning, approvals, liaisoning, property consultancy, management and construction support by Dreamspace Infrastructure & Liaisoning Pvt Ltd."
        path="/services"
      />
      <PageHeader title={t('services.title')} subtitle={t('services.subtitle')} image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85" />
      <section className="py-16 sm:py-24">
        <div className="container-page">
          <div className="mb-10 flex gap-3 overflow-x-auto pb-2 sm:flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => setActive(filter.key)}
                aria-pressed={active === filter.key}
                className={`focus-ring shrink-0 border px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] transition ${
                  active === filter.key ? 'border-dark bg-dark text-white' : 'border-dark/15 bg-white text-dark hover:border-gold hover:text-gold'
                }`}
              >
                {filter.key === 'All' ? t('common.all') : filter.label}
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
