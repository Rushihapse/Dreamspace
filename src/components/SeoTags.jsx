import { useEffect } from 'react';

const SITE_URL = 'https://www.dreamspaceinfra.com';
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;
const SITE_NAME = 'Dreamspace Infrastructure & Liaisoning Pvt Ltd';
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function removeMeta(attr, key) {
  document.head.querySelector(`meta[${attr}="${key}"]`)?.remove();
}

export default function SeoTags({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  imageAlt,
  jsonLd,
  keywords = [],
  noindex = false,
  pageType = 'WebPage'
}) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const resolvedImageAlt = imageAlt || `${title} — ${SITE_NAME}`;
    const pageJsonLd = {
      '@context': 'https://schema.org',
      '@type': pageType,
      '@id': `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: 'en-IN',
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': ORGANIZATION_ID },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: image,
        caption: resolvedImageAlt
      }
    };
    const structuredData = [pageJsonLd, ...(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [])];

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    upsertMeta('name', 'author', SITE_NAME);
    upsertMeta('name', 'application-name', 'Dreamspace');
    if (keywords.length) upsertMeta('name', 'keywords', [...new Set(keywords)].join(', '));
    else removeMeta('name', 'keywords');
    upsertLink('canonical', url);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:locale', 'en_IN');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:image:alt', resolvedImageAlt);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:url', url);
    upsertMeta('name', 'twitter:image', image);
    upsertMeta('name', 'twitter:image:alt', resolvedImageAlt);

    let script = document.getElementById('ld-json');
    if (!noindex) {
      if (!script) {
        script = document.createElement('script');
        script.id = 'ld-json';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    } else if (script) {
      script.remove();
    }
  }, [title, description, path, image, imageAlt, jsonLd, keywords, noindex, pageType]);

  return null;
}

export { SITE_URL };
