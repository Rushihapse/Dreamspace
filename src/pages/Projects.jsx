import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import CTASection from '../components/CTASection';
import { projects } from '../data/projects';

const categories = ['All', 'Residential', 'Commercial', 'Planning', 'Interior', 'Conversion'];

export default function Projects() {
  const { t } = useTranslation();
  const [active, setActive] = useState('All');
  const [preview, setPreview] = useState(projects[0]);
  const filtered = useMemo(() => (active === 'All' ? projects : projects.filter((project) => project.category === active)), [active]);

  return (
    <>
      <Helmet>
        <title>Projects | DREAMSPACE</title>
        <meta name="description" content="Explore Dreamspace project concepts across residential, commercial, interior, planning and conversion work." />
      </Helmet>
      <PageHeader title={t('projects.title')} subtitle={t('projects.subtitle')} image="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=85" />
      <section className="bg-dark py-14 text-white sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.42fr_0.58fr]">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="eyebrow">Project Index</p>
            <h2 className="serif-heading mt-4 text-5xl font-semibold leading-none sm:text-7xl">All Projects</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/58">
              A focused index of planning, architecture, interiors and conversion work. Hover a title to preview the project.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActive(category);
                  const next = category === 'All' ? projects[0] : projects.find((project) => project.category === category);
                  if (next) setPreview(next);
                }}
                className={`focus-ring border px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] transition ${
                  active === category ? 'border-gold bg-gold text-white' : 'border-white/15 text-white/62 hover:border-gold hover:text-white'
                }`}
              >
                {category === 'All' ? t('common.all') : category}
              </button>
            ))}
            </div>

            <motion.div
              className="relative mt-10 hidden aspect-[4/5] overflow-hidden bg-charcoal lg:block"
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={preview.slug}
                  src={preview.image}
                  alt={preview.title}
                  className="h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.03 }}
                  transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">{preview.category} / {preview.year}</p>
                <p className="serif-heading mt-2 text-3xl">{preview.title}</p>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-white/15">
            {filtered.map((project, index) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                data-cursor="Explore"
                data-cursor-arrow="true"
                onMouseEnter={() => setPreview(project)}
                onFocus={() => setPreview(project)}
                className="group grid gap-4 border-b border-white/15 py-6 transition hover:border-gold/60 sm:grid-cols-[86px_1fr_auto] sm:items-center"
              >
                <span className="serif-heading text-4xl text-white/25 transition group-hover:text-gold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="serif-heading block text-3xl font-semibold leading-tight transition group-hover:translate-x-2 sm:text-5xl">
                    {project.title}
                  </span>
                  <span className="mt-3 block text-xs font-bold uppercase tracking-[0.16em] text-white/42">
                    {project.category} / {project.location} / {project.year}
                  </span>
                </span>
                <span className="grid h-12 w-12 place-items-center border border-white/20 text-gold transition group-hover:border-gold group-hover:bg-gold group-hover:text-white">
                  <ArrowUpRight size={19} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
