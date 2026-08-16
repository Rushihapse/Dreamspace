import { AnimatePresence } from 'framer-motion';
import { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Analytics from './components/Analytics';
import CinematicRouteTransition from './components/CinematicRouteTransition';
import CursorFollower from './components/CursorFollower';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PageLoader from './components/PageLoader';
import PageTransition from './components/PageTransition';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import { routes } from './routes';

export default function App() {
  const location = useLocation();

  return (
    <>
      <a href="#main-content" className="skip-link focus-ring">
        Skip to content
      </a>
      <ScrollToTop />
      <Analytics />
      <Navbar />
      <CursorFollower />
      <CinematicRouteTransition pathname={location.pathname} />
      <main id="main-content">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Suspense fallback={<PageLoader />}>
              <Routes location={location}>
                {routes.map((route) => (
                  <Route key={route.path} path={route.path} element={route.element} />
                ))}
              </Routes>
            </Suspense>
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
