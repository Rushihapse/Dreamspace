import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Compass, Layers3, Route, Ruler, ShieldCheck, Trees, TriangleAlert } from 'lucide-react';

const projectTypes = {
  residential: { label: 'Residential', baseFsi: 1.4, setback: 3, green: 24, floors: 3, accent: '#b48a5a' },
  commercial: { label: 'Commercial', baseFsi: 1.8, setback: 4, green: 18, floors: 5, accent: '#d6b07c' },
  conversion: { label: 'Conversion', baseFsi: 1.2, setback: 5, green: 30, floors: 2, accent: '#a7b18b' }
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function WaveSurface() {
  const [type, setType] = useState('residential');
  const [plot, setPlot] = useState(560);
  const [road, setRoad] = useState(9);
  const [setback, setSetback] = useState(projectTypes.residential.setback);
  const [floors, setFloors] = useState(projectTypes.residential.floors);
  const [green, setGreen] = useState(projectTypes.residential.green);
  const [orientation, setOrientation] = useState(34);

  const activeType = projectTypes[type];

  const metrics = useMemo(() => {
    const roadBonus = road >= 12 ? 0.28 : road >= 9 ? 0.16 : 0;
    const fsi = +(activeType.baseFsi + roadBonus).toFixed(2);
    const setbackLoss = clamp(setback * 5.5, 8, 36);
    const footprintRatio = clamp(72 - setbackLoss - green * 0.42, 22, 64);
    const footprint = Math.round(plot * (footprintRatio / 100));
    const builtUp = Math.round(Math.min(plot * fsi, footprint * floors));
    const daylight = clamp(Math.round(96 - floors * 7 + green * 0.72 + setback * 2.2), 42, 96);
    const approval = clamp(Math.round(road * 4 + setback * 6 + green * 0.9 + daylight * 0.22), 38, 98);
    const balance = clamp(Math.round(approval * 0.48 + daylight * 0.28 + (100 - Math.abs(42 - footprintRatio)) * 0.24), 35, 98);

    return {
      fsi,
      footprint,
      builtUp,
      footprintRatio,
      daylight,
      approval,
      balance,
      greenArea: Math.round(plot * (green / 100))
    };
  }, [activeType.baseFsi, floors, green, plot, road, setback]);

  const report = useMemo(() => {
    const suggestions = [];

    if (road < 9) suggestions.push('Increase road width or review access constraints before committing the massing.');
    if (setback < 3.5 && floors > 3) suggestions.push('Add more setback for taller built form to improve approval comfort.');
    if (green < 22) suggestions.push('Raise open space to soften heat, improve frontage and create a better client experience.');
    if (metrics.daylight < 70) suggestions.push('Reduce floor count or rotate the block to improve light and ventilation.');
    if (metrics.footprintRatio > 55) suggestions.push('Footprint is heavy. Consider a slimmer mass with courtyard relief.');
    if (!suggestions.length) suggestions.push('The concept is balanced. Move next into site survey, title document study and authority review.');

    const grade = metrics.balance >= 86 ? 'A+' : metrics.balance >= 76 ? 'A' : metrics.balance >= 64 ? 'B' : 'C';
    const status = metrics.balance >= 76 ? 'Strong concept' : metrics.balance >= 64 ? 'Needs tuning' : 'High-risk layout';
    const brief =
      metrics.balance >= 76
        ? 'This option has a healthy relationship between built mass, access, open space and compliance comfort.'
        : metrics.balance >= 64
          ? 'This option can work, but one or two planning moves should be refined before presenting it to a client.'
          : 'This option is visually buildable, but the planning logic is weak and should be corrected early.';

    return { grade, status, brief, suggestions };
  }, [floors, green, metrics.balance, metrics.daylight, metrics.footprintRatio, road, setback]);

  const applyType = (nextType) => {
    const preset = projectTypes[nextType];
    setType(nextType);
    setSetback(preset.setback);
    setFloors(preset.floors);
    setGreen(preset.green);
  };

  const buildingWidth = clamp(metrics.footprintRatio + floors * 1.6, 28, 66);
  const buildingHeight = clamp(25 + floors * 6, 36, 74);
  const setbackInset = clamp(setback * 4.6, 11, 28);
  const greenBand = clamp(green * 0.68, 10, 30);

  return (
    <div className="feasibility-engine relative overflow-hidden border border-white/12 bg-[#0f0f0f]" data-cursor="Feasibility" data-cursor-arrow="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(180,138,90,0.16),transparent_26%),radial-gradient(circle_at_78%_62%,rgba(246,241,232,0.08),transparent_30%)]" />

      <div className="relative border-b border-white/10 px-4 py-4 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-gold">Dreamspace Feasibility Engine</p>
            <h3 className="serif-heading mt-1 text-3xl text-white sm:text-4xl">Tune the site. Read the result.</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(projectTypes).map(([key, item]) => (
              <button
                key={key}
                type="button"
                className={`focus-ring border px-3 py-2 text-[0.66rem] font-bold uppercase tracking-[0.12em] transition ${
                  type === key ? 'border-gold bg-gold text-white' : 'border-white/14 text-white/58 hover:border-white/40 hover:text-white'
                }`}
                onClick={() => applyType(key)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative grid gap-4 p-4 sm:p-5 xl:grid-cols-[0.95fr_1fr_0.82fr]">
        <section className="border border-white/10 bg-black/18 p-4">
          <div className="site-model site-model-compact" style={{ '--accent': activeType.accent }}>
            <div className="site-model-road" style={{ height: `${clamp(road * 2.5, 20, 38)}px` }}>
              <span>{road}m road</span>
            </div>
            <motion.div className="site-model-plot" animate={{ rotate: orientation * 0.03 }} transition={{ type: 'spring', stiffness: 120, damping: 18 }}>
              <div className="site-model-north" style={{ transform: `rotate(${orientation}deg)` }}>
                <Compass size={16} />
              </div>
              <div className="site-model-setback" style={{ inset: `${setbackInset}%` }} />
              <div className="site-model-green" style={{ width: `${greenBand}%` }} />
              <motion.div
                className="site-model-mass"
                animate={{ width: `${buildingWidth}%`, height: `${buildingHeight}%` }}
                transition={{ type: 'spring', stiffness: 110, damping: 20 }}
              >
                {Array.from({ length: floors }, (_, index) => (
                  <span key={index} />
                ))}
              </motion.div>
              <div className="site-model-court" />
              <div className="site-model-sun" style={{ transform: `rotate(${orientation + 28}deg)` }} />
            </motion.div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <Metric label="FSI" value={metrics.fsi} />
            <Metric label="Built-up" value={`${metrics.builtUp}`} suffix="sqm" />
            <Metric label="Ready" value={`${metrics.approval}%`} />
          </div>
        </section>

        <section className="border border-white/10 bg-white/[0.035] p-4">
          <div className="mb-4 flex items-center gap-3">
            <Ruler className="text-gold" size={20} />
            <div>
              <p className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-white/42">Design Controls</p>
              <h4 className="serif-heading text-2xl text-white">Reach 85+ without overbuilding.</h4>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <Control icon={Ruler} label="Plot" value={plot} suffix="sqm" min={220} max={1200} step={20} onChange={setPlot} />
            <Control icon={Route} label="Road" value={road} suffix="m" min={6} max={18} step={1} onChange={setRoad} />
            <Control icon={ShieldCheck} label="Setback" value={setback} suffix="m" min={2} max={8} step={0.5} onChange={setSetback} />
            <Control icon={Layers3} label="Floors" value={floors} suffix="" min={1} max={8} step={1} onChange={setFloors} />
            <Control icon={Trees} label="Open Space" value={green} suffix="%" min={10} max={42} step={1} onChange={setGreen} />
            <Control icon={Compass} label="Angle" value={orientation} suffix="deg" min={0} max={180} step={3} onChange={setOrientation} />
          </div>
        </section>

        <section className="border border-white/10 bg-white/[0.045] p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.64rem] font-bold uppercase tracking-[0.16em] text-white/42">Design Report</p>
              <h4 className="serif-heading mt-1 text-3xl text-white">{report.status}</h4>
            </div>
            <div className="grid h-16 w-16 place-items-center border border-gold text-center">
              <span className="serif-heading text-3xl text-gold">{report.grade}</span>
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden bg-white/10">
            <motion.div className="h-full bg-gold" animate={{ width: `${metrics.balance}%` }} transition={{ type: 'spring', stiffness: 120, damping: 18 }} />
          </div>
          <p className="mt-4 text-sm leading-7 text-white/66">{report.brief}</p>

          <div className="mt-4 grid gap-2">
            {report.suggestions.slice(0, 3).map((item, index) => {
              const good = report.grade === 'A+' || report.grade === 'A';
              const Icon = good && index === 0 ? CheckCircle2 : TriangleAlert;

              return (
                <div key={item} className="flex gap-3 border border-white/10 bg-black/[0.16] p-3">
                  <Icon className={good && index === 0 ? 'mt-0.5 shrink-0 text-gold' : 'mt-0.5 shrink-0 text-white/50'} size={16} />
                  <p className="text-xs leading-6 text-white/58">{item}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Metric label="Daylight" value={`${metrics.daylight}%`} />
            <Metric label="Landscape" value={metrics.greenArea} suffix="sqm" />
          </div>

          <Link to="/contact" className="focus-ring group mt-4 inline-flex w-full items-center justify-between border border-gold bg-gold px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:bg-transparent">
            Review my site
            <ArrowUpRight className="transition group-hover:translate-x-1 group-hover:-translate-y-1" size={17} />
          </Link>
        </section>
      </div>
    </div>
  );
}

function Metric({ label, value, suffix }) {
  return (
    <div className="border border-white/10 bg-white/[0.04] p-3">
      <p className="text-[0.6rem] font-bold uppercase tracking-[0.14em] text-white/42">{label}</p>
      <p className="serif-heading mt-1 text-xl text-white">
        {value}
        {suffix && <span className="ml-1 text-xs text-white/42">{suffix}</span>}
      </p>
    </div>
  );
}

function Control({ icon: Icon, label, value, suffix, min, max, step, onChange }) {
  return (
    <label className="feasibility-control">
      <span className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-white/52">
          <Icon size={14} />
          {label}
        </span>
        <span className="serif-heading text-lg text-white">
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={label}
      />
    </label>
  );
}
