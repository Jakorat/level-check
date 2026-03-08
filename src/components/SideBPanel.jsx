import React from 'react'
import { Card, CardTitle, Field, Select, Input, Checkbox, Divider } from './UI'
import { MEMBRANE_OPTIONS } from '../utils/calculations'

const SIDEB_TYPES = [
  { value: 'tile',   label: 'Ceramic / Porcelain Tile' },
  { value: 'stone',  label: 'Natural Stone' },
  { value: 'lvp',    label: 'LVP / LVT' },
  { value: 'custom', label: 'Custom' },
]

const TILE_SIZES = [
  { value: 'small', label: 'Small (<12") — mosaic, subway' },
  { value: 'med',   label: 'Medium (12–18")' },
  { value: 'large', label: 'Large (18–24")' },
  { value: 'xl',    label: 'XL (>24") — large format' },
]

const TILE_THICKNESSES = [
  { value: '0.25',   label: '1/4" (6mm) — mosaic' },
  { value: '0.3125', label: '5/16" (8mm) — standard ceramic' },
  { value: '0.375',  label: '3/8" (10mm) — porcelain' },
  { value: '0.4375', label: '7/16" (11mm)' },
  { value: '0.5',    label: '1/2" (12mm) — stone / thick' },
  { value: 'custom', label: 'Custom...' },
]

const LVP_THICKNESSES = [
  { value: '0.1875', label: '3/16" (4.8mm)' },
  { value: '0.25',   label: '1/4" (6mm)' },
  { value: '0.3125', label: '5/16" (8mm)' },
  { value: '0.375',  label: '3/8" (10mm)' },
]

const TOLERANCES = [
  { value: '0.09375', label: 'ANSI Standard (<3/32" / 2.4mm)' },
  { value: '0.125',   label: 'Common practice (<1/8" / 3.2mm)' },
  { value: '0.1875',  label: 'Relaxed (<3/16" / 4.8mm)' },
  { value: '0.25',    label: 'Transition strip OK (<1/4" / 6.4mm)' },
]

export default function SideBPanel({ config, onChange }) {
  const isTile = ['tile', 'stone'].includes(config.typeB)
  const isLVP  = config.typeB === 'lvp'
  const isCustom = config.typeB === 'custom'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Card>
        <CardTitle color="var(--accent2)">New Floor — Side B</CardTitle>

        <Field label="Floor Type">
          <Select value={config.typeB} onChange={v => onChange({ typeB: v })}>
            {SIDEB_TYPES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </Field>

        {isTile && (
          <>
            <Field
              label="Tile Size"
              tip="Larger tiles require thicker mortar beds to maintain proper coverage."
            >
              <Select value={config.tileSize} onChange={v => onChange({ tileSize: v })}>
                {TILE_SIZES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </Select>
            </Field>

            <Field label="Tile Thickness">
              <Select value={config.tileThick} onChange={v => onChange({ tileThick: v })}>
                {TILE_THICKNESSES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </Select>
            </Field>

            {config.tileThick === 'custom' && (
              <div style={{ marginTop: 6 }}>
                <Input
                  type="number" value={config.tileCustom}
                  onChange={v => onChange({ tileCustom: v })}
                  placeholder="0.375" step="0.0625" min="0.125" max="1.5" suffix="in"
                />
              </div>
            )}

            <Field label="Mortar Type">
              <Select value={config.mortarType} onChange={v => onChange({ mortarType: v })}>
                <option value="auto">Auto (based on tile size)</option>
                <option value="thin">Thinset — 3/32" avg</option>
                <option value="med">Medium-bed — 3/16" avg</option>
                <option value="large">Large-format thinset — 3/8" avg</option>
              </Select>
            </Field>

            <Field label="Membrane / Underlayment">
              <Select value={config.membrane} onChange={v => onChange({ membrane: v })}>
                {MEMBRANE_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </Field>

            {config.membrane === 'custom' && (
              <div style={{ marginTop: 6 }}>
                <Input
                  type="number" value={config.memCustom}
                  onChange={v => onChange({ memCustom: v })}
                  placeholder="0.125" step="0.03125" min="0" max="1" suffix="in"
                />
              </div>
            )}
          </>
        )}

        {isLVP && (
          <>
            <Field label="LVP Thickness">
              <Select value={config.lvpThick} onChange={v => onChange({ lvpThick: v })}>
                {LVP_THICKNESSES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </Select>
            </Field>
            <Field label="Underlayment Pad">
              <Select value={config.lvpPad} onChange={v => onChange({ lvpPad: v })}>
                <option value="0">Pre-attached / none</option>
                <option value="0.0625">1/16" foam pad</option>
                <option value="0.125">1/8" premium pad</option>
              </Select>
            </Field>
          </>
        )}

        {isCustom && (
          <Field label="Total Thickness">
            <Input
              type="number" value={config.customB}
              onChange={v => onChange({ customB: v })}
              placeholder="0.75" step="0.0625" min="0.0625" max="4" suffix="in"
            />
          </Field>
        )}
      </Card>

      {/* Project Settings */}
      <Card>
        <CardTitle color="var(--accent3)">Project Settings</CardTitle>

        <Field label="Lippage Tolerance">
          <Select value={config.tolerance} onChange={v => onChange({ tolerance: v })}>
            {TOLERANCES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </Field>

        <Field label="Transition Type Allowed">
          <Select value={config.transType} onChange={v => onChange({ transType: v })}>
            <option value="flush">Flush (no transition strip)</option>
            <option value="reducer">Reducer strip OK</option>
            <option value="any">Any transition OK</option>
          </Select>
        </Field>

        <Checkbox
          checked={config.radiant}
          onChange={v => onChange({ radiant: v })}
          label="Radiant heat under new floor"
        />
        <Checkbox
          checked={config.wetArea}
          onChange={v => onChange({ wetArea: v })}
          label="Wet area / shower adjacent"
        />
      </Card>
    </div>
  )
}
