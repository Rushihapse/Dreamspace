import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import CinematicRouteTransition from './components/CinematicRouteTransition';
import CursorFollower from './components/CursorFollower';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PageTransition from './components/PageTransition';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import { routes } from './routes';

export default function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <CursorFollower />
      <CinematicRouteTransition pathname={location.pathname} />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </PageTransition>
      </AnimatePresence>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
