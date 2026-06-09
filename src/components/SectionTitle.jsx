import { motion } from 'framer-motion';

export default function SectionTitle({ eyebrow, title, text, align = 'left' }) {
  return (
    <motion.div
      className={`mb-10 ${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55 }}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="serif-heading mt-3 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">{title}</h2>
      {text && <p className="mt-5 text-base leading-8 text-muted sm:text-lg">{text}</p>}
    </motion.div>
  );
}
