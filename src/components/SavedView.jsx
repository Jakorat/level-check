import React from 'react'
import { Card, CardTitle, Btn } from './UI'

export default function SavedView({ configs, onLoad, onDelete }) {
  if (!configs.length) {
    return (
      <Card>
        <CardTitle>Saved Configurations</CardTitle>
        <div style={{
          textAlign: 'center', padding: '40px 20px',
          color: 'var(--muted)', fontSize: '0.78rem', lineHeight: 1.8,
        }}>
          No saved configurations yet.<br />
          Build one in the Calculator tab and save it.
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <CardTitle>Saved Configurations</CardTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {configs.map(cfg => (
          <div
            key={cfg.id}
            onClick={() => onLoad(cfg.id)}
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.84rem', color: 'var(--text)', marginBottom: 3 }}>
                {cfg.name}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--muted)' }}>
                {cfg.date} · {cfg.config.typeA} → {cfg.config.typeB}
              </div>
            </div>
            <Btn
              variant="ghost"
              style={{ fontSize: '0.65rem', padding: '5px 10px' }}
              onClick={e => { e.stopPropagation(); onLoad(cfg.id) }}
            >
              Load
            </Btn>
            <Btn
              variant="danger"
              style={{ fontSize: '0.65rem', padding: '5px 10px' }}
              onClick={e => { e.stopPropagation(); onDelete(cfg.id) }}
            >
              Delete
            </Btn>
          </div>
        ))}
      </div>
    </Card>
  )
}
