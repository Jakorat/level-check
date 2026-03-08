import React from 'react'

// ─── Card ─────────────────────────────────────────────────────────────────────
export function Card({ children, style }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 12,
      padding: 20,
      ...style,
    }}>
      {children}
    </div>
  )
}

// ─── CardTitle ────────────────────────────────────────────────────────────────
export function CardTitle({ children, color = 'var(--accent)' }) {
  return (
    <div style={{
      fontFamily: 'Fraunces, serif',
      fontSize: '0.78rem',
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color,
      marginBottom: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    }}>
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0 }} />
      {children}
    </div>
  )
}

// ─── Field ────────────────────────────────────────────────────────────────────
export function Field({ label, tip, children, style }) {
  return (
    <div style={{ marginTop: 12, ...style }}>
      {label && (
        <label style={{
          display: 'block',
          fontSize: '0.67rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: 5,
        }}>
          {label}
          {tip && <Tip text={tip} />}
        </label>
      )}
      {children}
    </div>
  )
}

// ─── Select ───────────────────────────────────────────────────────────────────
export function Select({ value, onChange, children, style }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%',
        background: 'var(--bg)',
        border: '1px solid var(--border)',
        borderRadius: 6,
        color: 'var(--text)',
        fontFamily: 'DM Mono, monospace',
        fontSize: '0.81rem',
        padding: '8px 11px',
        appearance: 'none',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
        outline: 'none',
        ...style,
      }}
      onFocus={e => e.target.style.borderColor = 'var(--accent)'}
      onBlur={e => e.target.style.borderColor = 'var(--border)'}
    >
      {children}
    </select>
  )
}

// ─── Input ────────────────────────────────────────────────────────────────────
export function Input({ value, onChange, placeholder, type = 'text', step, min, max, suffix, style }) {
  return (
    <div style={{ position: 'relative' }}>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        step={step}
        min={min}
        max={max}
        style={{
          width: '100%',
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: 6,
          color: 'var(--text)',
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.81rem',
          padding: suffix ? '8px 36px 8px 11px' : '8px 11px',
          outline: 'none',
          transition: 'border-color 0.2s',
          ...style,
        }}
        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
        onBlur={e => e.target.style.borderColor = 'var(--border)'}
      />
      {suffix && (
        <span style={{
          position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
          fontSize: '0.63rem', color: 'var(--muted)', pointerEvents: 'none',
        }}>
          {suffix}
        </span>
      )}
    </div>
  )
}

// ─── Checkbox ────────────────────────────────────────────────────────────────
export function Checkbox({ checked, onChange, label }) {
  const id = React.useId()
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        style={{ width: 15, height: 15, accentColor: 'var(--accent)', cursor: 'pointer' }}
      />
      <label htmlFor={id} style={{ fontSize: '0.74rem', color: 'var(--text)', cursor: 'pointer' }}>
        {label}
      </label>
    </div>
  )
}

// ─── Alert ────────────────────────────────────────────────────────────────────
export function Alert({ type = 'info', children }) {
  const styles = {
    warn: { bg: 'rgba(232,126,126,0.1)', border: 'rgba(232,126,126,0.3)', color: 'var(--warn)' },
    info: { bg: 'rgba(126,184,232,0.1)', border: 'rgba(126,184,232,0.3)', color: 'var(--accent2)' },
    ok:   { bg: 'rgba(126,232,162,0.1)', border: 'rgba(126,232,162,0.3)', color: 'var(--accent3)' },
  }
  const s = styles[type] || styles.info
  return (
    <div style={{
      background: s.bg,
      border: `1px solid ${s.border}`,
      borderRadius: 8,
      padding: '11px 14px',
      fontSize: '0.73rem',
      lineHeight: 1.55,
      color: s.color,
      marginTop: 8,
    }}>
      {children}
    </div>
  )
}

// ─── Button ───────────────────────────────────────────────────────────────────
export function Btn({ children, onClick, variant = 'primary', style }) {
  const variants = {
    primary: { background: 'var(--accent)', color: 'var(--bg)', border: 'none' },
    ghost:   { background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)' },
    danger:  { background: 'transparent', color: 'var(--warn)', border: '1px solid rgba(232,126,126,0.3)' },
  }
  const v = variants[variant] || variants.primary
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: 'DM Mono, monospace',
        fontSize: '0.72rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        borderRadius: 7,
        padding: '9px 16px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
        ...v,
        ...style,
      }}
    >
      {children}
    </button>
  )
}

// ─── Divider ─────────────────────────────────────────────────────────────────
export function Divider({ style }) {
  return <div style={{ height: 1, background: 'var(--border)', margin: '18px 0', ...style }} />
}

// ─── Tooltip ─────────────────────────────────────────────────────────────────
export function Tip({ text }) {
  const [show, setShow] = React.useState(false)
  return (
    <span style={{ position: 'relative', display: 'inline-block', marginLeft: 5 }}>
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 14, height: 14, borderRadius: '50%',
          border: '1px solid var(--muted)', color: 'var(--muted)',
          fontSize: '0.58rem', cursor: 'help', verticalAlign: 'middle',
        }}
      >?</span>
      {show && (
        <span style={{
          position: 'absolute', left: 18, top: -4, zIndex: 100,
          background: 'var(--surface2)', border: '1px solid var(--border)',
          borderRadius: 6, padding: '6px 10px',
          fontSize: '0.65rem', color: 'var(--text)',
          lineHeight: 1.5, width: 200, whiteSpace: 'normal',
          pointerEvents: 'none',
        }}>
          {text}
        </span>
      )}
    </span>
  )
}

// ─── Badge ────────────────────────────────────────────────────────────────────
const BADGE_COLORS = {
  tile:     { bg: 'rgba(107,154,184,0.2)', color: 'var(--accent2)' },
  hardwood: { bg: 'rgba(200,134,74,0.2)',  color: 'var(--hardwood-color)' },
  lvp:      { bg: 'rgba(180,200,140,0.2)', color: '#a8c870' },
  membrane: { bg: 'rgba(232,201,126,0.2)', color: 'var(--accent)' },
  subfloor: { bg: 'rgba(122,106,82,0.2)',  color: '#b5a882' },
  mortar:   { bg: 'rgba(181,168,130,0.2)', color: 'var(--mortar-color)' },
  other:    { bg: 'rgba(138,133,120,0.15)', color: 'var(--muted)' },
}

export function Badge({ cat }) {
  const s = BADGE_COLORS[cat] || BADGE_COLORS.other
  const labels = { tile:'Tile', hardwood:'Hardwood', lvp:'LVP', membrane:'Membrane', subfloor:'Subfloor', mortar:'Mortar', other:'Other' }
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: 4,
      fontSize: '0.6rem', letterSpacing: '0.06em', textTransform: 'uppercase',
      background: s.bg, color: s.color,
    }}>
      {labels[cat] || cat}
    </span>
  )
}
