import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import ProjectShowcase from '../components/ProjectShowcase';
import BlogCard from '../components/BlogCard';
import CTASection from '../components/CTASection';
import ImageReveal from '../components/ImageReveal';
import DigitalCityBackdrop from '../components/DigitalCityBackdrop';
import PropertyLifecycle from '../components/PropertyLifecycle';
import ArchitectureMotion from '../components/ArchitectureMotion';
import SeoTags, { SITE_URL } from '../components/SeoTags';
import { services } from '../data/services';
import { projects } from '../data/projects';
import { blogs } from '../data/blogs';
import { company } from '../data/company';
import { feasibilityFaqs, homeSeoKeywords } from '../data/seo';

const FeasibilitySuite = lazy(() => import('../components/FeasibilitySuite'));

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'GeneralContractor', 'RealEstateAgent'],
  '@id': `${SITE_URL}/#organization`,
  name: company.name,
  alternateName: company.shortName,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  telephone: company.phones[0],
  contactPoint: company.phones.map((phone) => ({
    '@type': 'ContactPoint',
    telephone: phone,
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: ['English', 'Marathi', 'Hindi']
  })),
  email: company.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address,
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 18.6519,
    longitude: 73.8111
  },
  founder: {
    '@type': 'Person',
    name: company.founder
  },
  areaServed: [
    { '@type': 'City', name: 'Pune' },
    { '@type': 'AdministrativeArea', name: 'Pimpri-Chinchwad' },
    { '@type': 'AdministrativeArea', name: 'Maharashtra' },
    ...company.authorities.map((authority) => ({ '@type': 'AdministrativeArea', name: authority }))
  ],
  sameAs: [company.instagramUrl],
  description: company.mission,
  knowsAbout: [
    'Architecture and building design',
    'Unified Development Control and Promotion Regulations (UDCPR)',
    'Building permissions and development approvals',
    'Residential, commercial and industrial project feasibility',
    'PMC, PCMC, PMRDA and MIDC approval coordination',
    'Commencement and occupancy certification'
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Dreamspace Services',
    itemListElement: services.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.title.en,
        description: service.short.en,
        areaServed: 'Pune, Maharashtra',
        url: `${SITE_URL}/services/${service.slug}`
      }
    }))
  }
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: company.name,
  inLanguage: 'en-IN',
  publisher: { '@id': `${SITE_URL}/#organization` }
};

const feasibilityApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  '@id': `${SITE_URL}/#feasibility-engine`,
  name: 'Dreamspace Feasibility Engine',
  url: `${SITE_URL}/#feasibility-engine`,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  isAccessibleForFree: true,
  description:
    'A preliminary planning tool for residential, commercial and industrial feasibility, UDCPR checks, building-permission documents and sanction readiness in Maharashtra.',
  featureList: [
    'Residential and commercial UDCPR feasibility checks',
    'Industrial and MIDC approval readiness',
    'Building sanction document checklist',
    'FSI, setback, height, parking and open-space review'
  ],
  provider: { '@id': `${SITE_URL}/#organization` },
  areaServed: { '@type': 'AdministrativeArea', name: 'Maharashtra' }
};

const feasibilityFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#feasibility-faq`,
  dateModified: '2026-10-23',
  mainEntity: feasibilityFaqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer }
  }))
};

const engagementSteps = ['Understand Requirement', 'Site & Document Study', 'Concept & Planning', 'Approval Support', 'Execution Guidance'];
const values = ['Clarity', 'Compliance', 'Professional Excellence', 'Transparent Coordination'];
const trustStats = [
  { value: '14', label: 'Integrated Service Divisions' },
  { value: '5', label: 'Approval Authorities Covered' },
  { value: '01', label: 'Founder-led Studio' },
  { value: 'Pune, MH', label: 'Regional Focus' }
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <SeoTags
        title="Architecture, Planning & Liaisoning Consultants in Pune | Dreamspace"
        description="Dreamspace Infrastructure & Liaisoning Pvt Ltd offers architecture, planning approvals, liaisoning, real estate consultancy and property management services in Pune, PCMC, PMC, PMRDA & MIDC. Book a free consultation."
        path="/"
        keywords={homeSeoKeywords}
        jsonLd={[localBusinessJsonLd, websiteJsonLd, feasibilityApplicationJsonLd, feasibilityFaqJsonLd]}
      />
      <Hero />

      <section className="py-16 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[0.95fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow">Studio</p>
            <h2 className="serif-heading mt-4 text-4xl font-semibold leading-tight sm:text-6xl">{t('home.intro.title')}</h2>
          </div>
          <div className="grid gap-6">
            <p className="text-lg leading-9 text-muted">{t('home.intro.text')}</p>
            <Link to="/about" data-cursor="About" data-cursor-arrow="true" className="link-underline w-fit text-xs font-bold uppercase tracking-[0.16em]">
              {t('nav.about')} <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-dark/10 bg-white py-10">
        <div className="container-page grid grid-cols-2 gap-6 sm:grid-cols-4">
          {trustStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <p className="serif-heading text-3xl text-gold sm:text-4xl">{stat.value}</p>
              <p className="mt-2 text-xs font-semibold uppercase leading-5 tracking-[0.1em] text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden bg-dark py-10 text-white">
        <div className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {company.cardServices.map((item, index) => (
            <motion.div
              key={item}
              className="border border-white/12 p-5"
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <p className="serif-heading text-3xl text-gold">{String(index + 1).padStart(2, '0')}</p>
              <p className="mt-4 text-sm font-semibold uppercase leading-6 tracking-[0.12em] text-white/78">{item}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <SectionTitle eyebrow={t('home.services.kicker')} title={t('home.services.title')} />
          <motion.div
            className="service-marquee -mx-4 overflow-hidden px-4"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="service-marquee-track flex w-max gap-5" aria-label="Services">
              {[...services, ...services].map((service, index) => (
                <div key={`${service.slug}-${index}`} className="w-[280px] shrink-0 sm:w-[300px] lg:w-[292px]">
                  <ServiceCard service={service} index={index % services.length} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="feasibility-engine" className="bg-dark py-16 text-white sm:py-24">
        <div className="container-page grid gap-10">
          <motion.div
            className="grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65 }}
          >
            <div>
              <p className="eyebrow">Feasibility Engine</p>
              <h2 className="serif-heading mt-4 text-4xl font-semibold leading-tight sm:text-6xl">
                A planning intelligence tool that makes site potential visible.
              </h2>
            </div>
            <p className="text-base leading-8 text-white/68 sm:text-lg">
              Test road width, setbacks, floor count, open space and orientation to understand the early logic behind a buildable project.
            </p>
          </motion.div>
          <Suspense fallback={<div className="min-h-[480px] animate-pulse border border-dark/10 bg-dark/5" aria-label="Loading feasibility tools" />}>
            <FeasibilitySuite />
          </Suspense>
        </div>
      </section>

      <section className="border-b border-dark/10 bg-[#f4f1eb] py-16 sm:py-24" aria-labelledby="feasibility-guidance-title">
        <div className="container-page grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">Planning Answers</p>
            <h2 id="feasibility-guidance-title" className="serif-heading mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Building feasibility and permission guidance for Pune and Maharashtra.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted">
              Clear starting points for residential, commercial and industrial projects before drawings move into an authority submission.
            </p>
            <Link to="/services/planning-regulatory-approvals" className="link-underline mt-7 w-fit text-xs font-bold uppercase tracking-[0.16em]">
              Explore approval support <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="grid gap-3">
            {feasibilityFaqs.map(({ question, answer }) => (
              <details key={question} className="group border border-dark/12 bg-white p-6 open:border-gold/50">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-left font-semibold leading-7 marker:hidden">
                  <span>{question}</span>
                  <span className="mt-1 text-gold transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-4 max-w-3xl border-t border-dark/10 pt-4 text-sm leading-7 text-muted">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <PropertyLifecycle />

      <section className="relative min-h-[76vh] overflow-hidden bg-dark text-white">
        <DigitalCityBackdrop density="section" />
        <div className="absolute inset-0 bg-dark/20" />
        <div className="container-page relative flex min-h-[76vh] items-end pb-12 pt-24 sm:pb-16">
          <motion.div
            className="max-w-3xl"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <p className="eyebrow">Why Dreamspace</p>
            <h2 className="serif-heading mt-4 text-4xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
              From city skyline to site file, every project needs a clear path.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Dreamspace connects architecture, planning approvals, liaisoning, real estate advisory and property management for projects that need both vision and discipline.
            </p>
            <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
              {company.authorities.map((authority) => (
                <span key={authority} className="border border-white/18 bg-white/8 px-4 py-3 text-center text-xs font-bold tracking-[0.16em] backdrop-blur-sm">
                  {authority}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-dark py-16 text-white sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <ImageReveal
            src="https://images.pexels.com/photos/36809500/pexels-photo-36809500.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Contemporary architecture studio with drawings, material studies and design models"
            className="aspect-[16/11]"
          />
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65 }}
          >
            <p className="eyebrow">Studio Discipline</p>
            <h2 className="serif-heading mt-4 text-4xl font-semibold leading-tight sm:text-6xl">
              Premium design backed by permission strategy and documentation control.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/68 sm:text-lg">
              Dreamspace blends design, regulatory logic, real estate insight and on-ground coordination so projects stay refined, feasible and approval-ready.
            </p>
          </motion.div>
        </div>
      </section>

      <ArchitectureMotion />

      <ProjectShowcase projects={projects} />

      <section className="bg-charcoal py-16 text-white sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionTitle
            eyebrow={t('home.process.kicker')}
            title={t('home.process.title')}
            text="How Dreamspace engages with you on every assignment, independent of which service divisions are involved."
          />
          <div className="grid gap-0 border-t border-white/15">
            {engagementSteps.map((step, index) => (
              <motion.div
                key={step}
                className="grid gap-4 border-b border-white/15 py-7 sm:grid-cols-[120px_1fr]"
                initial={false}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <span className="serif-heading text-3xl text-gold">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="serif-heading text-3xl">{step}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <SectionTitle eyebrow={t('home.values.kicker')} title={t('home.values.title')} text="Dreamspace keeps the approval journey grounded, the property strategy clear and the client communication direct." />
            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((value) => (
                <div key={value} className="border border-dark/12 bg-white p-6">
                  <h3 className="serif-heading text-3xl">{value}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">A focused principle that guides decisions from concept to coordination.</p>
                </div>
              ))}
            </div>
          </div>
          <ImageReveal
            src="https://images.pexels.com/photos/40494848/pexels-photo-40494848.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="Contemporary architecture integrated with mature landscape and greenery"
            className="aspect-[4/5]"
          />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <SectionTitle eyebrow={t('home.blogs.kicker')} title={t('home.blogs.title')} />
          <div className="grid gap-2 lg:grid-cols-3 lg:gap-8">
            {blogs.slice(0, 3).map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
