import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function ThankYouModal({ open, onClose, title, message }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    document.body.classList.add('menu-open');
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.classList.remove('menu-open');
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] grid place-items-center bg-dark/75 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="thank-you-title"
            className="relative w-full max-w-md border border-gold/25 bg-dark p-8 text-center text-white shadow-premium sm:p-10"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="focus-ring absolute right-4 top-4 grid h-9 w-9 place-items-center border border-white/25 text-white/70 transition hover:border-gold hover:text-gold"
            >
              <X size={16} />
            </button>

            <motion.div
              className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            >
              <CheckCircle2 size={30} />
            </motion.div>

            <p id="thank-you-title" className="serif-heading mt-6 text-3xl font-semibold sm:text-4xl">
              {title}
            </p>
            <p className="mt-4 text-sm leading-7 text-white/70">{message}</p>

            <button
              type="button"
              onClick={onClose}
              className="focus-ring mt-8 inline-flex items-center justify-center bg-gold px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-dark"
            >
              Continue Browsing
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
