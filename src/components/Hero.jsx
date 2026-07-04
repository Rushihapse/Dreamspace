import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AnimatedText from './AnimatedText';
import { company } from '../data/company';

export default function Hero() {
  const { t } = useTranslation();
  const [activeVideo, setActiveVideo] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const heroVideo = company.media.heroVideos[Math.min(activeVideo, company.media.heroVideos.length - 1)];

  return (
    <section className="relative min-h-screen overflow-hidden bg-dark text-white">
      <motion.video
        key={heroVideo}
        src={heroVideo}
        className="absolute inset-0 h-full w-full object-cover opacity-100"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        disablePictureInPicture
        initial={{ scale: 1.06 }}
        animate={{ scale: 1.01 }}
        transition={{ duration: 6, ease: 'easeOut' }}
        onError={() => {
          if (activeVideo < company.media.heroVideos.length - 1) {
            setActiveVideo((index) => index + 1);
          } else {
            setVideoFailed(true);
          }
        }}
        onCanPlay={(event) => {
          event.currentTarget.play().catch(() => {});
        }}
      />
      {videoFailed && (
        <div className="absolute inset-0 grid place-items-center bg-dark px-6 text-center">
          <p className="max-w-md text-sm font-semibold uppercase tracking-[0.14em] text-white/58">
            Pixabay video is blocked by the source server. Add a local MP4 file to public/videos for guaranteed playback.
          </p>
        </div>
      )}
      <div className="absolute inset-0 bg-dark/38" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_42%,rgba(180,138,90,0.16),transparent_30%),linear-gradient(to_top,#111_4%,rgba(17,17,17,0.22)_48%,rgba(17,17,17,0.66)_100%)]" />
      <motion.div
        className="absolute left-0 right-0 top-0 h-[9vh] bg-dark"
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[7vh] bg-dark"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      />
      <div className="container-page relative grid min-h-screen items-end gap-10 pb-20 pt-36 lg:grid-cols-[1fr_360px] lg:pb-24">
        <div className="max-w-5xl">
          <motion.p
            className="eyebrow mb-5"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            City-scale Architecture Studio
          </motion.p>
          <h1 className="serif-heading text-5xl font-semibold leading-[0.98] sm:text-7xl lg:text-8xl">
            <AnimatedText>{t('home.hero.title1')}</AnimatedText>
            <AnimatedText>{t('home.hero.title2')}</AnimatedText>
          </h1>
          <motion.p
            className="mt-7 max-w-2xl text-lg leading-8 text-white/78"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.65 }}
          >
            {t('home.hero.subtitle')}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.65 }}
          >
            <Link to="/projects" data-cursor="View Work" data-cursor-arrow="true" className="focus-ring inline-flex items-center justify-center gap-2 bg-white px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-dark transition hover:bg-gold hover:text-white">
              {t('common.viewProjects')} <ArrowUpRight size={16} />
            </Link>
            <Link to="/contact" data-cursor="Start" data-cursor-arrow="true" className="focus-ring inline-flex items-center justify-center gap-2 border border-white/45 px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] transition hover:border-gold hover:bg-gold">
              {t('common.startProject')} <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        </div>
        <motion.aside
          className="hidden border border-white/18 bg-white/8 p-6 backdrop-blur-md lg:block"
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.65 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Urban Approval Desk</p>
          <h2 className="serif-heading mt-3 text-3xl">City fabric, site feasibility and approvals under one roof.</h2>
          <div className="mt-7 grid grid-cols-2 gap-2">
            {company.authorities.map((authority) => (
              <span key={authority} className="border border-white/15 px-3 py-2 text-center text-xs font-bold tracking-[0.16em]">
                {authority}
              </span>
            ))}
          </div>
          <div className="mt-7 h-px overflow-hidden bg-white/20">
            <motion.div className="h-full bg-gold" animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2.4, repeat: Infinity, ease: [0.76, 0, 0.24, 1] }} />
          </div>
          <p className="mt-5 text-sm leading-7 text-white/68">{company.address}</p>
        </motion.aside>
      </div>
      <p className="absolute left-4 top-1/2 hidden -translate-y-1/2 -rotate-90 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-white/70 lg:block">
        {t('home.hero.vertical')}
      </p>
      <div className="absolute bottom-7 right-6 flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-white/70">
        <span>Scroll</span>
        <ArrowDown size={16} />
      </div>
      <div className="absolute bottom-7 left-6 hidden text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white/50 sm:block">
        City Skyline / Architecture / Planning / Liaisoning
      </div>
    </section>
  );
}
