import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, CheckCircle2, ClipboardCheck, TriangleAlert } from 'lucide-react';
import { AUTHORITIES, OCCUPANCIES, calculateUdcpr } from '../lib/udcprFeasibility';

const makeInitialInput = (preset) => ({
  authority: 'pmc_pcmc', occupancy: preset, congested: false,
  plotArea: 560, plotWidth: 20, roadWidth: 9, height: 10.5,
  proposedBuiltUp: 900, frontMargin: 3, sideMargin: 1.5, rearMargin: 1.5,
  tenements: 10, avgUnitCarpet: 70, includePremium: true, includeTdr: false
});

export default function UdcprFeasibilityEngine({ preset = 'residential' }) {
  const [input, setInput] = useState(() => makeInitialInput(preset));
  const [activeTab, setActiveTab] = useState('site');
  const result = useMemo(() => calculateUdcpr(input), [input]);
  const set = (name, value) => setInput((current) => ({ ...current, [name]: value }));

  return (
    <div className="feasibility-engine relative overflow-hidden border border-white/12 bg-[#0f0f0f] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(180,138,90,0.18),transparent_25%),radial-gradient(circle_at_85%_65%,rgba(246,241,232,0.07),transparent_32%)]" />
      <header className="relative border-b border-white/10 px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-3xl">
            <p className="engine-kicker text-gold">{preset === 'commercial' ? 'Commercial UDCPR Check' : 'Residential UDCPR Check'}</p>
            <h3 className="serif-heading mt-2 text-3xl sm:text-4xl">Check the proposal against traceable UDCPR rules.</h3>
            <p className="mt-3 text-sm leading-6 text-white/55">Preliminary checks based on the UDCPR compilation updated 30 January 2024. Every result shows the table or regulation used.</p>
          </div>
          <StatusBadge result={result} />
        </div>
      </header>

      <div className="relative grid xl:grid-cols-[1.05fr_0.95fr]">
        <section className="border-b border-white/10 p-4 sm:p-6 lg:p-8 xl:border-b-0 xl:border-r">
          <div className="mb-5 grid grid-cols-3 border border-white/10" role="tablist" aria-label="Feasibility inputs">
            {[["site", "Site"], ["proposal", "Proposal"], ["parking", "Parking"]].map(([key, label]) => (
              <button key={key} type="button" role="tab" aria-selected={activeTab === key} onClick={() => setActiveTab(key)} className={`engine-tab ${activeTab === key ? 'bg-gold text-white' : 'text-white/55 hover:bg-white/5 hover:text-white'}`}>{label}</button>
            ))}
          </div>

          {activeTab === 'site' && (
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField label="Planning authority" value={input.authority} onChange={(value) => set('authority', value)} options={AUTHORITIES} />
              {preset === 'commercial'
                ? <SelectField label="Commercial occupancy" value={input.occupancy} onChange={(value) => set('occupancy', value)} options={{ commercial: OCCUPANCIES.commercial, office: OCCUPANCIES.office }} />
                : <SelectField label="Residential occupancy" value={input.occupancy} onChange={(value) => set('occupancy', value)} options={{ residential: OCCUPANCIES.residential, mixed: OCCUPANCIES.mixed }} />}
              <NumberField label="Net plot area" value={input.plotArea} suffix="sq.m." min={20} onChange={(value) => set('plotArea', value)} />
              <NumberField label="Plot width / frontage" value={input.plotWidth} suffix="m" min={1} step={0.5} onChange={(value) => set('plotWidth', value)} />
              <NumberField label="Abutting road width" value={input.roadWidth} suffix="m" min={1} step={0.5} onChange={(value) => set('roadWidth', value)} />
              <ToggleField label="Congested area" checked={input.congested} onChange={(value) => set('congested', value)} helper="Use only when the sanctioned plan identifies the site as congested." />
            </div>
          )}

          {activeTab === 'proposal' && (
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberField label="Proposed built-up area" value={input.proposedBuiltUp} suffix="sq.m." min={0} onChange={(value) => set('proposedBuiltUp', value)} />
              <NumberField label="Building height" value={input.height} suffix="m" min={3} step={0.5} onChange={(value) => set('height', value)} />
              <NumberField label="Front margin" value={input.frontMargin} suffix="m" min={0} step={0.1} onChange={(value) => set('frontMargin', value)} />
              <NumberField label="Side margin" value={input.sideMargin} suffix="m" min={0} step={0.1} onChange={(value) => set('sideMargin', value)} />
              <NumberField label="Rear margin" value={input.rearMargin} suffix="m" min={0} step={0.1} onChange={(value) => set('rearMargin', value)} />
              <div className="grid gap-3">
                <ToggleField label={`Include premium FSI (+${result.fsi.premium})`} checked={input.includePremium && result.fsi.premium > 0} disabled={!result.fsi.premium} onChange={(value) => set('includePremium', value)} />
                <ToggleField label={`Include maximum TDR (+${result.fsi.tdr})`} checked={input.includeTdr && result.fsi.tdr > 0} disabled={!result.fsi.tdr} onChange={(value) => set('includeTdr', value)} />
              </div>
            </div>
          )}

          {activeTab === 'parking' && (
            <div className="grid gap-4 sm:grid-cols-2">
              {(input.occupancy === 'residential' || input.occupancy === 'mixed') ? <>
                <NumberField label="Number of tenements" value={input.tenements} min={0} step={1} onChange={(value) => set('tenements', value)} />
                <NumberField label="Average unit carpet area" value={input.avgUnitCarpet} suffix="sq.m." min={10} onChange={(value) => set('avgUnitCarpet', value)} />
              </> : <div className="sm:col-span-2 border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-white/60">Parking is estimated from 70% of proposed built-up area as carpet area. Replace this with the measured carpet-area schedule during detailed review.</div>}
              <div className="sm:col-span-2 grid grid-cols-2 gap-3">
                <Metric label="Required cars" value={result.parking.cars} />
                <Metric label="Required scooters" value={result.parking.scooters} />
              </div>
              <p className="engine-small sm:col-span-2 text-white/45">{result.parking.clause}. {result.parking.note}</p>
            </div>
          )}

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Metric label="Selected FSI" value={result.fsi.selected} />
            <Metric label="Proposed FSI" value={result.fsi.proposed} alert={result.fsi.proposed > result.fsi.selected} />
            <Metric label="FSI built-up" value={result.fsi.permissibleBuiltUp} suffix="sq.m." />
            <Metric label="Open space" value={result.recreationalOpenSpace || 'N/A'} suffix={result.recreationalOpenSpace ? 'sq.m.' : ''} />
          </div>
        </section>

        <section className="p-4 sm:p-6 lg:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="engine-kicker text-white/40">Preliminary compliance report</p>
              <h4 className="serif-heading mt-2 text-3xl">{result.status}</h4>
              <p className="mt-2 text-sm text-white/50">{result.fsi.band} road band · {result.failed} failed · {result.review} manual review</p>
            </div>
            <ClipboardCheck className="text-gold" size={34} />
          </div>
          <div className="mt-6 grid gap-3">{result.checks.map((check) => <RuleCheck key={check.label} check={check} />)}</div>
          <div className="mt-5 border border-gold/35 bg-gold/10 p-4">
            <div className="flex gap-3"><BookOpen className="mt-0.5 shrink-0 text-gold" size={18} /><div><p className="engine-label text-gold">Calculation basis</p><p className="mt-2 text-sm leading-6 text-white/60">FSI: {input.congested ? 'Table 6-A' : 'Table 6-G'}. Margins: {result.margin.clause}. Open space: Regulation 3.4.1. Parking: Tables 8-B and 8-C.</p></div></div>
          </div>
          <Link to="/contact" className="focus-ring group mt-5 inline-flex w-full items-center justify-between border border-gold bg-gold px-5 py-4 text-xs font-bold uppercase tracking-[0.14em] transition hover:bg-transparent">Request architect verification<ArrowUpRight className="transition group-hover:translate-x-1 group-hover:-translate-y-1" size={18} /></Link>
        </section>
      </div>
      <footer className="relative border-t border-white/10 px-4 py-4 sm:px-6 lg:px-8"><p className="engine-small leading-5 text-white/40"><strong className="text-white/65">Preliminary screening only.</strong> UDCPR applicability depends on sanctioned zoning, authority classification, original holding, reservations, road status, fire/special-building rules, title and later notifications. This result is not a development permission, sanctioned plan, legal opinion or structural-safety certificate. Verify it against current authority records with a licensed architect.</p></footer>
    </div>
  );
}

function StatusBadge({ result }) { const tone = result.failed ? 'border-red-400/40 bg-red-400/10 text-red-200' : result.review ? 'border-amber-300/40 bg-amber-300/10 text-amber-100' : 'border-emerald-300/40 bg-emerald-300/10 text-emerald-100'; return <div className={`engine-label border px-4 py-3 ${tone}`}>{result.status}</div>; }

function RuleCheck({ check }) {
  const pass = check.status === 'pass'; const Icon = pass ? CheckCircle2 : TriangleAlert; const tone = pass ? 'text-emerald-300' : check.status === 'fail' ? 'text-red-300' : 'text-amber-200';
  return <article className="border border-white/10 bg-white/[0.025] p-4"><div className="flex items-start gap-3"><Icon className={`mt-0.5 shrink-0 ${tone}`} size={18} /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-baseline justify-between gap-2"><h5 className="font-semibold">{check.label}</h5><span className="engine-label text-white/70">{check.value}</span></div><p className="mt-1 text-xs leading-5 text-white/50">{check.detail}</p><p className="mt-2 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-gold">{check.clause}</p></div></div></article>;
}

function Metric({ label, value, suffix, alert = false }) { return <div className={`border p-3 ${alert ? 'border-red-400/40 bg-red-400/10' : 'border-white/10 bg-white/[0.035]'}`}><p className="engine-label text-white/40">{label}</p><p className="serif-heading mt-1 text-xl">{value}{suffix && <span className="ml-1 text-xs text-white/45">{suffix}</span>}</p></div>; }

function NumberField({ label, value, suffix, min, step = 1, onChange }) { return <label className="engine-field"><span className="engine-label text-white/50">{label}</span><span className="mt-2 flex items-center border border-white/15 bg-black/20 focus-within:border-gold"><input className="min-w-0 flex-1 bg-transparent px-3 py-3 text-white outline-none" type="number" value={value} min={min} step={step} onChange={(event) => onChange(Number(event.target.value))} />{suffix && <span className="pr-3 text-xs text-white/35">{suffix}</span>}</span></label>; }

function SelectField({ label, value, onChange, options }) { return <label className="engine-field"><span className="engine-label text-white/50">{label}</span><select className="mt-2 w-full border border-white/15 bg-[#171717] px-3 py-3 text-white outline-none focus:border-gold" value={value} onChange={(event) => onChange(event.target.value)}>{Object.entries(options).map(([key, option]) => <option key={key} value={key}>{option.label}</option>)}</select></label>; }

function ToggleField({ label, checked, onChange, helper, disabled = false }) { return <label className={`engine-field flex items-start justify-between gap-4 ${disabled ? 'opacity-40' : ''}`}><span><span className="engine-label block text-white/60">{label}</span>{helper && <span className="mt-1 block text-xs leading-5 text-white/35">{helper}</span>}</span><input className="mt-0.5 h-5 w-5 shrink-0 accent-[#b48a5a]" type="checkbox" checked={checked} disabled={disabled} onChange={(event) => onChange(event.target.checked)} /></label>; }
