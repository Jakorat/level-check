import React, { useState } from 'react'
import { LAYER_PRESETS } from '../utils/calculations'
import { toFrac } from '../utils/calculations'
import { Btn, Input } from './UI'

const CAT_ORDER = ['Build-up', 'Membrane', 'Mortar', 'Custom']

export default function LayerBuilder({ side, extraLayers, onAdd, onRemove, onUpdate, onMove }) {
  const [open, setOpen] = useState(false)

  function handleAdd(preset) {
    onAdd(side, preset)
    setOpen(false)
  }

  const grouped = CAT_ORDER.reduce((acc, cat) => {
    acc[cat] = LAYER_PRESETS.filter(p => p.cat === cat)
    return acc
  }, {})

  return (
    <div style={{ marginTop: 14 }}>
      {/* Existing extra layers */}
      {extraLayers.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 8 }}>
          {extraLayers.map((layer, idx) => (
            <ExtraLayerRow
              key={layer.uid}
              layer={layer}
              idx={idx}
              total={extraLayers.length}
              onRemove={() => onRemove(side, layer.uid)}
              onUpdate={(u) => onUpdate(side, layer.uid, u)}
              onMove={(dir) => onMove(side, layer.uid, dir)}
            />
          ))}
        </div>
      )}

      {/* Add button */}
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          style={{
            width: '100%',
            background: 'transparent',
            border: '1px dashed var(--border)',
            borderRadius: 7,
            padding: '8px 12px',
            color: 'var(--muted)',
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)' }}
        >
          <span style={{ fontSize: '1rem', lineHeight: 1 }}>+</span> Add Layer
        </button>
      ) : (
        <div style={{
          background: 'var(--bg)',
          border: '1px solid var(--accent)',
          borderRadius: 8,
          padding: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontSize: '0.67rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)' }}>
              Choose Layer
            </span>
            <button onClick={() => setOpen(false)} style={{
              background: 'none', border: 'none', color: 'var(--muted)',
              cursor: 'pointer', fontSize: '1rem', lineHeight: 1, padding: '0 2px',
            }}>×</button>
          </div>

          {CAT_ORDER.map(cat => (
            <div key={cat} style={{ marginBottom: 8 }}>
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 4 }}>
                {cat}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {grouped[cat].map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => handleAdd(preset)}
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 5,
                      padding: '5px 10px',
                      fontSize: '0.68rem',
                      color: 'var(--text)',
                      fontFamily: 'DM Mono, monospace',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = preset.color || 'var(--accent)'; e.currentTarget.style.color = preset.color || 'var(--accent)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)' }}
                  >
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: preset.color || 'var(--muted)', flexShrink: 0, display: 'inline-block' }} />
                    {preset.name}
                    {preset.thick !== null && (
                      <span style={{ color: 'var(--muted)', fontSize: '0.6rem' }}>
                        {toFrac(preset.thick)}"
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ExtraLayerRow({ layer, idx, total, onRemove, onUpdate, onMove }) {
  const isCustom = layer.thick === null
  const thick = isCustom ? (parseFloat(layer.customThick) || 0) : layer.thick

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      background: 'var(--bg)',
      border: '1px solid var(--border)',
      borderRadius: 7,
      padding: '6px 10px',
    }}>
      {/* Color swatch */}
      <div style={{
        width: 10, height: 10, borderRadius: 2,
        background: layer.color || 'var(--muted)',
        flexShrink: 0,
      }} />

      {/* Name */}
      <div style={{ flex: 1, fontSize: '0.74rem', color: 'var(--text)', minWidth: 0 }}>
        {layer.name}
      </div>

      {/* Thickness: custom gets an input, else just label */}
      {isCustom ? (
        <Input
          type="number"
          value={layer.customThick}
          onChange={v => onUpdate({ customThick: v })}
          placeholder="0.25"
          step="0.03125"
          min="0.03125"
          max="4"
          suffix="in"
          style={{ width: 90, fontSize: '0.71rem', padding: '4px 32px 4px 8px' }}
        />
      ) : (
        <span style={{ fontSize: '0.7rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
          {toFrac(thick)}"
        </span>
      )}

      {/* Move up/down */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <ArrowBtn disabled={idx === 0}         onClick={() => onMove('up')}   label="▲" />
        <ArrowBtn disabled={idx === total - 1} onClick={() => onMove('down')} label="▼" />
      </div>

      {/* Remove */}
      <button
        onClick={onRemove}
        style={{
          background: 'none', border: 'none', color: 'var(--muted)',
          cursor: 'pointer', fontSize: '0.9rem', lineHeight: 1, padding: '0 2px',
          flexShrink: 0,
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--warn)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}
      >×</button>
    </div>
  )
}

function ArrowBtn({ onClick, disabled, label }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: 'none', border: 'none',
        color: disabled ? 'var(--border)' : 'var(--muted)',
        cursor: disabled ? 'default' : 'pointer',
        fontSize: '0.5rem', lineHeight: 1, padding: 0,
        display: 'flex', alignItems: 'center',
      }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.color = 'var(--accent)' }}
      onMouseLeave={e => { if (!disabled) e.currentTarget.style.color = 'var(--muted)' }}
    >
      {label}
    </button>
  )
}
