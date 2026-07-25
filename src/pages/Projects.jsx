import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import ProjectCard from '../components/ProjectCard';
import CTASection from '../components/CTASection';
import SeoTags from '../components/SeoTags';
import { projects } from '../data/projects';

const categories = ['All', 'Residential', 'Commercial', 'Planning', 'Interior', 'Conversion'];

export default function Projects() {
  const { t } = useTranslation();
  const [active, setActive] = useState('All');
  const filtered = useMemo(() => (active === 'All' ? projects : projects.filter((project) => project.category === active)), [active]);

  return (
    <>
      <SeoTags
        title="Projects | DREAMSPACE"
        description="Explore Dreamspace project concepts across residential, commercial, interior, planning and conversion work."
        path="/projects"
      />
      <PageHeader title={t('projects.title')} subtitle={t('projects.subtitle')} image="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=85" />
      <section className="py-16 sm:py-24">
        <div className="container-page">
          <div className="mb-10 flex gap-3 overflow-x-auto pb-2 sm:flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                aria-pressed={active === category}
                className={`focus-ring shrink-0 border px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] transition ${
                  active === category ? 'border-dark bg-dark text-white' : 'border-dark/15 bg-white text-dark hover:border-gold hover:text-gold'
                }`}
              >
                {category === 'All' ? t('common.all') : category}
              </button>
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
