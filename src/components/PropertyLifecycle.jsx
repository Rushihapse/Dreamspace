import { motion } from 'framer-motion';
import { MessagesSquare, ClipboardList, FileCheck2, HardHat, CheckCircle2, Building2 } from 'lucide-react';
import SectionTitle from './SectionTitle';

const stages = [
  { icon: MessagesSquare, title: 'Consultation', text: 'Understanding goals, site, budget and timeline.' },
  { icon: ClipboardList, title: 'Planning', text: 'Concept, layout and design direction take shape.' },
  { icon: FileCheck2, title: 'Approvals', text: 'Submission, liaisoning and statutory clearances.' },
  { icon: HardHat, title: 'Execution', text: 'Construction support and coordinated site delivery.' },
  { icon: CheckCircle2, title: 'Completion', text: 'Handover with documentation and quality checks.' },
  { icon: Building2, title: 'Property Management', text: 'Ongoing maintenance, leasing and asset support.' }
];

export default function PropertyLifecycle({ kicker = 'Property Lifecycle', title = 'One coordinated journey from first conversation to long-term management.', variant = 'default' }) {
  const compact = variant === 'compact';

  return (
    <section className={compact ? 'py-16' : 'bg-dark py-16 text-white sm:py-24'}>
      <div className="container-page">
        <SectionTitle eyebrow={kicker} title={title} align={compact ? 'left' : 'left'} />
        <div className={`grid gap-0 border-t ${compact ? 'border-dark/12' : 'border-white/15'} sm:grid-cols-2 lg:grid-cols-6 lg:border-t-0`}>
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.title}
                className={`relative grid gap-4 border-b py-7 pr-4 sm:border-r lg:py-0 lg:pb-0 lg:pt-2 ${
                  compact ? 'border-dark/12' : 'border-white/15'
                }`}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.07, duration: 0.5 }}
              >
                <div
                  className={`grid h-12 w-12 place-items-center rounded-full border ${
                    compact ? 'border-gold/40 bg-gold/10' : 'border-gold/50 bg-white/8'
                  }`}
                >
                  <Icon size={20} className="text-gold" />
                </div>
                <div>
                  <p className={`serif-heading text-2xl ${compact ? 'text-dark' : 'text-white'}`}>{stage.title}</p>
                  <p className={`mt-2 text-sm leading-6 ${compact ? 'text-muted' : 'text-white/65'}`}>{stage.text}</p>
                </div>
                <span className={`text-xs font-bold tracking-[0.14em] ${compact ? 'text-gold/70' : 'text-white/40'}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
