import { useState } from 'react';
import { Building2, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import SeoTags, { SITE_URL } from '../components/SeoTags';
import ThankYouModal from '../components/ThankYouModal';
import { company } from '../data/company';
import { services } from '../data/services';

const faqs = [
  ['Can I contact Dreamspace before buying land or property?', 'Yes. Early feasibility, document review and advisory support can help you avoid planning, approval and investment surprises.'],
  ['Do you handle approval and liaisoning coordination?', 'Dreamspace supports documentation, planning guidance, authority coordination and compliance follow-up for relevant permissions.'],
  ['Can you support property management or leasing after a project?', 'Yes. The company scope includes rental, leasing, tenant coordination, property management and long-term property advisory.'],
  ['Do you work outside Maharashtra?', 'The current focus is Pune and Maharashtra, with project-specific consultation possible after review.']
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(([question, answer]) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer }
  }))
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` }
  ]
};

export default function Contact() {
  const { t } = useTranslation();
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setStatus('sending');
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send enquiry.');
      }

      setStatus('success');
      setMessage('');
      setShowThankYou(true);
      form.reset();
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Unable to send enquiry right now. Please call or WhatsApp Dreamspace.');
    }
  };

  return (
    <>
      <SeoTags
        title="Contact Dreamspace | Architecture & Liaisoning Consultants in Pune"
        description="Get in touch with Dreamspace for architecture, planning approvals, liaisoning, real estate and property management services in Pune. Call, WhatsApp or email for a free consultation."
        path="/contact"
        jsonLd={[faqJsonLd, breadcrumbJsonLd]}
      />
      <PageHeader title={t('contact.title')} subtitle={t('contact.subtitle')} image="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85" />
      <section className="py-16 sm:py-24">
        <div className="container-page grid min-w-0 gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="min-w-0 bg-white p-6 shadow-[0_12px_42px_rgba(17,17,17,0.08)] sm:p-10">
            <p className="eyebrow">{t('contact.formTitle')}</p>
            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              <input type="text" name="website" tabIndex="-1" autoComplete="off" className="hidden" aria-hidden="true" />
              <div className="grid min-w-0 gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" required />
                <Field label="Phone" name="phone" type="tel" required />
              </div>
              <Field label="Email" name="email" type="email" />
              <label className="grid min-w-0 gap-2 text-sm font-semibold">
                Service Interest
                <select name="service" className="focus-ring w-full min-w-0 border border-dark/15 bg-bg px-4 py-4 text-sm">
                  {services.map((service) => (
                    <option key={service.slug} value={service.title.en}>{service.title.en}</option>
                  ))}
                </select>
              </label>
              <label className="grid min-w-0 gap-2 text-sm font-semibold">
                Message
                <textarea name="message" rows="6" className="focus-ring w-full min-w-0 resize-none border border-dark/15 bg-bg px-4 py-4 text-sm" placeholder="Tell us about the land, property, approval, design or management requirement." />
              </label>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="focus-ring w-fit bg-dark px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-gold disabled:cursor-wait disabled:opacity-65"
              >
                {status === 'sending' ? 'Sending...' : 'Submit Enquiry'}
              </button>
              {status === 'error' && message && (
                <p className="border border-red-500/35 bg-red-500/10 p-4 text-sm font-semibold text-red-900" role="status" aria-live="polite">
                  {message}
                </p>
              )}
            </form>
          </div>
          <div className="grid min-w-0 gap-5">
            <Info icon={<Phone size={20} />} label="Phone" value={company.phones.join(' | ')} />
            <Info icon={<Mail size={20} />} label="Email" value={company.email} />
            <Info icon={<MapPin size={20} />} label="Address" value={company.address} />
            <Info icon={<Building2 size={20} />} label="Registered Office" value={company.registeredOffice} />
            <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer" className="flex min-w-0 items-center gap-4 bg-gold p-6 text-white transition hover:bg-dark">
              <MessageCircle size={24} className="shrink-0" />
              <span className="font-bold uppercase tracking-[0.14em]">WhatsApp Dreamspace</span>
            </a>
            <div className="grid min-h-[260px] min-w-0 place-items-center bg-charcoal p-6 text-center text-white">
              <div className="min-w-0">
                <p className="eyebrow">Map</p>
                <p className="serif-heading mt-3 text-3xl">{company.region}</p>
                <p className="mt-3 max-w-md text-sm leading-7 text-white/60">{company.address}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white py-16 sm:py-24">
        <div className="container-page">
          <p className="eyebrow">FAQ</p>
          <div className="mt-6 grid gap-4">
            {faqs.map(([question, answer]) => (
              <details key={question} className="border border-dark/12 p-6">
                <summary className="cursor-pointer list-none font-semibold">{question}</summary>
                <p className="mt-4 text-sm leading-7 text-muted">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <ThankYouModal
        open={showThankYou}
        onClose={() => setShowThankYou(false)}
        title="Thank You"
        message={t('contact.success')}
      />
    </>
  );
}

function Field({ label, name, type = 'text', required = false }) {
  return (
    <label className="grid min-w-0 gap-2 text-sm font-semibold">
      {label}
      <input name={name} type={type} required={required} className="focus-ring w-full min-w-0 border border-dark/15 bg-bg px-4 py-4 text-sm" />
    </label>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex min-w-0 gap-4 border border-dark/12 bg-white p-6">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">{label}</p>
        <p className="mt-2 break-words font-semibold">{value}</p>
      </div>
    </div>
  );
}
