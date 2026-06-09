import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import BlogCard from '../components/BlogCard';
import CTASection from '../components/CTASection';
import { blogs } from '../data/blogs';

export default function Blogs() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Journal | DREAMSPACE</title>
        <meta name="description" content="Dreamspace journal with architecture, permissions, planning and liaisoning insights." />
      </Helmet>
      <PageHeader title={t('blogs.title')} subtitle={t('blogs.subtitle')} image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1800&q=85" />
      <section className="py-16 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[0.45fr_1fr]">
          <aside>
            <p className="eyebrow">Journal</p>
            <h2 className="serif-heading mt-3 text-4xl font-semibold">A practical reading room for better project decisions.</h2>
          </aside>
          <div>
            {blogs.map((blog) => (
              <BlogCard key={blog.slug} blog={blog} />
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
