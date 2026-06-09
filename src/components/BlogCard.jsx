import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function BlogCard({ blog }) {
  const { t } = useTranslation();

  return (
    <Link
      to={`/blogs/${blog.slug}`}
      data-cursor="Read"
      data-cursor-arrow="true"
      className="group grid gap-5 border-t border-dark/15 py-7 sm:grid-cols-[0.75fr_1fr]"
    >
      <motion.div
        className="aspect-[4/3] overflow-hidden bg-charcoal"
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
        viewport={{ once: true, margin: '-70px' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.img
          src={blog.image}
          alt={blog.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 1.05, ease: 'easeOut' }}
        />
      </motion.div>
      <div className="flex flex-col justify-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">{new Date(blog.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })} / {blog.readingTime}</p>
        <h3 className="serif-heading mt-3 text-2xl font-semibold leading-tight sm:text-3xl">{blog.title}</h3>
        <p className="mt-3 text-sm leading-7 text-muted">{blog.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]">
          {t('common.readArticle')} <ArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  );
}
