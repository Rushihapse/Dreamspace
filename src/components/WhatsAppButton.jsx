import { MessageCircle } from 'lucide-react';
import { company } from '../data/company';

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${company.whatsapp}?text=Hello%20Dreamspace%2C%20I%20want%20to%20discuss%20a%20project.`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Dreamspace on WhatsApp"
      className="focus-ring fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-gold text-white shadow-premium transition hover:-translate-y-1 hover:bg-dark"
    >
      <MessageCircle size={25} />
    </a>
  );
}
