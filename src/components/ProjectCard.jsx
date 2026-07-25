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
      <div className={`image-overlay relative overflow-hidden ${large ? 'aspect-[4/5] lg:h-full' : 'aspect-[4/3]'}`}>
        <img
          src={project.image}
          alt={project.title}
          decoding="async"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        {project.status && (
          <span className="absolute right-4 top-4 z-10 border border-white/25 bg-dark/70 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            {project.status}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 z-10 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{project.category} / {project.year}</p>
          <h3 className="serif-heading mt-3 text-3xl font-semibold">{project.title}</h3>
          <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]">
            Open Project <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
}
