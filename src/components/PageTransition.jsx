import { motion } from 'framer-motion';

const variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.26, ease: [0.4, 0, 1, 1] } }
};

export default function PageTransition({ children }) {
  return (
    <motion.main variants={variants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.main>
  );
}
