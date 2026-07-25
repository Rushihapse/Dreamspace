import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import CTASection from '../components/CTASection';
import ImageReveal from '../components/ImageReveal';
import PageHeader from '../components/PageHeader';
import SectionTitle from '../components/SectionTitle';
import { company } from '../data/company';

const values = ['Professional Excellence', 'Transparency', 'Practical Design', 'Compliance', 'Sustainable Development'];

export default function About() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>About | Dreamspace Infrastructure & Liaisoning Pvt Ltd</title>
        <meta name="description" content={`Learn about ${company.name}, founded by ${company.founder}, and its integrated architecture, planning, liaisoning and property lifecycle approach.`} />
      </Helmet>
      <PageHeader
        title={t('about.title')}
        subtitle={t('about.subtitle')}
        image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85"
      />
      <section className="py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <ImageReveal
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=80"
            alt="Minimal residential architecture with refined interiors"
            className="aspect-[4/5]"
          />
          <div>
            <SectionTitle eyebrow="Company" title="Integrated architecture, approvals and property lifecycle intelligence." text={t('about.body')} />
            <div className="grid gap-6 border-t border-dark/12 pt-8 sm:grid-cols-2">
              <div>
                <h3 className="serif-heading text-3xl">Mission</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{company.mission}</p>
              </div>
              <div>
                <h3 className="serif-heading text-3xl">Vision</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{company.vision}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[0.75fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">Founder</p>
            <h2 className="serif-heading mt-3 text-5xl font-semibold">{company.founder}</h2>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-gold">{company.founderTitle}</p>
          </div>
          <p className="text-lg leading-9 text-muted">
            {company.founder} leads {company.name} with a practical understanding of architecture, planning processes, liaisoning, property advisory and client-focused coordination. His vision is to simplify complex approval and property journeys while delivering spaces that are functional, refined and future-ready.
          </p>
        </div>
      </section>
      <section className="py-16 sm:py-24">
        <div className="container-page">
          <SectionTitle eyebrow="Values" title="A company culture built around professional clarity and long-term trust." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((value, index) => (
              <div key={value} className="border border-dark/12 bg-white p-6">
                <p className="serif-heading text-3xl text-gold">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="serif-heading mt-5 text-2xl">{value}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
