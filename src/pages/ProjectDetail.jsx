import { Helmet } from 'react-helmet-async';
import { Navigate, Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import CTASection from '../components/CTASection';
import ImageReveal from '../components/ImageReveal';
import { projects } from '../data/projects';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) return <Navigate to="/projects" replace />;

  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <Helmet>
        <title>{project.title} | DREAMSPACE Projects</title>
        <meta name="description" content={project.overview} />
      </Helmet>
      <PageHeader title={project.title} subtitle={`${project.category} / ${project.location}`} image={project.image} />
      <section className="py-16 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="h-fit border border-dark/12 bg-white p-6 lg:sticky lg:top-28">
            <Link to="/projects" className="link-underline inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gold">
              <ArrowLeft size={16} /> Back to Projects
            </Link>
            <dl className="mt-8 grid gap-5 text-sm">
              {[
                ['Category', project.category],
                ['Location', project.location],
                ['Year', project.year],
                ['Area', project.area],
                ['Service Type', project.serviceType]
              ].map(([label, value]) => (
                <div key={label} className="border-b border-dark/10 pb-4">
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-muted">{label}</dt>
                  <dd className="mt-1 font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
          <article className="grid gap-12">
            <ProjectSection title="Overview" text={project.overview} />
            <div>
              <p className="eyebrow">Scope of Work</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {project.scope.map((item) => (
                  <div key={item} className="flex gap-3 border border-dark/12 bg-white p-5">
                    <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-white">
                      <Check size={14} />
                    </span>
                    <span className="text-sm font-semibold leading-7">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <ProjectSection title="Design / Planning Approach" text={project.approach} />
            <ProjectSection title="Challenges" text={project.challenges} />
            <ProjectSection title="Outcome" text={project.outcome} />
          </article>
        </div>
      </section>
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <p className="eyebrow">Gallery</p>
          <div className="mt-7 grid gap-5 sm:grid-cols-3">
            {project.gallery.map((image, index) => (
              <ImageReveal key={image} src={image} alt={`${project.title} gallery image ${index + 1}`} className="aspect-[4/5]" />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-dark py-14 text-white">
        <Link to={`/projects/${nextProject.slug}`} className="container-page group flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">Next Project</p>
            <h2 className="serif-heading mt-3 text-4xl font-semibold">{nextProject.title}</h2>
          </div>
          <span className="inline-flex h-14 w-14 items-center justify-center border border-white/25 transition group-hover:border-gold group-hover:bg-gold">
            <ArrowRight size={24} />
          </span>
        </Link>
      </section>
      <CTASection />
    </>
  );
}

function ProjectSection({ title, text }) {
  return (
    <section>
      <p className="eyebrow">{title}</p>
      <p className="mt-4 text-xl leading-10 text-muted">{text}</p>
    </section>
  );
}
