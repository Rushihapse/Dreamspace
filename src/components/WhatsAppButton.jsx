import { MessageCircle } from 'lucide-react';
import { company } from '../data/company';

export default function WhatsAppButton() {
  return (
    <a
      href={company.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Dreamspace on WhatsApp"
      className="focus-ring fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-gold text-white shadow-premium transition hover:-translate-y-1 hover:bg-dark"
    >
      <MessageCircle size={25} />
    </a>
  );
}
