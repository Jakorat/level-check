import React, { useState } from 'react'
import { Card, CardTitle, Field, Select, Input, Btn, Badge } from './UI'
import { toFrac, toMM } from '../utils/calculations'

export default function LibraryView({ library, onAdd, onDelete, onReset }) {
  const [newName,  setNewName]  = useState('')
  const [newCat,   setNewCat]   = useState('tile')
  const [newThick, setNewThick] = useState('')
  const [newNotes, setNewNotes] = useState('')

  function handleAdd() {
    if (!newName.trim() || !newThick) return
    onAdd({ name: newName.trim(), cat: newCat, thick: newThick, notes: newNotes.trim() })
    setNewName(''); setNewThick(''); setNewNotes('')
  }

  const cats = ['tile','hardwood','lvp','membrane','subfloor','mortar','other']

  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <CardTitle style={{ marginBottom: 0 }}>Material Thickness Library</CardTitle>
        <Btn variant="ghost" onClick={onReset} style={{ marginLeft: 'auto', fontSize: '0.63rem', padding: '5px 10px' }}>
          Reset to defaults
        </Btn>
      </div>

      <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginBottom: 16, lineHeight: 1.6 }}>
        Reference library for common flooring materials. Add custom entries or delete unwanted ones.
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.74rem' }}>
          <thead>
            <tr>
              {['Material', 'Category', 'Thickness', 'Notes', ''].map(h => (
                <th key={h} style={{
                  textAlign: 'left', fontSize: '0.61rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'var(--muted)',
                  padding: '6px 10px', borderBottom: '1px solid var(--border)',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {library.map(item => (
              <tr
                key={item.id}
                style={{ transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '8px 10px', color: 'var(--text)', borderBottom: '1px solid rgba(46,44,40,0.4)' }}>
                  {item.name}
                </td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid rgba(46,44,40,0.4)' }}>
                  <Badge cat={item.cat} />
                </td>
                <td style={{ padding: '8px 10px', color: 'var(--text)', borderBottom: '1px solid rgba(46,44,40,0.4)' }}>
                  {toFrac(item.thick)}"
                  <span style={{ color: 'var(--muted)', fontSize: '0.65rem', marginLeft: 6 }}>
                    ({toMM(item.thick)}mm)
                  </span>
                </td>
                <td style={{ padding: '8px 10px', color: 'var(--muted)', borderBottom: '1px solid rgba(46,44,40,0.4)' }}>
                  {item.notes}
                </td>
                <td style={{ padding: '8px 10px', borderBottom: '1px solid rgba(46,44,40,0.4)' }}>
                  {item.id >= 100 && (
                    <Btn variant="danger" onClick={() => onDelete(item.id)}
                      style={{ fontSize: '0.62rem', padding: '3px 8px' }}>
                      ×
                    </Btn>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add new entry */}
      <div style={{
        marginTop: 20,
        background: 'var(--bg)',
        border: '1px solid var(--border)',
        borderRadius: 8,
        padding: 14,
      }}>
        <div style={{
          fontSize: '0.67rem', letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--muted)', marginBottom: 12,
        }}>
          Add Custom Material
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 2fr auto',
          gap: 8,
          alignItems: 'end',
        }}>
          <Field label="Name" style={{ marginTop: 0 }}>
            <Input value={newName} onChange={setNewName} placeholder="Material name" />
          </Field>
          <Field label="Category" style={{ marginTop: 0 }}>
            <Select value={newCat} onChange={setNewCat}>
              {cats.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </Select>
          </Field>
          <Field label="Thick (in)" style={{ marginTop: 0 }}>
            <Input
              type="number" value={newThick} onChange={setNewThick}
              placeholder="0.375" step="0.03125" min="0.03125" max="4"
            />
          </Field>
          <Field label="Notes" style={{ marginTop: 0 }}>
            <Input value={newNotes} onChange={setNewNotes} placeholder="Optional notes" />
          </Field>
          <div>
            <Btn onClick={handleAdd} style={{ width: '100%' }}>Add</Btn>
          </div>
        </div>
      </div>
    </Card>
  )
}
