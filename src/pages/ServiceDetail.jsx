import { Helmet } from 'react-helmet-async';
import { Navigate, Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import CTASection from '../components/CTASection';
import { serviceFaqs, services } from '../data/services';

const process = ['Requirement mapping', 'Site and document review', 'Planning direction', 'Drawing or file preparation', 'Coordination and guidance'];

export default function ServiceDetail() {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const service = services.find((item) => item.slug === slug);
  const language = i18n.language || 'en';

  if (!service) return <Navigate to="/services" replace />;

  return (
    <>
      <Helmet>
        <title>{service.title.en} | DREAMSPACE Services</title>
        <meta name="description" content={service.short.en} />
      </Helmet>
      <PageHeader title={service.title[language] || service.title.en} subtitle={service.subtitle} image={service.image} />
      <section className="py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="h-fit border border-dark/12 bg-white p-6 lg:sticky lg:top-28">
            <Link to="/services" className="link-underline inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gold">
              <ArrowLeft size={16} /> Back to Services
            </Link>
            <div className="mt-8">
              <p className="eyebrow">Service</p>
              <h2 className="serif-heading mt-3 text-4xl">{service.title[language] || service.title.en}</h2>
              <p className="mt-4 text-sm leading-7 text-muted">{service.short[language] || service.short.en}</p>
            </div>
          </aside>
          <div className="grid gap-12">
            <div>
              <p className="eyebrow">Overview</p>
              <p className="mt-4 text-xl leading-10 text-muted">{service.description}</p>
            </div>
            <DetailList title="What we provide" items={service.what} />
            <DetailList title="Our process" items={process} numbered />
            {service.documents?.length > 0 && <DetailList title="Required documents" items={service.documents} />}
            <DetailList title="Benefits" items={service.benefits} />
            <div>
              <p className="eyebrow">FAQ</p>
              <div className="mt-5 grid gap-4">
                {serviceFaqs.map((faq) => (
                  <details key={faq.q} className="group border border-dark/12 bg-white p-6">
                    <summary className="cursor-pointer list-none font-semibold">{faq.q}</summary>
                    <p className="mt-4 text-sm leading-7 text-muted">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTASection title={`Need support with ${service.title.en}?`} />
    </>
  );
}

function DetailList({ title, items, numbered = false }) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item, index) => (
          <div key={item} className="flex gap-3 border border-dark/12 bg-white p-5">
            <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-xs text-white">
              {numbered ? index + 1 : <Check size={14} />}
            </span>
            <span className="text-sm font-semibold leading-7">{item}</span>
          </div>
        ))}
      </div>
      {!numbered && title === 'What we provide' && (
        <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gold">
          Discuss this service <ArrowUpRight size={16} />
        </Link>
      )}
    </div>
  );
}
