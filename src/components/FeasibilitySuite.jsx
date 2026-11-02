import { useMemo, useState } from 'react';
import { Building2, CheckCircle2, ClipboardList, Factory, Home, ShieldAlert, Store, TriangleAlert } from 'lucide-react';
import UdcprFeasibilityEngine from './UdcprFeasibilityEngine';

const modes = [
  { key: 'residential', label: 'Residential', detail: 'Homes, apartments and mixed residential', icon: Home },
  { key: 'commercial', label: 'Commercial', detail: 'Offices, shops and business buildings', icon: Store },
  { key: 'industrial', label: 'Industrial', detail: 'MIDC factory and environmental readiness', icon: Factory },
  { key: 'sanction', label: 'Sanction', detail: 'Permission stages and document readiness', icon: ClipboardList }
];

export default function FeasibilitySuite() {
  const [mode, setMode] = useState('residential');
  return (
    <div>
      <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {modes.map(({ key, label, detail, icon: Icon }) => (
          <button key={key} type="button" aria-pressed={mode === key} onClick={() => setMode(key)} className={`focus-ring flex min-h-28 items-start gap-3 border p-4 text-left transition ${mode === key ? 'border-gold bg-gold text-white' : 'border-dark/15 bg-white text-dark hover:border-gold'}`}>
            <Icon className="mt-0.5 shrink-0" size={21} />
            <span><strong className="block font-semibold">{label}</strong><span className={`mt-1 block text-xs leading-5 ${mode === key ? 'text-white/70' : 'text-muted'}`}>{detail}</span></span>
          </button>
        ))}
      </div>
      {mode === 'residential' && <UdcprFeasibilityEngine key="residential" preset="residential" />}
      {mode === 'commercial' && <UdcprFeasibilityEngine key="commercial" preset="commercial" />}
      {mode === 'industrial' && <IndustrialReadiness />}
      {mode === 'sanction' && <SanctionReadiness />}
    </div>
  );
}

function IndustrialReadiness() {
  const [input, setInput] = useState({ midcPlot: true, hazardous: false, pollution: 'orange', builtUp: 5000, workers: 80, fireNoc: true, landDocs: true, architect: true, processNote: false, cte: false, factoryPlan: false });
  const set = (key, value) => setInput((current) => ({ ...current, [key]: value }));
  const requirements = useMemo(() => {
    const items = [
      { label: input.midcPlot ? 'MIDC BPAMS building-plan approval' : 'Local planning-authority development permission', required: true, ready: input.landDocs && input.architect, detail: input.midcPlot ? 'Use the applicable MIDC CDCPR plot schedule; submit through the appointed architect.' : 'Confirm industrial use in zoning/DP remarks before applying.' },
      { label: 'MPCB Consent to Establish', required: input.pollution !== 'white', ready: input.cte, detail: 'Required before establishing a polluting industry/process; provide process and pollution-control details.' },
      { label: 'DISH factory-plan approval', required: input.workers >= 10 || input.hazardous, ready: input.factoryPlan, detail: 'Confirm Factories Act applicability with DISH; hazardous factories require the applicable enhanced review.' },
      { label: 'Fire approval / NOC', required: input.fireNoc || input.hazardous, ready: input.fireNoc, detail: 'Building use, height, storage and process hazards determine the final fire requirements.' },
      { label: 'Environmental clearance screening', required: input.builtUp >= 20000 || input.hazardous, ready: false, detail: input.builtUp >= 20000 ? 'Built-up area reaches the 20,000 sq.m. screening threshold used in the consent application.' : 'Hazardous/process category requires project-specific environmental screening.' },
      { label: 'MPCB Consent to Operate', required: input.pollution !== 'white', ready: false, detail: 'Obtain before trial or commercial production after pollution-control systems are installed.' }
    ];
    return items.filter((item) => item.required);
  }, [input]);
  const ready = requirements.filter((item) => item.ready).length;

  return (
    <ToolShell kicker="Industrial permission pathway" title="Separate factory, planning and environmental approvals." summary="Industrial feasibility is evaluated as a permission chain. MIDC plots follow MIDC CDCPR and BPAMS rather than the municipal UDCPR calculator.">
      <div className="grid xl:grid-cols-[0.9fr_1.1fr]">
        <section className="border-b border-white/10 p-5 sm:p-7 xl:border-b-0 xl:border-r">
          <div className="grid gap-4 sm:grid-cols-2">
            <Toggle label="Plot is inside MIDC industrial area" checked={input.midcPlot} onChange={(v) => set('midcPlot', v)} />
            <Toggle label="Hazardous / MAH process possible" checked={input.hazardous} onChange={(v) => set('hazardous', v)} />
            <Select label="MPCB category" value={input.pollution} onChange={(v) => set('pollution', v)} options={[['white','White'],['green','Green'],['orange','Orange'],['red','Red']]} />
            <NumberInput label="Proposed built-up area" value={input.builtUp} suffix="sq.m." onChange={(v) => set('builtUp', v)} />
            <NumberInput label="Expected workers" value={input.workers} onChange={(v) => set('workers', v)} />
            <Toggle label="Fire NOC identified" checked={input.fireNoc} onChange={(v) => set('fireNoc', v)} />
          </div>
          <h4 className="serif-heading mt-6 text-2xl">Submission readiness</h4>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Toggle label="Allotment / title / possession papers" checked={input.landDocs} onChange={(v) => set('landDocs', v)} />
            <Toggle label="Registered architect appointed" checked={input.architect} onChange={(v) => set('architect', v)} />
            <Toggle label="Manufacturing process note ready" checked={input.processNote} onChange={(v) => set('processNote', v)} />
            <Toggle label="MPCB CTE obtained" checked={input.cte} onChange={(v) => set('cte', v)} />
            <Toggle label="Factory plan approved" checked={input.factoryPlan} onChange={(v) => set('factoryPlan', v)} />
          </div>
        </section>
        <section className="p-5 sm:p-7">
          <p className="engine-kicker text-white/40">Industrial approval map</p>
          <h4 className="serif-heading mt-2 text-3xl">{ready} of {requirements.length} required gates ready</h4>
          <div className="mt-5 grid gap-3">{requirements.map((item) => <Gate key={item.label} item={item} />)}</div>
          <div className="mt-5 border border-amber-300/30 bg-amber-300/10 p-4 text-sm leading-6 text-amber-50"><strong>Numeric MIDC FSI/margins are intentionally not borrowed from UDCPR.</strong> Enter the plot’s current MIDC CDCPR-2023 schedule and allotment conditions during architect verification.</div>
        </section>
      </div>
    </ToolShell>
  );
}

const baseDocuments = [
  'Recent 7/12 extract or property card', 'Measurement / demarcation plan', 'Zoning and DP/RP remarks',
  'Title and search report / lease deed', 'Architect and structural engineer appointments', 'Signed building plans and statements',
  'Site visit report', 'Structural stability documents', 'Applicable NOCs: fire, tree, aviation, highway, irrigation, environment'
];

function SanctionReadiness() {
  const [authority, setAuthority] = useState('pmc');
  const [stage, setStage] = useState('development');
  const [checked, setChecked] = useState({});
  const stageDocuments = {
    development: baseDocuments,
    plinth: ['Development permission / commencement certificate', 'Approved drawings kept at site', 'Appendix F plinth intimation', 'Architect / engineer plinth completion certificates', 'Structural stability certificate', 'Construction photographs'],
    occupancy: ['Latest land record with handover notations', 'Final demarcated layout', 'Completion plans and certified photographs', 'Final fire certificate where applicable', 'Lift certificate where applicable', 'Structural stability and completion certificates', 'MPCB CTE/CTO or white-category undertaking where applicable', 'Rainwater, solar, water and sewerage compliance certificates']
  };
  const docs = stageDocuments[stage];
  const complete = docs.filter((doc) => checked[`${stage}:${doc}`]).length;
  const toggle = (doc) => setChecked((current) => ({ ...current, [`${stage}:${doc}`]: !current[`${stage}:${doc}`] }));
  return (
    <ToolShell kicker="Sanction readiness" title="Track the permission path from title papers to occupancy." summary="This checklist follows UDCPR procedure and the published PMC/PCMC/PMRDA submission stages. The licensed professional remains responsible for the final authority checklist.">
      <div className="grid xl:grid-cols-[0.75fr_1.25fr]">
        <section className="border-b border-white/10 p-5 sm:p-7 xl:border-b-0 xl:border-r">
          <Select label="Authority" value={authority} onChange={setAuthority} options={[['pmc','PMC'],['pcmc','PCMC'],['pmrda','PMRDA'],['midc','MIDC SPA']]} />
          <div className="mt-5 grid gap-2">
            {[['development','Development / commencement'],['plinth','Plinth checking'],['occupancy','Occupancy certificate']].map(([key,label]) => <button key={key} type="button" onClick={() => setStage(key)} className={`engine-tab border text-left ${stage === key ? 'border-gold bg-gold text-white' : 'border-white/10 text-white/55'}`}>{label}</button>)}
          </div>
          <div className="mt-5 border border-white/10 bg-white/[0.03] p-4"><p className="engine-label text-white/40">Progress</p><p className="serif-heading mt-2 text-3xl">{complete} / {docs.length}</p><p className="mt-2 text-xs leading-5 text-white/45">Applications are normally submitted online through the applicable BPMS/AutoDCR portal by a registered architect or licensed professional.</p></div>
        </section>
        <section className="p-5 sm:p-7">
          <p className="engine-kicker text-white/40">{authority.toUpperCase()} · {stage}</p>
          <h4 className="serif-heading mt-2 text-3xl">Document readiness checklist</h4>
          <div className="mt-5 grid gap-3">{docs.map((doc) => <label key={doc} className="flex cursor-pointer items-start gap-3 border border-white/10 bg-white/[0.025] p-4"><input type="checkbox" className="mt-1 h-5 w-5 accent-[#b48a5a]" checked={Boolean(checked[`${stage}:${doc}`])} onChange={() => toggle(doc)} /><span className="text-sm leading-6 text-white/70">{doc}</span></label>)}</div>
          <div className="mt-5 border border-white/10 p-4 text-xs leading-6 text-white/45">Authority-specific additions can include property tax, premium/TDR instruments, road/amenity handover, environment clearance, fire approval, aviation, railway, defence, archaeological, forest, flood-line and utility NOCs.</div>
        </section>
      </div>
    </ToolShell>
  );
}

function ToolShell({ kicker, title, summary, children }) { return <div className="feasibility-engine relative overflow-hidden border border-white/12 bg-[#0f0f0f] text-white"><div className="relative border-b border-white/10 p-5 sm:p-7"><p className="engine-kicker text-gold">{kicker}</p><h3 className="serif-heading mt-2 text-3xl sm:text-4xl">{title}</h3><p className="mt-3 max-w-4xl text-sm leading-6 text-white/55">{summary}</p></div>{children}<p className="relative border-t border-white/10 px-5 py-4 text-xs leading-5 text-white/40">Preliminary planning aid only. Confirm the current regulation, plot conditions, authority circulars and submission checklist with the relevant authority and licensed professionals.</p></div>; }
function Gate({ item }) { const Icon=item.ready?CheckCircle2:TriangleAlert; return <article className="flex gap-3 border border-white/10 bg-white/[0.025] p-4"><Icon className={`mt-0.5 shrink-0 ${item.ready?'text-emerald-300':'text-amber-200'}`} size={18}/><div><h5 className="font-semibold">{item.label}</h5><p className="mt-1 text-xs leading-5 text-white/50">{item.detail}</p></div></article>; }
function Toggle({ label, checked, onChange }) { return <label className="engine-field flex cursor-pointer items-start justify-between gap-4"><span className="text-sm leading-5 text-white/70">{label}</span><input type="checkbox" checked={checked} onChange={(e)=>onChange(e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-[#b48a5a]"/></label>; }
function Select({ label, value, onChange, options }) { return <label className="engine-field block"><span className="engine-label text-white/50">{label}</span><select value={value} onChange={(e)=>onChange(e.target.value)} className="mt-2 w-full border border-white/15 bg-[#171717] px-3 py-3 text-white outline-none">{options.map(([key,text])=><option key={key} value={key}>{text}</option>)}</select></label>; }
function NumberInput({ label, value, suffix, onChange }) { return <label className="engine-field block"><span className="engine-label text-white/50">{label}</span><span className="mt-2 flex border border-white/15 bg-black/20"><input type="number" min="0" value={value} onChange={(e)=>onChange(Number(e.target.value))} className="min-w-0 flex-1 bg-transparent px-3 py-3 outline-none"/>{suffix&&<span className="self-center pr-3 text-xs text-white/40">{suffix}</span>}</span></label>; }
