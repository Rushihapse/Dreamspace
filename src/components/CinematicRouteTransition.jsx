import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const routeVisuals = [
  {
    match: (path) => path === '/',
    label: 'Home',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85'
  },
  {
    match: (path) => path.startsWith('/about'),
    label: 'About',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85'
  },
  {
    match: (path) => path.startsWith('/services'),
    label: 'Services',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=85'
  },
  {
    match: (path) => path.startsWith('/projects'),
    label: 'Projects',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=85'
  },
  {
    match: (path) => path.startsWith('/blogs'),
    label: 'Journal',
    image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1800&q=85'
  },
  {
    match: (path) => path.startsWith('/contact'),
    label: 'Contact',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85'
  }
];

const fallback = {
  label: 'Dreamspace',
  image: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1800&q=85'
};

const getRouteVisual = (pathname) => routeVisuals.find((item) => item.match(pathname)) || fallback;

export default function CinematicRouteTransition({ pathname }) {
  const previousPath = useRef(pathname);
  const firstRender = useRef(true);
  const [transition, setTransition] = useState(null);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      previousPath.current = pathname;
      return undefined;
    }

    const from = getRouteVisual(previousPath.current);
    const to = getRouteVisual(pathname);

    setTransition({
      id: `${previousPath.current}-${pathname}-${Date.now()}`,
      from,
      to
    });

    previousPath.current = pathname;

    const timer = window.setTimeout(() => {
      setTransition(null);
    }, 1120);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {transition && (
        <motion.div
          key={transition.id}
          className="pointer-events-none fixed inset-0 z-[120] overflow-hidden bg-dark text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-dark"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.82, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-[#171717]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.82, ease: [0.76, 0, 0.24, 1] }}
          />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(180,138,90,0.18),transparent_32%)]" />

          <div className="absolute left-1/2 top-1/2 grid w-[min(82vw,860px)] -translate-x-1/2 -translate-y-1/2 gap-4">
            <div className="relative aspect-[16/8] overflow-hidden border border-white/14 bg-charcoal shadow-[0_28px_90px_rgba(0,0,0,0.42)]">
              <motion.img
                src={transition.from.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-55"
                initial={{ scale: 1, y: 0 }}
                animate={{ scale: 1.08, y: '-14%' }}
                transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.img
                src={transition.to.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ clipPath: 'inset(100% 0 0 0)', scale: 1.12 }}
                animate={{ clipPath: 'inset(0% 0 0 0)', scale: 1 }}
                transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,0.62),rgba(17,17,17,0.16),rgba(17,17,17,0.7))]" />
              <motion.div
                className="absolute inset-x-0 bottom-0 h-px bg-gold"
                initial={{ scaleX: 0, transformOrigin: 'left' }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-gold">DREAMSPACE</p>
                <p className="serif-heading mt-1 text-2xl sm:text-4xl">{transition.to.label}</p>
              </div>
              <p className="hidden text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/45 sm:block">
                Architecture / Planning / Liaisoning
              </p>
            </div>
          </div>

          <motion.div
            className="absolute inset-x-0 top-0 h-[10vh] bg-dark"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-[9vh] bg-dark"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
