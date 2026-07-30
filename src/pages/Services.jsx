import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import ServiceCard from '../components/ServiceCard';
import CTASection from '../components/CTASection';
import SeoTags, { SITE_URL } from '../components/SeoTags';
import { services, serviceGroups } from '../data/services';

const filters = [{ key: 'All', label: 'All' }, ...serviceGroups.map((group) => ({ key: group.key, label: group.label }))];

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: services.map((service, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${SITE_URL}/services/${service.slug}`,
    name: service.title.en
  }))
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` }
  ]
};

export default function Services() {
  const { t } = useTranslation();
  const [active, setActive] = useState('All');
  const filtered = useMemo(() => (active === 'All' ? services : services.filter((service) => service.groupKey === active)), [active]);

  return (
    <>
      <SeoTags
        title="Architecture, Planning & Property Services in Pune | Dreamspace"
        description="14 integrated services in Pune: architecture & design, planning approvals, liaisoning, real estate consultancy, property management, investment advisory and construction support."
        path="/services"
        jsonLd={[servicesJsonLd, breadcrumbJsonLd]}
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
