// ─── Constants ────────────────────────────────────────────────────────────────

export const DITRA_THICK      = 0.125
export const DITRA_XL_THICK   = 0.3125
export const DITRA_HEAT_THICK = 0.25

export const MORTAR_BY_SIZE = {
  small: 0.09375,
  med:   0.1875,
  large: 0.25,
  xl:    0.375,
}

export const SUBFLOOR_DITRA_OK = {
  'plywood-3/4': true,
  'plywood-5/8': true,
  'plywood-1/2': true,
  'plywood-1/4': true,
  'osb-3/4':     true,
  'osb-7/16':    false,
  'concrete':    true,
  'plank':       false,
  'none':        true,
}

export const SUBFLOOR_OPTIONS = [
  { value: 'plywood-3/4', label: 'Plywood 3/4"',               thick: 0.75 },
  { value: 'plywood-5/8', label: 'Plywood 5/8"',               thick: 0.625 },
  { value: 'plywood-1/2', label: 'Plywood 1/2"',               thick: 0.5 },
  { value: 'plywood-1/4', label: 'Plywood 1/4" (underlayment)',thick: 0.25 },
  { value: 'osb-3/4',     label: 'OSB 3/4"',                   thick: 0.75 },
  { value: 'osb-7/16',    label: 'OSB 7/16" (thin)',           thick: 0.4375 },
  { value: 'concrete',    label: 'Concrete Slab',               thick: 0 },
  { value: 'plank',       label: 'Plank (old construction)',    thick: 0.75 },
  { value: 'none',        label: 'Not included / N/A',          thick: 0 },
]

export const MEMBRANE_OPTIONS = [
  { value: 'none',       label: 'None (direct to subfloor)',        thick: 0 },
  { value: 'ditra',      label: 'Schluter DITRA (1/8" / 3mm)',      thick: DITRA_THICK },
  { value: 'ditra-xl',   label: 'Schluter DITRA-XL (5/16" / 8mm)', thick: DITRA_XL_THICK },
  { value: 'ditra-heat', label: 'DITRA-HEAT (1/4" / 6mm)',          thick: DITRA_HEAT_THICK },
  { value: 'cbu-1/4',   label: 'CBU / Hardibacker 1/4"',           thick: 0.25 },
  { value: 'cbu-1/2',   label: 'CBU / Hardibacker 1/2"',           thick: 0.5 },
  { value: 'custom',     label: 'Custom...',                         thick: null },
]

// ─── Quick-add layer presets ──────────────────────────────────────────────────

export const LAYER_PRESETS = [
  { id: 'ply-3/4',    name: 'Plywood 3/4"',       thick: 0.75,    color: 'var(--subfloor-color)', cat: 'Build-up' },
  { id: 'ply-1/2',    name: 'Plywood 1/2"',       thick: 0.5,     color: 'var(--subfloor-color)', cat: 'Build-up' },
  { id: 'ply-1/4',    name: 'Plywood 1/4"',       thick: 0.25,    color: 'var(--subfloor-color)', cat: 'Build-up' },
  { id: 'osb-3/4',    name: 'OSB 3/4"',           thick: 0.75,    color: 'var(--subfloor-color)', cat: 'Build-up' },
  { id: 'sl-1/8',     name: 'Self-leveler 1/8"',  thick: 0.125,   color: '#7a90a0',               cat: 'Build-up' },
  { id: 'sl-1/4',     name: 'Self-leveler 1/4"',  thick: 0.25,    color: '#7a90a0',               cat: 'Build-up' },
  { id: 'ditra',      name: 'DITRA',               thick: 0.125,   color: 'var(--ditra-color)',    cat: 'Membrane' },
  { id: 'ditra-xl',   name: 'DITRA-XL',            thick: 0.3125,  color: 'var(--ditra-color)',    cat: 'Membrane' },
  { id: 'ditra-heat', name: 'DITRA-HEAT',          thick: 0.25,    color: 'var(--ditra-color)',    cat: 'Membrane' },
  { id: 'cbu-1/4',   name: 'CBU 1/4"',            thick: 0.25,    color: '#9aaa88',               cat: 'Membrane' },
  { id: 'cbu-1/2',   name: 'CBU 1/2"',            thick: 0.5,     color: '#9aaa88',               cat: 'Membrane' },
  { id: 'pad-1/16',  name: 'Foam Pad 1/16"',      thick: 0.0625,  color: 'var(--pad-color)',      cat: 'Membrane' },
  { id: 'pad-1/8',   name: 'Foam Pad 1/8"',       thick: 0.125,   color: 'var(--pad-color)',      cat: 'Membrane' },
  { id: 'mortar-th', name: 'Thinset 3/32"',       thick: 0.09375, color: 'var(--mortar-color)',   cat: 'Mortar' },
  { id: 'mortar-md', name: 'Medium-bed 3/16"',    thick: 0.1875,  color: 'var(--mortar-color)',   cat: 'Mortar' },
  { id: 'mortar-lg', name: 'Large-format 3/8"',   thick: 0.375,   color: 'var(--mortar-color)',   cat: 'Mortar' },
  { id: 'custom',    name: 'Custom...',            thick: null,    color: 'var(--muted)',          cat: 'Custom' },
]

// ─── Default library ──────────────────────────────────────────────────────────

export const DEFAULT_LIBRARY = [
  { id: 1,  name: 'Solid Hardwood 3/4"',    cat: 'hardwood', thick: 0.75,    notes: 'Standard nail-down' },
  { id: 2,  name: 'Engineered HW 1/2"',     cat: 'hardwood', thick: 0.5,     notes: 'Floating or glue-down' },
  { id: 3,  name: 'Engineered HW 5/8"',     cat: 'hardwood', thick: 0.625,   notes: '' },
  { id: 4,  name: 'Solid Hardwood 33/32"',  cat: 'hardwood', thick: 1.03125, notes: 'Heavy plank' },
  { id: 5,  name: 'LVP 4.8mm',              cat: 'lvp',      thick: 0.1875,  notes: 'Thin click-lock' },
  { id: 6,  name: 'LVP 6mm',               cat: 'lvp',      thick: 0.25,    notes: 'Standard' },
  { id: 7,  name: 'LVP 8mm',               cat: 'lvp',      thick: 0.3125,  notes: 'Premium' },
  { id: 8,  name: 'Laminate 8mm',          cat: 'lvp',      thick: 0.3125,  notes: '' },
  { id: 9,  name: 'Porcelain Tile 10mm',   cat: 'tile',     thick: 0.375,   notes: 'Standard porcelain' },
  { id: 10, name: 'Ceramic Tile 8mm',      cat: 'tile',     thick: 0.3125,  notes: '' },
  { id: 11, name: 'Natural Stone 12mm',    cat: 'tile',     thick: 0.5,     notes: 'Travertine, marble, slate' },
  { id: 12, name: 'Large Format Tile 11mm',cat: 'tile',     thick: 0.4375,  notes: '>18" format' },
  { id: 13, name: 'DITRA',                 cat: 'membrane', thick: 0.125,   notes: 'Schluter uncoupling' },
  { id: 14, name: 'DITRA-XL',             cat: 'membrane', thick: 0.3125,  notes: 'Schluter thick uncoupling' },
  { id: 15, name: 'DITRA-HEAT',           cat: 'membrane', thick: 0.25,    notes: 'Radiant heat channels' },
  { id: 16, name: 'CBU 1/4"',            cat: 'membrane', thick: 0.25,    notes: 'Hardibacker' },
  { id: 17, name: 'CBU 1/2"',            cat: 'membrane', thick: 0.5,     notes: '' },
  { id: 18, name: 'Thinset Standard',     cat: 'mortar',   thick: 0.09375, notes: '3/32" avg' },
  { id: 19, name: 'Thinset Medium-bed',   cat: 'mortar',   thick: 0.1875,  notes: '3/16" avg' },
  { id: 20, name: 'Thinset Large-format', cat: 'mortar',   thick: 0.375,   notes: '3/8" for >18" tile' },
  { id: 21, name: 'Plywood 3/4"',        cat: 'subfloor', thick: 0.75,    notes: 'Preferred for tile' },
  { id: 22, name: 'Plywood 5/8"',        cat: 'subfloor', thick: 0.625,   notes: '' },
  { id: 23, name: 'Plywood 1/2"',        cat: 'subfloor', thick: 0.5,     notes: 'Common underlayment' },
  { id: 24, name: 'Plywood 1/4"',        cat: 'subfloor', thick: 0.25,    notes: 'Thin underlayment' },
  { id: 25, name: 'OSB 3/4"',            cat: 'subfloor', thick: 0.75,    notes: 'Acceptable with membrane' },
  { id: 26, name: 'OSB 7/16"',           cat: 'subfloor', thick: 0.4375,  notes: 'Too thin for direct tile' },
  { id: 27, name: 'Self-Leveler 1/8"',   cat: 'subfloor', thick: 0.125,   notes: 'Thin pour' },
  { id: 28, name: 'Self-Leveler 1/4"',   cat: 'subfloor', thick: 0.25,    notes: 'Standard pour' },
  { id: 29, name: 'Foam Pad 1/16"',      cat: 'membrane', thick: 0.0625,  notes: 'LVP underlayment' },
  { id: 30, name: 'Foam Pad 1/8"',       cat: 'membrane', thick: 0.125,   notes: 'Premium LVP underlayment' },
]

// ─── Fraction helpers ─────────────────────────────────────────────────────────

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

// ─── Extra layers total ───────────────────────────────────────────────────────

export function extraLayersTotal(extraLayers) {
  return (extraLayers || []).reduce((sum, el) => {
    const t = el.thick === null ? (parseFloat(el.customThick) || 0) : el.thick
    return sum + t
  }, 0)
}

// ─── Build diagram layer list (extra + main stacked) ─────────────────────────

export function buildAllLayers(mainLayers, extraLayers) {
  const result = []
  for (const el of (extraLayers || [])) {
    const t = el.thick === null ? (parseFloat(el.customThick) || 0) : el.thick
    if (t > 0) result.push({ name: el.name, thick: t, color: el.color || 'var(--muted)' })
  }
  for (const ml of (mainLayers || [])) result.push(ml)
  return result
}

// ─── Side A ───────────────────────────────────────────────────────────────────

export function calcSideA(config) {
  const { typeA, hwThick, hwCustom, hwInstall, hwFinish, customA, extraLayersA } = config

  let mainTotal, mainLayers, label

  if (['hardwood', 'engineered', 'laminate'].includes(typeA)) {
    const hw  = hwThick === 'custom' ? (parseFloat(hwCustom) || 0.75) : parseFloat(hwThick)
    const pad = hwInstall === 'float' ? 0.118 : 0
    const fin = parseFloat(hwFinish) || 0
    mainTotal  = hw + pad + fin
    mainLayers = [
      ...(pad > 0 ? [{ name: 'Float Pad', thick: pad, color: 'var(--pad-color)' }] : []),
      { name: typeA === 'laminate' ? 'Laminate' : 'Hardwood', thick: hw, color: 'var(--hardwood-color)' },
      ...(fin > 0 ? [{ name: 'Finish', thick: fin, color: 'rgba(220,160,90,0.8)' }] : []),
    ]
    label = typeA === 'laminate' ? 'Laminate' : typeA === 'engineered' ? 'Engineered HW' : 'Solid Hardwood'
  } else {
    const val  = parseFloat(customA) || 0.75
    const lbls = { lvp: 'LVP', 'existing-tile': 'Existing Tile', concrete: 'Concrete', custom: 'Custom' }
    mainTotal  = val
    mainLayers = [{ name: lbls[typeA] || 'Floor', thick: val, color: 'var(--hardwood-color)' }]
    label      = lbls[typeA] || 'Custom'
  }

  const extra = extraLayersTotal(extraLayersA)
  return {
    total: mainTotal + extra,
    mainTotal,
    layers: mainLayers,
    allLayers: buildAllLayers(mainLayers, extraLayersA),
    label,
  }
}

// ─── Side B ───────────────────────────────────────────────────────────────────

export function calcSideB(config) {
  const { typeB, tileSize, tileThick, tileCustom, mortarType, membrane, memCustom,
          lvpThick, lvpPad, customB, extraLayersB } = config

  let mainTotal, mainLayers, label, tile = 0, mortar = 0, mem = 0, memName = ''

  if (typeB === 'custom') {
    const val  = parseFloat(customB) || 0.75
    mainTotal  = val; tile = val
    mainLayers = [{ name: 'Custom', thick: val, color: 'var(--tile-color)' }]
    label      = 'Custom'
  } else if (typeB === 'lvp') {
    const t    = parseFloat(lvpThick) || 0.25
    const p    = parseFloat(lvpPad) || 0
    mainTotal  = t + p; tile = t; mem = p; memName = p > 0 ? 'Pad' : ''
    mainLayers = [
      ...(p > 0 ? [{ name: 'LVP Pad', thick: p, color: 'var(--pad-color)' }] : []),
      { name: 'LVP', thick: t, color: 'var(--tile-color)' },
    ]
    label = 'LVP'
  } else {
    tile       = tileThick === 'custom' ? (parseFloat(tileCustom) || 0.375) : parseFloat(tileThick)
    mortar     = mortarType === 'auto' ? MORTAR_BY_SIZE[tileSize]
               : mortarType === 'thin' ? 0.09375
               : mortarType === 'med'  ? 0.1875 : 0.375
    const mOpt = MEMBRANE_OPTIONS.find(m => m.value === membrane) || MEMBRANE_OPTIONS[0]
    mem        = membrane === 'custom' ? (parseFloat(memCustom) || 0.125) : (mOpt.thick || 0)
    memName    = mOpt.value === 'custom' ? 'Custom Mem' : (mOpt.label.split(' ')[1] || mOpt.label)
    mainTotal  = tile + mortar + mem
    mainLayers = [
      ...(mem    > 0 ? [{ name: memName,  thick: mem,    color: 'var(--ditra-color)'  }] : []),
      ...(mortar > 0 ? [{ name: 'Mortar', thick: mortar, color: 'var(--mortar-color)' }] : []),
      { name: typeB === 'stone' ? 'Stone' : 'Tile', thick: tile, color: 'var(--tile-color)' },
    ]
    label = typeB === 'stone' ? 'Natural Stone' : 'Tile'
  }

  const extra = extraLayersTotal(extraLayersB)
  return {
    total: mainTotal + extra,
    mainTotal, tile, mortar, mem, memName,
    layers: mainLayers,
    allLayers: buildAllLayers(mainLayers, extraLayersB),
    label,
  }
}

// ─── Recommendation engine ────────────────────────────────────────────────────

export function getRecommendation({ sideA, sideB, config, subfloorOk, lippage, tolerance }) {
  const { typeB, membrane, radiant, wetArea, extraLayersB } = config
  const isTile = ['tile', 'stone'].includes(typeB)
  const gap    = sideA.total - sideB.total

  const result = { ok: Math.abs(gap) <= tolerance, statusLabel: '', statusDetail: '', adjustments: [], warnings: [] }

  if (!subfloorOk) result.warnings.push('Subfloor issues must be resolved before membrane or tile installation.')

  if (result.ok) {
    result.statusLabel  = 'Within tolerance'
    result.statusDetail = `Lippage ${toFrac(lippage)}" is within your ${toFrac(tolerance)}" limit. ✓`
    if (radiant && membrane !== 'ditra-heat')
      result.adjustments.push('Consider DITRA-HEAT for integrated radiant cable channels.')
    return result
  }

  if (!isTile) {
    result.statusLabel  = gap > 0 ? 'Side B needs to come up' : 'Side B is too high'
    result.statusDetail = `${toFrac(lippage)}" lippage exceeds ${toFrac(tolerance)}" tolerance.`
    if (gap > 0) {
      result.adjustments.push(`Add ${toFrac(gap)}" of build-up to Side B (e.g. plywood layer).`)
    } else {
      result.adjustments.push(`Reduce Side B height by ${toFrac(Math.abs(gap))}" or use a reducer strip.`)
    }
    return result
  }

  const extraB = extraLayersTotal(extraLayersB)
  if (gap > 0) {
    result.statusLabel  = 'Side B needs to come up'
    result.statusDetail = `Side B is ${toFrac(gap)}" below Side A — add build-up layers.`
    const gapDitra   = Math.abs(sideA.total - (sideB.tile + sideB.mortar + DITRA_THICK   + extraB))
    const gapDitraXL = Math.abs(sideA.total - (sideB.tile + sideB.mortar + DITRA_XL_THICK + extraB))
    if (gapDitra   <= tolerance && membrane !== 'ditra')    result.adjustments.push(`Switch membrane to DITRA (1/8") → lippage ${toFrac(gapDitra)}". ✓`)
    if (gapDitraXL <= tolerance && membrane !== 'ditra-xl') result.adjustments.push(`Switch membrane to DITRA-XL (5/16") → lippage ${toFrac(gapDitraXL)}". ✓`)
    if (gapDitra > tolerance && gapDitraXL > tolerance) {
      result.adjustments.push(`Need ${toFrac(gap)}" more — try adding a plywood layer in the Side B layer builder.`)
      result.adjustments.push('Or use a floor reducer transition strip to bridge the difference.')
    }
  } else {
    result.statusLabel  = 'Side B is too high'
    result.statusDetail = `Side B is ${toFrac(Math.abs(gap))}" above Side A.`
    result.adjustments.push('Remove a build-up layer, use thinner tile, or reduce the mortar bed.')
    if (membrane === 'ditra-xl') {
      const g = Math.abs(sideA.total - (sideB.tile + sideB.mortar + DITRA_THICK + extraB))
      if (g <= tolerance) result.adjustments.push(`Downgrade DITRA-XL → DITRA → lippage ${toFrac(g)}". ✓`)
    }
    if (Math.abs(gap) <= 0.25) result.adjustments.push('A reducer transition strip may resolve this.')
  }

  if (radiant && membrane !== 'ditra-heat') result.adjustments.push('Radiant heat: consider DITRA-HEAT for cable channels.')
  if (wetArea)  result.adjustments.push('Wet area: Apply Kerdi-Band at all DITRA seams and wall transitions.')
  return result
}

// ─── Subfloor issue analysis ──────────────────────────────────────────────────

export function getSubfloorIssues({ subfloor, deflect, unlevel, radiant, wetArea, membrane }) {
  const issues = []
  if (subfloor === 'plank')   issues.push({ type: 'warn', text: 'Plank subfloors need a full 3/4" plywood layer before DITRA — planks lack stiffness and will cause tile cracking.' })
  if (subfloor === 'osb-7/16') issues.push({ type: 'warn', text: 'OSB 7/16" is too thin for tile. Add 1/4"–1/2" plywood or upgrade to 3/4" OSB.' })
  if (subfloor === 'osb-3/4') issues.push({ type: 'info', text: 'OSB 3/4" is acceptable under DITRA, but plywood is preferred. Check for swelling or soft spots.' })
  if (deflect)  issues.push({ type: 'warn', text: 'Deflecting subfloor: DITRA alone won\'t fix movement — reinforce joists or add subfloor layers first.' })
  if (unlevel)  issues.push({ type: 'warn', text: 'Subfloor not flat: Self-leveling compound needed before membrane. DITRA doesn\'t bridge large voids.' })
  if (radiant && membrane !== 'ditra-heat') issues.push({ type: 'info', text: 'Radiant heat: DITRA-HEAT is the optimal membrane with integrated cable channels.' })
  if (wetArea && membrane === 'none') issues.push({ type: 'warn', text: 'Wet area with no membrane: A waterproofing layer is strongly recommended.' })
  return issues
}
