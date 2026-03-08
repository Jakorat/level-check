import React from 'react'
import { Card, CardTitle, Field, Select, Input, Checkbox, Divider, Alert } from './UI'
import { SUBFLOOR_DITRA_OK } from '../utils/calculations'

const SIDEA_TYPES = [
  { value: 'hardwood',      label: 'Solid Hardwood' },
  { value: 'engineered',    label: 'Engineered Hardwood' },
  { value: 'laminate',      label: 'Laminate' },
  { value: 'lvp',           label: 'LVP / LVT' },
  { value: 'existing-tile', label: 'Existing Tile' },
  { value: 'concrete',      label: 'Concrete Slab' },
  { value: 'custom',        label: 'Custom' },
]

const HW_THICKNESSES = [
  { value: '0.75',    label: '3/4" — Standard solid' },
  { value: '0.625',   label: '5/8"' },
  { value: '0.5',     label: '1/2"' },
  { value: '1.03125', label: '33/32" — Heavy plank' },
  { value: 'custom',  label: 'Custom...' },
]

const SUBFLOORS = [
  { value: 'plywood-3/4', label: 'Plywood 3/4" (19mm) — Preferred' },
  { value: 'plywood-5/8', label: 'Plywood 5/8"' },
  { value: 'osb-3/4',     label: 'OSB 3/4"' },
  { value: 'osb-7/16',    label: 'OSB 7/16" (thin — problematic)' },
  { value: 'concrete',    label: 'Concrete Slab' },
  { value: 'plank',       label: 'Plank Subfloor (old construction)' },
]

export default function SideAPanel({ config, onChange, issues }) {
  const isHW = ['hardwood', 'engineered', 'laminate'].includes(config.typeA)
  const isCustom = !isHW

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Card>
        <CardTitle>Existing Floor — Side A</CardTitle>

        <Field label="Floor Type">
          <Select value={config.typeA} onChange={v => onChange({ typeA: v })}>
            {SIDEA_TYPES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </Select>
        </Field>

        {isHW && (
          <>
            <Field
              label="Thickness"
              tip="Standard solid hardwood is 3/4&quot;. Some older installs are 5/8&quot; or 33/32&quot;."
            >
              <Select value={config.hwThick} onChange={v => onChange({ hwThick: v })}>
                {HW_THICKNESSES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </Select>
            </Field>

            {config.hwThick === 'custom' && (
              <div style={{ marginTop: 6 }}>
                <Input
                  type="number" value={config.hwCustom}
                  onChange={v => onChange({ hwCustom: v })}
                  placeholder="0.75" step="0.0625" min="0.25" max="2" suffix="in"
                />
              </div>
            )}

            <Field label="Installation Method">
              <Select value={config.hwInstall} onChange={v => onChange({ hwInstall: v })}>
                <option value="nail">Nail-down (standard)</option>
                <option value="float">Floating (adds ~3mm pad)</option>
                <option value="glue">Glue-down</option>
              </Select>
            </Field>

            <Field label="Finish / Wear Layer">
              <Select value={config.hwFinish} onChange={v => onChange({ hwFinish: v })}>
                <option value="0">Factory finished</option>
                <option value="0.0313">Refinished / extra coat (~1/32")</option>
              </Select>
            </Field>
          </>
        )}

        {isCustom && (
          <Field label="Total Thickness">
            <Input
              type="number" value={config.customA}
              onChange={v => onChange({ customA: v })}
              placeholder="0.75" step="0.0625" min="0.0625" max="4" suffix="in"
            />
          </Field>
        )}

        <Divider />

        <CardTitle color="var(--accent2)">Subfloor — Side A</CardTitle>

        <Field label="Subfloor Type">
          <Select value={config.subfloor} onChange={v => onChange({ subfloor: v })}>
            {SUBFLOORS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </Select>
        </Field>

        <Checkbox
          checked={config.deflect}
          onChange={v => onChange({ deflect: v })}
          label="Subfloor shows flex / deflection"
        />
        <Checkbox
          checked={config.unlevel}
          onChange={v => onChange({ unlevel: v })}
          label='Subfloor not flat (>3/16" in 10 ft)'
        />
      </Card>

      {issues.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {issues.map((issue, i) => (
            <Alert key={i} type={issue.type}>{issue.text}</Alert>
          ))}
        </div>
      )}
    </div>
  )
}
