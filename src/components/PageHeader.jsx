import { motion } from 'framer-motion';

const fallbackImage = 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1800&q=85';

export default function PageHeader({ title, subtitle, image = fallbackImage, media }) {
  const current = media?.[0] || {
    type: 'image',
    src: image,
    alt: `${title} page architecture visual`
  };

  return (
    <section className="relative min-h-[58vh] overflow-hidden bg-dark pt-32 text-white sm:min-h-[66vh]">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      >
        {current.type === 'video' ? (
          <motion.video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={current.poster}
            aria-label={current.alt}
            initial={{ scale: 1.04 }}
            animate={{ scale: 1.13 }}
            transition={{ duration: 9, ease: 'easeOut' }}
          >
            <source src={current.src} type="video/mp4" />
          </motion.video>
        ) : (
          <motion.img
            src={current.src}
            alt={current.alt}
            className="h-full w-full object-cover"
            initial={{ scale: 1.08, x: '1%' }}
            animate={{ scale: 1.2, x: '-1%' }}
            transition={{ duration: 9, ease: 'easeOut' }}
          />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-dark/62" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,rgba(180,138,90,0.14),transparent_30%),linear-gradient(to_top,#111_0%,rgba(17,17,17,0.42)_54%,rgba(17,17,17,0.22)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-10 hidden border-y border-white/10 bg-dark/20 backdrop-blur-sm sm:block">
        <div className="container-page flex items-center justify-between gap-4 py-3">
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/45">
            Architecture / Construction / Planning / Liaisoning
          </span>
          <span className="h-1 w-12 bg-gold" />
        </div>
      </div>
      <div className="container-page relative flex min-h-[48vh] items-end pb-14 sm:min-h-[55vh] sm:pb-20">
        <div className="max-w-4xl">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            DREAMSPACE
          </motion.p>
          <motion.h1 className="serif-heading mt-4 text-5xl font-semibold leading-tight sm:text-7xl" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p className="mt-5 max-w-2xl text-lg leading-8 text-white/72" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
