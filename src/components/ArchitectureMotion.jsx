import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';

const films = [
  {
    src: '/videos/architect-reviewing-plans.mp4',
    poster: '/videos/architect-reviewing-plans-poster.jpg',
    number: '01',
    title: 'Plans become buildable decisions',
    text: 'Design review, development controls and submission strategy are resolved together before a proposal moves forward.'
  },
  {
    src: '/videos/architects-drafting-project.mp4',
    poster: '/videos/architects-drafting-project-poster.jpg',
    number: '02',
    title: 'Coordination shapes every detail',
    text: 'Architecture, engineering inputs and permission documentation stay connected from the first line to the final file.'
  }
];

function FilmCard({ film, featured = false }) {
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [manualPlay, setManualPlay] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '180px 0px', threshold: 0.2 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !inView || paused || (reduceMotion && !manualPlay)) {
      video?.pause();
      return;
    }
    video.play().catch(() => setPaused(true));
  }, [inView, paused, reduceMotion, manualPlay]);

  return (
    <motion.article
      className={`group relative overflow-hidden bg-charcoal ${featured ? 'min-h-[480px] lg:min-h-[650px]' : 'min-h-[420px] lg:min-h-[540px]'}`}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-[1.025]"
        poster={film.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={film.title}
        disablePictureInPicture
      >
        {inView && <source src={film.src} type="video/mp4" />}
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/15 to-dark/20" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
        <div className="flex items-end justify-between gap-5">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Film {film.number}</p>
            <h3 className="serif-heading mt-3 text-3xl font-semibold leading-tight sm:text-4xl">{film.title}</h3>
            <p className="mt-3 max-w-lg text-sm leading-7 text-white/68">{film.text}</p>
          </div>
          <button
            type="button"
            className="focus-ring grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/35 bg-dark/35 text-white backdrop-blur-sm transition hover:border-gold hover:bg-gold"
            aria-label={paused || (reduceMotion && !manualPlay) ? `Play ${film.title}` : `Pause ${film.title}`}
            onClick={() => {
              if (reduceMotion) setManualPlay((value) => !value);
              else setPaused((value) => !value);
            }}
          >
            {paused || (reduceMotion && !manualPlay) ? <Play size={17} /> : <Pause size={17} />}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function ArchitectureMotion() {
  return (
    <section className="bg-[#ece7dd] py-16 sm:py-24" aria-labelledby="architecture-motion-title">
      <div className="container-page">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow">Architecture in Motion</p>
            <h2 id="architecture-motion-title" className="serif-heading mt-4 text-4xl font-semibold leading-tight sm:text-6xl">
              The work behind every confident approval.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-muted lg:justify-self-end sm:text-lg">
            Good architecture is developed through study, iteration and precise coordination. These are the working moments that turn site potential into an approval-ready project.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
          {films.map((film, index) => <FilmCard key={film.src} film={film} featured={index === 0} />)}
        </div>
      </div>
    </section>
  );
}
