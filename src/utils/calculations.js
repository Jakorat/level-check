// ─── Constants ────────────────────────────────────────────────────────────────

export const DITRA_THICK     = 0.125;    // 1/8"
export const DITRA_XL_THICK  = 0.3125;  // 5/16"
export const DITRA_HEAT_THICK = 0.25;   // 1/4"

export const MORTAR_BY_SIZE = {
  small: 0.09375,  // 3/32" — mosaic / subway
  med:   0.1875,   // 3/16" — 12–18"
  large: 0.25,     // 1/4"  — 18–24"
  xl:    0.375,    // 3/8"  — large format >24"
}

export const SUBFLOOR_DITRA_OK = {
  'plywood-3/4': true,
  'plywood-5/8': true,
  'osb-3/4':     true,
  'osb-7/16':    false,
  'concrete':    true,
  'plank':       false,
}

export const MEMBRANE_OPTIONS = [
  { value: 'none',       label: 'None (direct to subfloor)',    thick: 0 },
  { value: 'ditra',      label: 'Schluter DITRA (1/8" / 3mm)', thick: DITRA_THICK },
  { value: 'ditra-xl',   label: 'Schluter DITRA-XL (5/16" / 8mm)', thick: DITRA_XL_THICK },
  { value: 'ditra-heat', label: 'DITRA-HEAT (1/4" / 6mm)',     thick: DITRA_HEAT_THICK },
  { value: 'cbu-1/4',    label: 'CBU / Hardibacker 1/4"',      thick: 0.25 },
  { value: 'cbu-1/2',    label: 'CBU / Hardibacker 1/2"',      thick: 0.5 },
  { value: 'custom',     label: 'Custom...',                    thick: null },
]

export const DEFAULT_LIBRARY = [
  { id: 1,  name: 'Solid Hardwood 3/4"',    cat: 'hardwood',  thick: 0.75,    notes: 'Standard nail-down' },
  { id: 2,  name: 'Engineered HW 1/2"',     cat: 'hardwood',  thick: 0.5,     notes: 'Floating or glue-down' },
  { id: 3,  name: 'Engineered HW 5/8"',     cat: 'hardwood',  thick: 0.625,   notes: '' },
  { id: 4,  name: 'Solid Hardwood 33/32"',  cat: 'hardwood',  thick: 1.03125, notes: 'Heavy plank' },
  { id: 5,  name: 'LVP 4.8mm',              cat: 'lvp',       thick: 0.1875,  notes: 'Thin click-lock' },
  { id: 6,  name: 'LVP 6mm',                cat: 'lvp',       thick: 0.25,    notes: 'Standard click-lock' },
  { id: 7,  name: 'LVP 8mm',                cat: 'lvp',       thick: 0.3125,  notes: 'Premium click-lock' },
  { id: 8,  name: 'Laminate 8mm',           cat: 'lvp',       thick: 0.3125,  notes: '' },
  { id: 9,  name: 'Porcelain Tile 10mm',    cat: 'tile',      thick: 0.375,   notes: 'Standard porcelain' },
  { id: 10, name: 'Ceramic Tile 8mm',       cat: 'tile',      thick: 0.3125,  notes: '' },
  { id: 11, name: 'Natural Stone 12mm',     cat: 'tile',      thick: 0.5,     notes: 'Travertine, marble, slate' },
  { id: 12, name: 'Large Format Tile 11mm', cat: 'tile',      thick: 0.4375,  notes: '>18" format' },
  { id: 13, name: 'DITRA',                  cat: 'membrane',  thick: 0.125,   notes: 'Schluter uncoupling membrane' },
  { id: 14, name: 'DITRA-XL',              cat: 'membrane',  thick: 0.3125,  notes: 'Schluter thick uncoupling' },
  { id: 15, name: 'DITRA-HEAT',            cat: 'membrane',  thick: 0.25,    notes: 'With radiant heat channels' },
  { id: 16, name: 'CBU 1/4"',              cat: 'membrane',  thick: 0.25,    notes: 'Hardibacker cement board' },
  { id: 17, name: 'CBU 1/2"',              cat: 'membrane',  thick: 0.5,     notes: '' },
  { id: 18, name: 'Thinset Standard',       cat: 'mortar',    thick: 0.09375, notes: '3/32" avg compressed' },
  { id: 19, name: 'Thinset Medium-bed',     cat: 'mortar',    thick: 0.1875,  notes: '3/16" avg' },
  { id: 20, name: 'Thinset Large-format',   cat: 'mortar',    thick: 0.375,   notes: '3/8" for tiles >18"' },
  { id: 21, name: 'Plywood 3/4"',          cat: 'subfloor',  thick: 0.75,    notes: 'Preferred subfloor for tile' },
  { id: 22, name: 'Plywood 5/8"',          cat: 'subfloor',  thick: 0.625,   notes: '' },
  { id: 23, name: 'OSB 3/4"',              cat: 'subfloor',  thick: 0.75,    notes: 'Acceptable with membrane' },
  { id: 24, name: 'OSB 7/16"',             cat: 'subfloor',  thick: 0.4375,  notes: 'Too thin for direct tile' },
  { id: 25, name: 'Foam Pad 1/16"',        cat: 'membrane',  thick: 0.0625,  notes: 'LVP underlayment' },
  { id: 26, name: 'Foam Pad 1/8"',         cat: 'membrane',  thick: 0.125,   notes: 'Premium LVP underlayment' },
]

// ─── Fraction display ─────────────────────────────────────────────────────────

const FRACS = [
  [1,32],[1,16],[3,32],[1,8],[3,16],[1,4],[5,16],[3,8],[7,16],
  [1,2],[9,16],[5,8],[11,16],[3,4],[13,16],[7,8],[15,16],[1,1],
]

export function toFrac(dec) {
  if (dec == null || isNaN(dec)) return '0'
  if (dec === 0) return '0'
  const whole = Math.floor(dec)
  const frac  = dec - whole
  if (frac < 0.01) return whole.toString()

  let best = FRACS[0], bestDiff = 99
  for (const [n, d] of FRACS) {
    const diff = Math.abs(frac - n / d)
    if (diff < bestDiff) { bestDiff = diff; best = [n, d] }
  }
  const [n, d] = best
  if (n === d) return (whole + 1).toString()
  if (bestDiff > 0.02) return dec.toFixed(3)
  return whole ? `${whole} ${n}/${d}` : `${n}/${d}`
}

export function toMM(inches) {
  return (inches * 25.4).toFixed(1)
}

// ─── Side A thickness ─────────────────────────────────────────────────────────

export function calcSideA(config) {
  const { typeA, hwThick, hwCustom, hwInstall, hwFinish, customA } = config

  if (['hardwood', 'engineered', 'laminate'].includes(typeA)) {
    const hw  = hwThick === 'custom' ? (parseFloat(hwCustom) || 0.75) : parseFloat(hwThick)
    const pad = hwInstall === 'float' ? 0.118 : 0
    const fin = parseFloat(hwFinish) || 0
    return {
      total: hw + pad + fin,
      layers: [
        ...(pad > 0 ? [{ name: 'Float Pad', thick: pad, color: 'var(--pad-color)' }] : []),
        { name: typeA === 'laminate' ? 'Laminate' : 'Hardwood', thick: hw, color: 'var(--hardwood-color)' },
        ...(fin > 0 ? [{ name: 'Finish', thick: fin, color: 'rgba(220,160,90,0.8)' }] : []),
      ],
      label: typeA === 'laminate' ? 'Laminate' : typeA === 'engineered' ? 'Engineered HW' : 'Solid Hardwood',
    }
  }

  const val = parseFloat(customA) || 0.75
  const labels = { lvp: 'LVP', 'existing-tile': 'Existing Tile', concrete: 'Concrete', custom: 'Custom' }
  return {
    total: val,
    layers: [{ name: labels[typeA] || 'Floor', thick: val, color: 'var(--hardwood-color)' }],
    label: labels[typeA] || 'Custom',
  }
}

// ─── Side B thickness ─────────────────────────────────────────────────────────

export function calcSideB(config) {
  const {
    typeB, tileSize, tileThick, tileCustom, mortarType,
    membrane, memCustom, lvpThick, lvpPad, customB,
  } = config

  if (typeB === 'custom') {
    const val = parseFloat(customB) || 0.75
    return {
      total: val,
      tile: val, mortar: 0, mem: 0, memName: '',
      layers: [{ name: 'Custom', thick: val, color: 'var(--tile-color)' }],
      label: 'Custom',
    }
  }

  if (typeB === 'lvp') {
    const t = parseFloat(lvpThick) || 0.25
    const p = parseFloat(lvpPad) || 0
    return {
      total: t + p,
      tile: t, mortar: 0, mem: p, memName: p > 0 ? 'Pad' : '',
      layers: [
        ...(p > 0 ? [{ name: 'LVP Pad', thick: p, color: 'var(--pad-color)' }] : []),
        { name: 'LVP', thick: t, color: 'var(--tile-color)' },
      ],
      label: 'LVP',
    }
  }

  // tile / stone / hardwood (side B)
  const tileT = tileThick === 'custom' ? (parseFloat(tileCustom) || 0.375) : parseFloat(tileThick)

  const mortarT = mortarType === 'auto'
    ? MORTAR_BY_SIZE[tileSize]
    : mortarType === 'thin'  ? 0.09375
    : mortarType === 'med'   ? 0.1875
    : 0.375

  const memOpt = MEMBRANE_OPTIONS.find(m => m.value === membrane) || MEMBRANE_OPTIONS[0]
  const memT   = membrane === 'custom' ? (parseFloat(memCustom) || 0.125) : (memOpt.thick || 0)
  const memName = memOpt.value === 'custom' ? 'Custom Mem' : memOpt.label.split(' ')[1] || memOpt.label

  const layers = []
  if (memT > 0) layers.push({ name: memName, thick: memT, color: 'var(--ditra-color)' })
  if (mortarT > 0) layers.push({ name: 'Mortar', thick: mortarT, color: 'var(--mortar-color)' })
  layers.push({ name: typeB === 'stone' ? 'Stone' : 'Tile', thick: tileT, color: 'var(--tile-color)' })

  return {
    total: tileT + mortarT + memT,
    tile: tileT, mortar: mortarT, mem: memT, memName,
    layers,
    label: typeB === 'stone' ? 'Natural Stone' : 'Tile',
  }
}

// ─── Recommendation engine ────────────────────────────────────────────────────

export function getRecommendation({ sideA, sideB, config, subfloorOk, lippage, tolerance }) {
  const { typeB, membrane, radiant, wetArea } = config
  const isTile = ['tile', 'stone'].includes(typeB)

  const gap = sideA.total - sideB.total // + means B is lower

  const result = {
    ok: Math.abs(gap) <= tolerance,
    statusLabel: '',
    statusDetail: '',
    adjustments: [],
    warnings: [],
  }

  if (!subfloorOk) {
    result.warnings.push('Subfloor issues must be resolved before membrane or tile installation.')
  }

  if (result.ok) {
    result.statusLabel = 'Within tolerance'
    result.statusDetail = `Lippage ${toFrac(lippage)}" is within your ${toFrac(tolerance)}" limit. ✓`
    if (radiant && membrane !== 'ditra-heat') {
      result.adjustments.push('For radiant heat under tile, consider switching to DITRA-HEAT for integrated cable channels.')
    }
    return result
  }

  if (!isTile) {
    result.statusLabel = gap > 0 ? 'Side B needs to come up' : 'Side B is too high'
    result.statusDetail = `${toFrac(lippage)}" lippage exceeds ${toFrac(tolerance)}" tolerance.`
    if (gap > 0) {
      result.adjustments.push(`Add ${toFrac(gap)}" underlayment or build-up to Side B.`)
    } else {
      result.adjustments.push(`Reduce Side B height by ${toFrac(Math.abs(gap))}" or use a reducer strip.`)
    }
    return result
  }

  // Tile-specific logic
  if (gap > 0) {
    result.statusLabel = 'Side B needs to come up'
    result.statusDetail = `Side B is ${toFrac(gap)}" below Side A. Need more build-up.`

    // Test what DITRA and DITRA-XL would do
    const withDitra   = sideB.tile + sideB.mortar + DITRA_THICK
    const withDitraXL = sideB.tile + sideB.mortar + DITRA_XL_THICK
    const gapDitra    = Math.abs(sideA.total - withDitra)
    const gapDitraXL  = Math.abs(sideA.total - withDitraXL)

    if (gapDitra <= tolerance && membrane !== 'ditra') {
      result.adjustments.push(`Switch to DITRA (1/8") → lippage becomes ${toFrac(gapDitra)}". ✓`)
    }
    if (gapDitraXL <= tolerance && membrane !== 'ditra-xl') {
      result.adjustments.push(`Switch to DITRA-XL (5/16") → lippage becomes ${toFrac(gapDitraXL)}". ✓`)
    }
    if (gapDitra > tolerance && gapDitraXL > tolerance) {
      const needed = sideA.total - sideB.tile - sideB.mortar
      result.adjustments.push(`Membrane needed: ${toFrac(needed)}" — consider self-leveling compound + CBU build-up.`)
      result.adjustments.push(`A floor reducer transition strip can bridge up to 1/2" difference.`)
    }
  } else {
    result.statusLabel = 'Side B is too high'
    result.statusDetail = `Side B is ${toFrac(Math.abs(gap))}" above Side A.`
    result.adjustments.push('Use thinner tile, reduce mortar bed, or remove a membrane layer.')
    if (membrane === 'ditra-xl') {
      const withDitra = sideB.tile + sideB.mortar + DITRA_THICK
      const gapDitra  = Math.abs(sideA.total - withDitra)
      if (gapDitra <= tolerance) {
        result.adjustments.push(`Downgrade from DITRA-XL to DITRA → lippage becomes ${toFrac(gapDitra)}". ✓`)
      }
    }
    if (Math.abs(gap) <= 0.25) {
      result.adjustments.push('A reducer transition strip may resolve this difference.')
    }
  }

  if (radiant && membrane !== 'ditra-heat') {
    result.adjustments.push('Radiant heat: DITRA-HEAT (1/4") includes cable channels — factor into build-up.')
  }
  if (wetArea) {
    result.adjustments.push('Wet area: Apply Schluter Kerdi-Band at all DITRA seams and wall transitions.')
  }

  return result
}

// ─── Subfloor issue analysis ──────────────────────────────────────────────────

export function getSubfloorIssues({ subfloor, deflect, unlevel, radiant, wetArea, membrane }) {
  const issues = []

  if (subfloor === 'plank') {
    issues.push({ type: 'warn', text: 'Plank subfloors require a full layer of 3/4" plywood before DITRA. Planks lack stiffness and will cause tile cracking.' })
  }
  if (subfloor === 'osb-7/16') {
    issues.push({ type: 'warn', text: 'OSB 7/16" is too thin for tile. Add 1/4"–1/2" plywood or upgrade to 3/4" OSB before tiling.' })
  }
  if (subfloor === 'osb-3/4') {
    issues.push({ type: 'info', text: 'OSB 3/4" is acceptable under DITRA, but plywood is preferred. Ensure no swelling or soft spots.' })
  }
  if (deflect) {
    issues.push({ type: 'warn', text: 'Deflecting subfloor detected. DITRA alone won\'t solve movement — reinforce joists or add subfloor layers first.' })
  }
  if (unlevel) {
    issues.push({ type: 'warn', text: 'Subfloor not flat: Self-leveling compound required before membrane. DITRA does not bridge large voids.' })
  }
  if (subfloor === 'plank') {
    issues.push({ type: 'info', text: 'Plank subfloors may have height variation at seams — inspect for soft spots and secure all planks.' })
  }
  if (radiant && membrane !== 'ditra-heat') {
    issues.push({ type: 'info', text: 'Radiant heat detected: DITRA-HEAT is the optimal membrane with integrated heating cable channels.' })
  }
  if (wetArea && membrane === 'none') {
    issues.push({ type: 'warn', text: 'Wet area with no membrane: A waterproofing layer is strongly recommended before tiling.' })
  }

  return issues
}
