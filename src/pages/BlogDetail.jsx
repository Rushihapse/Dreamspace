import { Helmet } from 'react-helmet-async';
import { Navigate, Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import CTASection from '../components/CTASection';
import { blogs } from '../data/blogs';

export default function BlogDetail() {
  const { slug } = useParams();
  const blog = blogs.find((item) => item.slug === slug);

  if (!blog) return <Navigate to="/blogs" replace />;

  const related = blogs.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{blog.title} | DREAMSPACE Journal</title>
        <meta name="description" content={blog.excerpt} />
      </Helmet>
      <PageHeader title={blog.title} subtitle={`${formatDate(blog.date)} / Dreamspace Team / ${blog.readingTime}`} image={blog.image} />
      <article className="py-16 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[0.35fr_0.65fr]">
          <aside>
            <Link to="/blogs" className="link-underline inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gold">
              <ArrowLeft size={16} /> Back to Journal
            </Link>
          </aside>
          <div className="prose-premium max-w-3xl">
            {blog.content.map((paragraph) => (
              <p key={paragraph} className="text-xl leading-10">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <p className="eyebrow">Related Blogs</p>
          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} to={`/blogs/${item.slug}`} className="group border border-dark/12 bg-bg p-6 transition hover:border-gold">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">{formatDate(item.date)}</p>
                <h3 className="serif-heading mt-3 text-2xl font-semibold">{item.title}</h3>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]">
                  Read Article <ArrowUpRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' });
}
