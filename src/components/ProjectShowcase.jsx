import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProjectShowcase({ projects }) {
  const [active, setActive] = useState(0);
  const featured = projects.slice(0, 6);
  const current = featured[active];

  return (
    <section className="relative overflow-hidden bg-dark py-16 text-white sm:py-24">
      <div className="absolute inset-0 opacity-30">
        <AnimatePresence mode="wait">
          <motion.img
            key={current.slug}
            src={current.image}
            alt=""
            decoding="async"
            className="h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
        </AnimatePresence>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#111_0%,rgba(17,17,17,0.88)_42%,rgba(17,17,17,0.44)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/15" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/15" />

      <div className="container-page relative grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
        <div>
          <p className="eyebrow">Project Index</p>
          <h2 className="serif-heading mt-4 max-w-2xl text-5xl font-semibold leading-none sm:text-7xl">
            Selected work with a sharper project-first rhythm.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/62">
            Hover through the index to preview projects, then enter the detail page with a focused editorial transition.
          </p>
        </div>

        <div className="grid gap-0 border-t border-white/15">
          {featured.map((project, index) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              data-cursor="Explore"
              data-cursor-arrow="true"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              className="group grid gap-4 border-b border-white/15 py-5 transition hover:border-gold/60 sm:grid-cols-[72px_1fr_auto] sm:items-center"
            >
              <span className="serif-heading text-3xl text-white/30 transition group-hover:text-gold">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>
                <span className="serif-heading block text-3xl font-semibold leading-tight transition group-hover:translate-x-2 sm:text-4xl">
                  {project.title}
                </span>
                <span className="mt-2 block text-xs font-bold uppercase tracking-[0.16em] text-white/45">
                  {project.category} / {project.location}
                </span>
              </span>
              <span className="hidden h-11 w-11 place-items-center border border-white/20 text-gold transition group-hover:border-gold group-hover:bg-gold group-hover:text-white sm:grid">
                <ArrowUpRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
