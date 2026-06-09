import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project, large = false }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      data-cursor="Open Project"
      data-cursor-arrow="true"
      className={`group block overflow-hidden bg-dark text-white ${large ? 'lg:row-span-2' : ''}`}
    >
      <motion.div
        className={`image-overlay relative overflow-hidden ${large ? 'aspect-[4/5] lg:h-full' : 'aspect-[4/3]'}`}
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
        viewport={{ once: true, margin: '-70px' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 1.05, ease: 'easeOut' }}
        />
        <div className="absolute inset-x-0 bottom-0 z-10 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{project.category} / {project.year}</p>
          <h3 className="serif-heading mt-3 text-3xl font-semibold">{project.title}</h3>
          <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]">
            Open Project <ArrowUpRight size={16} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
