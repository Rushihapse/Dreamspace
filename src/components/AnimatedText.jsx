import { motion } from 'framer-motion';

export default function AnimatedText({ children, className = '' }) {
  return (
    <motion.span
      className={`block overflow-hidden ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } }
      }}
    >
      {String(children)
        .split(' ')
        .map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            className="mr-[0.22em] inline-block"
            variants={{
              hidden: { y: '110%', opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } }
            }}
          >
            {word}
          </motion.span>
        ))}
    </motion.span>
  );
}
