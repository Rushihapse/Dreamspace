import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
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
import WaveSurface from '../components/WaveSurface';
import { services } from '../data/services';
import { projects } from '../data/projects';
import { blogs } from '../data/blogs';
import { company } from '../data/company';

const process = ['Understand Requirement', 'Site & Document Study', 'Concept & Planning', 'Approval Support', 'Execution Guidance'];
const values = ['Clarity', 'Compliance', 'Design Quality', 'Timely Coordination'];

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>DREAMSPACE | Architects, Planning and Liaisoning</title>
        <meta name="description" content="Dreamspace provides premium architecture, planning and liaisoning solutions in Maharashtra, India." />
      </Helmet>
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

      <section className="bg-dark py-16 text-white sm:py-24">
        <div className="container-page grid gap-10">
          <motion.div
            className="grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-end"
            initial={{ opacity: 0, y: 24 }}
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
          <WaveSurface />
        </div>
      </section>

      <section className="relative min-h-[76vh] overflow-hidden bg-dark text-white">
        <DigitalCityBackdrop density="section" />
        <div className="absolute inset-0 bg-dark/20" />
        <div className="container-page relative flex min-h-[76vh] items-end pb-12 pt-24 sm:pb-16">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <p className="eyebrow">Urban Planning Lens</p>
            <h2 className="serif-heading mt-4 text-4xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
              From city skyline to site file, every project needs a clear path.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Dreamspace connects architectural ambition with permission strategy, documentation and authority coordination for projects that need both vision and discipline.
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

      <section className="overflow-hidden bg-dark py-10 text-white">
        <div className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {company.cardServices.map((item, index) => (
            <motion.div
              key={item}
              className="border border-white/12 p-5"
              initial={{ opacity: 0, y: 18 }}
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
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="service-marquee-track flex w-max gap-5">
              {[...services, ...services].map((service, index) => (
                <div key={`${service.slug}-${index}`} className="w-[280px] shrink-0 sm:w-[300px] lg:w-[292px]">
                  <ServiceCard service={service} index={index % services.length} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-dark py-16 text-white sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <ImageReveal
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85"
            alt="Premium architecture studio interior and planning environment"
            className="aspect-[16/11]"
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65 }}
          >
            <p className="eyebrow">Studio Discipline</p>
            <h2 className="serif-heading mt-4 text-4xl font-semibold leading-tight sm:text-6xl">
              Premium design backed by permission strategy and documentation control.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/68 sm:text-lg">
              Dreamspace blends visual design, municipal logic and on-ground coordination so projects look refined while staying approval-ready.
            </p>
          </motion.div>
        </div>
      </section>

      <ProjectShowcase projects={projects} />

      <section className="relative overflow-hidden bg-dark py-16 text-white sm:py-24">
        <DigitalCityBackdrop density="section" />
        <div className="absolute inset-0 bg-dark/58" />
        <div className="container-page relative grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow">Authority Coordination</p>
            <h2 className="serif-heading mt-3 text-4xl font-semibold leading-tight sm:text-6xl">PMRDA, PCMC, PMC and MSRDC approval paths handled with discipline.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {company.authorities.map((authority) => (
              <motion.div
                key={authority}
                className="border border-white/14 bg-white/8 p-6 backdrop-blur-sm"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              >
                <p className="serif-heading text-4xl text-gold">{authority}</p>
                <p className="mt-3 text-sm leading-7 text-white/65">Planning support, file preparation and coordinated follow-up for project requirements.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-16 text-white sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionTitle eyebrow={t('home.process.kicker')} title={t('home.process.title')} />
          <div className="grid gap-0 border-t border-white/15">
            {process.map((step, index) => (
              <motion.div
                key={step}
                className="grid gap-4 border-b border-white/15 py-7 sm:grid-cols-[120px_1fr]"
                initial={{ opacity: 0, x: 20 }}
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
            <SectionTitle eyebrow={t('home.values.kicker')} title={t('home.values.title')} text="Dreamspace keeps the approval journey grounded, the design language refined and the client communication direct." />
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
            src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=80"
            alt="Architectural geometry and warm building facade"
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
