import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import BlogCard from '../components/BlogCard';
import CTASection from '../components/CTASection';
import SeoTags, { SITE_URL } from '../components/SeoTags';
import { blogs } from '../data/blogs';

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Journal', item: `${SITE_URL}/blogs` }
  ]
};

export default function Blogs() {
  const { t } = useTranslation();

  return (
    <>
      <SeoTags
        title="Architecture & Planning Insights | Dreamspace Journal, Pune"
        description="Practical articles on architecture, building permissions, zone conversion and liaisoning for property owners and developers in Pune, Maharashtra."
        path="/blogs"
        jsonLd={breadcrumbJsonLd}
      />
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
