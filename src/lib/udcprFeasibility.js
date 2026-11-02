const round = (value, digits = 2) => Number(value.toFixed(digits));
const ceil = (value) => Math.ceil(Math.max(0, value));

export const AUTHORITIES = {
  pmc_pcmc: { label: 'PMC / PCMC', group: 'municipal', parkingFactor: 1, clause: 'Table 8-C, Sr. 1' },
  other_municipal: { label: 'Other Municipal Corporation', group: 'municipal', parkingFactor: 0.7, clause: 'Table 8-C, Sr. 4 (default; confirm class)' },
  pmrda: { label: 'PMRDA / Metropolitan Authority', group: 'remaining', parkingFactor: 0.7, clause: 'Table 8-C, Sr. 4' },
  regional: { label: 'Regional Plan / Nagar Panchayat', group: 'remaining', parkingFactor: 0.4, clause: 'Table 8-C, Sr. 8' }
};

export const OCCUPANCIES = {
  residential: { label: 'Multi-family residential' },
  mixed: { label: 'Residential with mixed use' },
  office: { label: 'Office / business' },
  commercial: { label: 'Mercantile / shops' }
};

function fsiBand(roadWidth, congested, group) {
  if (congested) {
    if (roadWidth < 9) return { base: 1.5, premium: 0, tdr: 0, max: 1.5, band: 'Below 9 m' };
    if (roadWidth < 18) return group === 'municipal'
      ? { base: 2, premium: 0.3, tdr: 0.3, max: 2.6, band: '9 m to below 18 m' }
      : { base: 2, premium: 0.3, tdr: 0.1, max: 2.4, band: '9 m to below 18 m' };
    if (roadWidth < 30) return group === 'municipal'
      ? { base: 2, premium: 0.3, tdr: 0.5, max: 2.8, band: '18 m to below 30 m' }
      : { base: 2, premium: 0.3, tdr: 0.2, max: 2.5, band: '18 m to below 30 m' };
    return group === 'municipal'
      ? { base: 2, premium: 0.3, tdr: 0.7, max: 3, band: '30 m and above' }
      : { base: 2, premium: 0.3, tdr: 0.2, max: 2.5, band: '30 m and above' };
  }

  if (roadWidth < 9) return { base: 1.1, premium: 0, tdr: 0, max: 1.1, band: 'Below 9 m' };
  const municipal = group === 'municipal';
  if (roadWidth < 12) return municipal
    ? { base: 1.1, premium: 0.5, tdr: 0.4, max: 2, band: '9 m to below 12 m' }
    : { base: 1.1, premium: 0.3, tdr: 0.3, max: 1.7, band: '9 m to below 12 m' };
  if (roadWidth < 15) return municipal
    ? { base: 1.1, premium: 0.5, tdr: 0.65, max: 2.25, band: '12 m to below 15 m' }
    : { base: 1.1, premium: 0.3, tdr: 0.6, max: 2, band: '12 m to below 15 m' };
  if (roadWidth < 24) return municipal
    ? { base: 1.1, premium: 0.5, tdr: 0.9, max: 2.5, band: '15 m to below 24 m' }
    : { base: 1.1, premium: 0.3, tdr: 0.7, max: 2.1, band: '15 m to below 24 m' };
  if (roadWidth < 30) return municipal
    ? { base: 1.1, premium: 0.5, tdr: 1.15, max: 2.75, band: '24 m to below 30 m' }
    : { base: 1.1, premium: 0.3, tdr: 0.9, max: 2.3, band: '24 m to below 30 m' };
  return municipal
    ? { base: 1.1, premium: 0.5, tdr: 1.4, max: 3, band: '30 m and above' }
    : { base: 1.1, premium: 0.3, tdr: 1.1, max: 2.5, band: '30 m and above' };
}

function margins({ roadWidth, plotArea, plotWidth, height, congested, mixedUse, authorityGroup, occupancy }) {
  if (congested) {
    const front = roadWidth < 4.5 ? null : roadWidth < 6 ? (mixedUse ? 1.5 : 0) : roadWidth < 12 ? (mixedUse ? 2 : 1) : (mixedUse ? 2.5 : 2);
    let sideRear = plotArea <= 1000 ? 0 : plotArea <= 4000 ? 1 : null;
    if (height >= 15 && height < 24 && sideRear !== null) sideRear += 1;
    if (height >= 24) sideRear = Math.min(12, height / 5);
    return { front, side: sideRear, rear: sideRear, minPlot: 0, minWidth: 0, heightLimit: height < 24 ? 24 : null, clause: 'Reg. 6.1.1, Tables 6-B and 6-C', manual: front === null || sideRear === null };
  }

  let row;
  if (roadWidth >= 30) row = { minPlot: 450, minWidth: 15, front: authorityGroup === 'municipal' ? 6 : 4.5, side: 3, rear: 3, heightLimit: 15 };
  else if (roadWidth >= 18) row = { minPlot: 250, minWidth: 10, front: 4.5, side: 2, rear: 2, heightLimit: 10 };
  else if (roadWidth >= 15) row = { minPlot: 200, minWidth: 10, front: 3, side: 1.5, rear: 1.5, heightLimit: 10.5 };
  else row = { minPlot: 80, minWidth: 6, front: 3, side: 1.5, rear: 1.5, heightLimit: 10.5 };

  if (height > row.heightLimit) row.side = row.rear = Math.min(12, height / 5);
  return { ...row, clause: height > row.heightLimit ? 'Table 6-D + Reg. 6.2.3(b), H/5' : 'Table 6-D', manual: occupancy === 'office' || occupancy === 'commercial' };
}

function parking({ occupancy, carpetArea, tenements, avgUnitCarpet, congested, authority }) {
  let cars = 0;
  let scooters = 0;
  let note = '';
  if (occupancy === 'residential' || occupancy === 'mixed') {
    const units = Math.max(0, tenements);
    if (avgUnitCarpet >= 150) { cars = units * 2; scooters = units; }
    else if (avgUnitCarpet >= 80) { cars = units; scooters = units; }
    else if (avgUnitCarpet >= 40) { cars = units / 2; scooters = units; }
    else if (avgUnitCarpet > 30) { cars = units / 2; scooters = units / 2; }
    else { cars = 0; scooters = units; }
    cars *= 1.05;
    scooters *= 1.05;
    note = 'Includes 5% visitor parking; final fractions are rounded up.';
  } else if (occupancy === 'office') {
    cars = (carpetArea / 200) * 3;
    scooters = (carpetArea / 200) * 11;
  } else {
    cars = carpetArea / 100;
    scooters = (carpetArea / 100) * 6;
  }
  const factor = AUTHORITIES[authority].parkingFactor;
  return { cars: ceil(cars * factor), scooters: ceil(scooters), factor, note, clause: `Tables 8-B and 8-C; ${AUTHORITIES[authority].clause}` };
}

export function calculateUdcpr(input) {
  const authority = AUTHORITIES[input.authority];
  const fsi = fsiBand(input.roadWidth, input.congested, authority.group);
  const selectedFsi = round(fsi.base + (input.includePremium ? fsi.premium : 0) + (input.includeTdr ? fsi.tdr : 0));
  const permissibleBuiltUp = round(input.plotArea * selectedFsi, 0);
  const proposedFsi = round(input.proposedBuiltUp / Math.max(input.plotArea, 1));
  const margin = margins({ ...input, authorityGroup: authority.group, mixedUse: input.occupancy === 'mixed' });
  const recreationalOpenSpace = input.plotArea >= 4000 ? round(input.plotArea * 0.1, 0) : 0;
  const carpetArea = input.proposedBuiltUp * 0.7;
  const parkingResult = parking({ ...input, carpetArea });
  const checks = [
    { label: 'Proposed FSI', status: proposedFsi <= selectedFsi ? 'pass' : 'fail', value: `${proposedFsi} / ${selectedFsi}`, clause: input.congested ? 'Table 6-A' : 'Table 6-G', detail: proposedFsi <= selectedFsi ? 'Within selected FSI potential.' : `Reduce proposed built-up by about ${Math.ceil(input.proposedBuiltUp - permissibleBuiltUp)} sq.m. or review permissible loading.` },
    { label: 'Plot area', status: input.plotArea >= margin.minPlot ? 'pass' : 'fail', value: `${input.plotArea} / ${margin.minPlot || 'case-specific'} sq.m.`, clause: margin.clause, detail: input.plotArea >= margin.minPlot ? 'Meets the preliminary minimum.' : 'Below the table minimum for this road band.' },
    { label: 'Plot width', status: input.plotWidth >= margin.minWidth ? 'pass' : 'fail', value: `${input.plotWidth} / ${margin.minWidth || 'case-specific'} m`, clause: margin.clause, detail: input.plotWidth >= margin.minWidth ? 'Meets the preliminary minimum.' : 'Increase frontage or seek a plot-specific review.' },
    { label: 'Front margin', status: margin.front === null ? 'review' : input.frontMargin >= margin.front ? 'pass' : 'fail', value: `${input.frontMargin} / ${margin.front ?? 'manual'} m`, clause: margin.clause, detail: margin.front === null ? 'Road-centre or special rule must be checked.' : input.frontMargin >= margin.front ? 'Meets the calculated minimum.' : `Increase by at least ${round(margin.front - input.frontMargin)} m.` },
    { label: 'Side margin', status: margin.manual ? 'review' : input.sideMargin >= margin.side ? 'pass' : 'fail', value: `${input.sideMargin} / ${margin.side ?? 'manual'} m`, clause: margin.clause, detail: margin.manual ? 'Non-residential/special-building provisions require Table 6-E review.' : input.sideMargin >= margin.side ? 'Meets the calculated minimum.' : `Increase by at least ${round(margin.side - input.sideMargin)} m.` },
    { label: 'Rear margin', status: margin.manual ? 'review' : input.rearMargin >= margin.rear ? 'pass' : 'fail', value: `${input.rearMargin} / ${margin.rear ?? 'manual'} m`, clause: margin.clause, detail: margin.manual ? 'Non-residential/special-building provisions require Table 6-E review.' : input.rearMargin >= margin.rear ? 'Meets the calculated minimum.' : `Increase by at least ${round(margin.rear - input.rearMargin)} m.` },
    { label: 'Recreational open space', status: recreationalOpenSpace ? 'review' : 'pass', value: recreationalOpenSpace ? `${recreationalOpenSpace} sq.m. required` : 'Not triggered by area', clause: 'Reg. 3.4.1', detail: recreationalOpenSpace ? 'Reserve at least 10% and verify original-holding and layout conditions.' : 'The 0.4 ha general threshold is not reached; group housing/campus and special cases still require review.' }
  ];
  const failed = checks.filter((check) => check.status === 'fail').length;
  const review = checks.filter((check) => check.status === 'review').length;
  return {
    fsi: { ...fsi, selected: selectedFsi, proposed: proposedFsi, permissibleBuiltUp },
    margin,
    parking: parkingResult,
    recreationalOpenSpace,
    checks,
    status: failed ? 'Changes required' : review ? 'Conditional review' : 'Preliminary fit',
    failed,
    review
  };
}
