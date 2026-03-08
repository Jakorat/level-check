import React from 'react'
import { toFrac } from '../utils/calculations'

const SCALE     = 180
const MAX_H     = 220
const MIN_LAYER = 8

function LayerBar({ layer, scaleFactor }) {
  const h = Math.max(layer.thick * scaleFactor, MIN_LAYER)
  return (
    <div style={{
      width: '100%',
      height: h,
      background: layer.color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 10px',
      fontSize: '0.62rem',
      color: 'rgba(0,0,0,0.72)',
      fontWeight: 500,
      letterSpacing: '0.03em',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      transition: 'height 0.35s ease',
      flexShrink: 0,
      borderBottom: '1px solid rgba(0,0,0,0.08)',
    }}>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{layer.name}</span>
      <span style={{ opacity: 0.75, marginLeft: 4, flexShrink: 0 }}>{toFrac(layer.thick)}"</span>
    </div>
  )
}

function StackColumn({ label, layers, total, scaleFactor }) {
  const height = Math.max(total * scaleFactor, MIN_LAYER)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, maxWidth: 210 }}>
      <div style={{ fontSize: '0.66rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>
        {label}
      </div>
      <div style={{
        width: '100%', height,
        display: 'flex', flexDirection: 'column-reverse',
        border: '1px solid var(--border)', borderRadius: 4,
        overflow: 'hidden', transition: 'height 0.35s ease',
      }}>
        {layers.map((layer, i) => (
          <LayerBar key={i} layer={layer} scaleFactor={scaleFactor} />
        ))}
      </div>
      <div style={{ fontSize: '0.65rem', color: 'var(--muted)', marginTop: 8 }}>
        {toFrac(total)}" total
      </div>
    </div>
  )
}

const LEGEND = [
  { color: 'var(--hardwood-color)',  label: 'Existing Floor' },
  { color: 'var(--tile-color)',      label: 'New Floor / Tile' },
  { color: 'var(--ditra-color)',     label: 'Membrane / DITRA' },
  { color: 'var(--mortar-color)',    label: 'Mortar / Adhesive' },
  { color: 'var(--subfloor-color)',  label: 'Build-up / Plywood' },
  { color: '#7a90a0',                label: 'Self-leveler' },
]

export default function StackDiagram({ sideA, sideB }) {
  const maxTotal    = Math.max(sideA.total, sideB.total, 0.01)
  const scaleFactor = Math.min(SCALE, MAX_H / maxTotal)
  const lippage     = Math.abs(sideA.total - sideB.total)
  const lippageH    = lippage * scaleFactor

  const layersA = sideA.allLayers || sideA.layers || []
  const layersB = sideB.allLayers || sideB.layers || []

  return (
    <div className="animate-in" style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: 12, padding: 20, marginTop: 16,
    }}>
      <div style={{ fontSize: '0.67rem', color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
        Floor Stack Cross-Section
      </div>

      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end', justifyContent: 'center' }}>
        <StackColumn
          label={`Side A — ${sideA.label}`}
          layers={layersA}
          total={sideA.total}
          scaleFactor={scaleFactor}
        />

        {/* Lippage arrow */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', minWidth: 56, paddingBottom: 26 }}>
          {lippageH > 4 && (
            <div style={{ width: 2, height: lippageH, background: 'var(--accent)', borderRadius: 1, transition: 'height 0.35s ease' }} />
          )}
          <div style={{ textAlign: 'center', marginTop: 4 }}>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: '1rem', color: 'var(--accent)', lineHeight: 1 }}>
              {toFrac(lippage)}"
            </div>
            <div style={{ fontSize: '0.57rem', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>
              lippage
            </div>
          </div>
        </div>

        <StackColumn
          label={`Side B — ${sideB.label}`}
          layers={layersB}
          total={sideB.total}
          scaleFactor={scaleFactor}
        />
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
        {LEGEND.map(({ color, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.62rem', color: 'var(--muted)' }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: color, flexShrink: 0 }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}
