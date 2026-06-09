import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function CursorFollower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 780, damping: 36, mass: 0.18 });
  const ringY = useSpring(y, { stiffness: 780, damping: 36, mass: 0.18 });
  const labelX = useSpring(x, { stiffness: 520, damping: 34, mass: 0.24 });
  const labelY = useSpring(y, { stiffness: 520, damping: 34, mass: 0.24 });
  const [cursor, setCursor] = useState({ active: false, label: '', arrow: false });
  const cursorRef = useRef(cursor);

  useEffect(() => {
    const move = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target.closest?.('[data-cursor], a, button, input, textarea, select, summary');
      const next = {
        active: Boolean(target),
        label: target?.dataset?.cursor || '',
        arrow: target?.dataset?.cursorArrow === 'true'
      };

      if (
        cursorRef.current.active !== next.active ||
        cursorRef.current.label !== next.label ||
        cursorRef.current.arrow !== next.arrow
      ) {
        cursorRef.current = next;
        setCursor(next);
      }
    };
    const leave = () => {
      const next = { active: false, label: '', arrow: false };
      cursorRef.current = next;
      setCursor(next);
    };

    window.addEventListener('pointermove', move);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [x, y]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden lg:block">
      <motion.div
        className="absolute grid place-items-center rounded-full border border-gold/85 bg-white/0 text-gold mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: cursor.arrow ? 62 : cursor.active ? 42 : 28,
          height: cursor.arrow ? 62 : cursor.active ? 42 : 28,
          marginLeft: cursor.arrow ? -31 : cursor.active ? -21 : -14,
          marginTop: cursor.arrow ? -31 : cursor.active ? -21 : -14,
          opacity: cursor.active ? 0.95 : 0.7
        }}
        transition={{ type: 'spring', stiffness: 520, damping: 28, mass: 0.28 }}
      >
        <AnimatePresence>
          {cursor.arrow && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 18 }}
              transition={{ duration: 0.18 }}
            >
              <ArrowUpRight size={22} strokeWidth={1.8} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div className="absolute h-2 w-2 rounded-full bg-gold shadow-[0_0_18px_rgba(180,138,90,0.8)]" style={{ x, y, marginLeft: -4, marginTop: -4 }} />
      <AnimatePresence>
        {cursor.label && (
          <motion.div
            className="absolute whitespace-nowrap border border-gold/35 bg-dark px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white shadow-premium"
            style={{ x: labelX, y: labelY, marginLeft: 28, marginTop: 18 }}
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
          >
            {cursor.label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
