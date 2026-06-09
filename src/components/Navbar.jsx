import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const navItems = [
  { to: '/', label: 'nav.home' },
  { to: '/about', label: 'nav.about' },
  { to: '/services', label: 'nav.services' },
  { to: '/projects', label: 'nav.projects' },
  { to: '/blogs', label: 'nav.blogs' },
  { to: '/contact', label: 'nav.contact' }
];

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  const navLinkClass = ({ isActive }) =>
    `link-underline focus-ring text-xs font-bold uppercase tracking-[0.16em] transition ${
      isActive ? 'text-gold' : 'text-current'
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        open ? 'bg-dark py-3 text-white shadow-[0_12px_40px_rgba(17,17,17,0.18)]' : scrolled ? 'bg-bg/95 py-3 text-dark shadow-[0_12px_40px_rgba(17,17,17,0.08)] backdrop-blur' : 'bg-transparent py-5 text-white'
      }`}
    >
      <nav className="container-page flex items-center justify-between gap-6" aria-label="Main navigation">
        <Link to="/" className="focus-ring group" onClick={() => setOpen(false)}>
          <span className="serif-heading block text-2xl font-semibold leading-none tracking-[0.14em]">DREAMSPACE</span>
          <span className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.19em] text-gold">{t('brand.tagline')}</span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass} end={item.to === '/'}>
              {t(item.label)}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          <LanguageSwitcher />
          <Link to="/contact" data-cursor="Start" data-cursor-arrow="true" className="focus-ring border border-current px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] transition hover:border-gold hover:bg-gold hover:text-white">
            {t('common.startProject')}
          </Link>
        </div>

        <button
          type="button"
          aria-label="Open mobile menu"
          onClick={() => setOpen(true)}
          className="focus-ring grid h-11 w-11 place-items-center border border-current/30 lg:hidden"
        >
          <Menu size={22} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed left-0 top-0 z-[100] h-dvh w-screen bg-[#111111] text-white lg:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_16%,rgba(180,138,90,0.16),transparent_28%)]" />
            <div className="container-page relative flex h-full flex-col py-6">
              <div className="flex items-center justify-between">
                <Link to="/" onClick={() => setOpen(false)}>
                  <span className="serif-heading block text-2xl tracking-[0.14em]">DREAMSPACE</span>
                </Link>
                <button type="button" aria-label="Close mobile menu" onClick={() => setOpen(false)} className="focus-ring grid h-11 w-11 place-items-center border border-white/30">
                  <X size={22} />
                </button>
              </div>
              <div className="mt-14 flex flex-col gap-7 bg-[#111111]">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => `serif-heading text-4xl ${isActive ? 'text-gold' : 'text-white'}`}
                  >
                    {t(item.label)}
                  </NavLink>
                ))}
              </div>
              <div className="mt-auto border-t border-white/15 pt-8">
                <LanguageSwitcher compact />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
