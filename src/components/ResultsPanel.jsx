import React from 'react'
import { toFrac, toMM } from '../utils/calculations'
import { Alert } from './UI'

export default function ResultsPanel({ sideA, sideB, reco, lippage, tolerance, transType }) {
  const statusColor = reco.ok
    ? 'var(--accent3)'
    : lippage < tolerance * 1.5
      ? 'var(--accent)'
      : 'var(--warn)'

  const statusIcon = reco.ok ? '✓' : '⚠'

  return (
    <div
      className="animate-in"
      style={{
        background: 'var(--surface2)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: 22,
      }}
    >
      {/* Status */}
      <div style={{
        fontFamily: 'Fraunces, serif',
        fontSize: '1.55rem',
        fontWeight: 700,
        color: statusColor,
        marginBottom: 4,
      }}>
        {statusIcon} {reco.statusLabel}
      </div>
      <div style={{ fontSize: '0.73rem', color: 'var(--muted)', marginBottom: 18 }}>
        {reco.statusDetail}
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 18 }}>
        {[
          { val: `${toFrac(sideA.total)}"`, sub: `Side A — ${toMM(sideA.total)}mm` },
          { val: `${toFrac(sideB.total)}"`, sub: `Side B — ${toMM(sideB.total)}mm` },
          { val: `${toFrac(lippage)}"`,     sub: `Lippage — ${toMM(lippage)}mm`, color: statusColor },
        ].map((m, i) => (
          <div key={i} style={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: 12,
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: 'Fraunces, serif',
              fontSize: '1.35rem',
              fontWeight: 700,
              color: m.color || 'var(--text)',
              lineHeight: 1,
              marginBottom: 4,
            }}>
              {m.val}
            </div>
            <div style={{ fontSize: '0.62rem', color: 'var(--muted)', letterSpacing: '0.06em' }}>
              {m.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Adjustments */}
      {reco.adjustments.length > 0 && (
        <div style={{
          background: 'rgba(232,201,126,0.08)',
          border: '1px solid rgba(232,201,126,0.3)',
          borderRadius: 10,
          padding: 16,
          marginBottom: 12,
        }}>
          <div style={{
            fontFamily: 'Fraunces, serif',
            fontSize: '0.9rem',
            color: 'var(--accent)',
            marginBottom: 10,
          }}>
            Recommended Adjustments
          </div>
          {reco.adjustments.map((a, i) => (
            <div key={i} style={{ fontSize: '0.74rem', color: 'var(--text)', lineHeight: 1.6, marginBottom: 4 }}>
              → {a}
            </div>
          ))}
        </div>
      )}

      {/* Warnings */}
      {reco.warnings.map((w, i) => (
        <Alert key={i} type="warn">{w}</Alert>
      ))}

      {/* Transition note */}
      {!reco.ok && transType !== 'flush' && lippage <= 0.5 && (
        <div style={{
          background: 'rgba(126,184,232,0.07)',
          border: '1px solid rgba(126,184,232,0.2)',
          borderRadius: 8,
          padding: 14,
          fontSize: '0.73rem',
          lineHeight: 1.6,
          color: 'var(--text)',
          marginTop: 10,
        }}>
          <span style={{ color: 'var(--accent2)', fontWeight: 500 }}>Transition Strip Option: </span>
          A floor reducer can bridge up to {transType === 'reducer' ? '1/2"' : '3/4"'} of height difference.
          Schluter RENO-T or JOLLY profiles provide a clean tile edge.
          T-molding works when both sides are close in height.
        </div>
      )}
    </div>
  )
}
