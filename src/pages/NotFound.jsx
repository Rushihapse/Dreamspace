import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SeoTags from '../components/SeoTags';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <section className="grid min-h-screen place-items-center bg-dark px-6 py-24 text-center text-white">
      <SeoTags title="Page Not Found | DREAMSPACE" description="The requested Dreamspace page could not be found." path="/404" noindex />
      <div className="max-w-2xl">
        <p className="eyebrow">404</p>
        <h1 className="serif-heading mt-4 text-5xl font-semibold sm:text-7xl">{t('notFound.title')}</h1>
        <p className="mt-5 text-white/68">{t('notFound.text')}</p>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 bg-white px-6 py-4 text-xs font-bold uppercase tracking-[0.16em] text-dark transition hover:bg-gold hover:text-white">
          <ArrowLeft size={16} /> Back Home
        </Link>
      </div>
    </section>
  );
}
