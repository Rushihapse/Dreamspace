import { motion } from 'framer-motion';

const buildings = [
  { left: '4%', width: '7%', height: '30%', delay: 0 },
  { left: '12%', width: '5%', height: '48%', delay: 0.2 },
  { left: '19%', width: '8%', height: '38%', delay: 0.1 },
  { left: '29%', width: '6%', height: '62%', delay: 0.35 },
  { left: '37%', width: '10%', height: '45%', delay: 0.18 },
  { left: '49%', width: '5%', height: '72%', delay: 0.28 },
  { left: '57%', width: '9%', height: '52%', delay: 0.08 },
  { left: '68%', width: '6%', height: '66%', delay: 0.42 },
  { left: '77%', width: '8%', height: '42%', delay: 0.12 },
  { left: '88%', width: '6%', height: '55%', delay: 0.24 }
];

const particles = Array.from({ length: 26 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 96}%`,
  top: `${12 + ((index * 19) % 58)}%`,
  delay: (index % 7) * 0.3
}));

export default function DigitalCityBackdrop({ density = 'hero', showImage = true }) {
  const isHero = density === 'hero';

  return (
    <div className="absolute inset-0 overflow-hidden bg-dark" aria-hidden="true">
      {showImage && (
        <motion.img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=85"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 6, ease: 'easeOut' }}
        />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_63%_38%,rgba(48,149,178,0.36),transparent_28%),radial-gradient(circle_at_28%_54%,rgba(180,138,90,0.18),transparent_26%),linear-gradient(180deg,rgba(17,17,17,0.5),#111_92%)]" />
      <div className="digital-grid absolute inset-0 opacity-70" />
      <div className="digital-perspective absolute inset-x-0 bottom-0 h-[58%]">
        {buildings.map((building, index) => (
          <motion.div
            key={`${building.left}-${building.height}`}
            className="digital-building absolute bottom-0"
            style={{ left: building.left, width: building.width, height: building.height }}
            initial={{ opacity: 0, y: 60, scaleY: 0.82 }}
            whileInView={{ opacity: isHero ? 0.92 : 0.72, y: 0, scaleY: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: building.delay, duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          >
            {Array.from({ length: 8 }, (_, row) => (
              <span key={`${index}-${row}`} style={{ animationDelay: `${building.delay + row * 0.08}s` }} />
            ))}
          </motion.div>
        ))}
      </div>
      <motion.div className="digital-orbit absolute left-1/2 top-[46%] h-[28vw] max-h-[430px] min-h-[220px] w-[28vw] min-w-[220px] max-w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/20" />
      <div className="digital-scan absolute inset-0" />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute h-1 w-1 rounded-full bg-cyan-200/80 shadow-[0_0_16px_rgba(103,232,249,0.75)]"
          style={{ left: particle.left, top: particle.top }}
          animate={{ opacity: [0.15, 0.9, 0.15], y: [0, -18, 0] }}
          transition={{ delay: particle.delay, duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#111_0%,rgba(17,17,17,0.46)_46%,rgba(17,17,17,0.2)_100%)]" />
    </div>
  );
}
