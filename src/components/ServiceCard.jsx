import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ServiceCard({ service, index }) {
  const { i18n, t } = useTranslation();
  const language = i18n.language || 'en';

  return (
    <Link
      to={`/services/${service.slug}`}
      data-cursor="View Service"
      data-cursor-arrow="true"
      className="group block overflow-hidden bg-white shadow-[0_12px_42px_rgba(17,17,17,0.08)]"
    >
      <motion.div
        className="image-overlay relative aspect-[4/5] overflow-hidden bg-charcoal"
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
        viewport={{ once: true, margin: '-70px' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.img
          src={service.image}
          alt={service.title.en}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 1.05, ease: 'easeOut' }}
        />
        <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white">
          <p className="text-xs font-bold tracking-[0.22em] text-gold">{String(index + 1).padStart(2, '0')}</p>
          <h3 className="serif-heading mt-3 text-3xl font-semibold">{service.title[language] || service.title.en}</h3>
          <p className="mt-3 text-sm leading-7 text-white/78">{service.short[language] || service.short.en}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]">
            {t('common.viewDetails')} <ArrowUpRight size={16} />
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
