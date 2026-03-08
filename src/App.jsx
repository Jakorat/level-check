import React, { useState, useMemo } from 'react'
import { useStore } from './hooks/useStore'
import {
  calcSideA, calcSideB, getRecommendation, getSubfloorIssues,
  SUBFLOOR_DITRA_OK,
} from './utils/calculations'
import SideAPanel   from './components/SideAPanel'
import SideBPanel   from './components/SideBPanel'
import ResultsPanel from './components/ResultsPanel'
import StackDiagram from './components/StackDiagram'
import SavedView    from './components/SavedView'
import LibraryView  from './components/LibraryView'
import { Btn, Input } from './components/UI'

const TABS = [
  { id: 'calc',    label: 'Calculator' },
  { id: 'saved',   label: 'Saved' },
  { id: 'library', label: 'Library' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('calc')
  const [saveName,  setSaveName]  = useState('')
  const [saveFlash, setSaveFlash] = useState(false)

  const {
    config, updateConfig, resetConfig,
    addExtraLayer, removeExtraLayer, updateExtraLayer, moveExtraLayer,
    configs, saveConfig, loadConfig, deleteConfig,
    library, addLibEntry, deleteLibEntry, resetLibrary,
  } = useStore()

  const sideA     = useMemo(() => calcSideA(config), [config])
  const sideB     = useMemo(() => calcSideB(config), [config])
  const lippage   = useMemo(() => Math.abs(sideA.total - sideB.total), [sideA, sideB])
  const tolerance = useMemo(() => parseFloat(config.tolerance), [config.tolerance])

  const subfloorOk = useMemo(() =>
    SUBFLOOR_DITRA_OK[config.subfloor] && !config.deflect && !config.unlevel,
    [config.subfloor, config.deflect, config.unlevel])

  const subfloorIssues = useMemo(() =>
    getSubfloorIssues({
      subfloor: config.subfloor,
      deflect:  config.deflect,
      unlevel:  config.unlevel,
      radiant:  config.radiant,
      wetArea:  config.wetArea,
      membrane: config.membrane,
    }), [config])

  const reco = useMemo(() =>
    getRecommendation({ sideA, sideB, config, subfloorOk, lippage, tolerance }),
    [sideA, sideB, config, subfloorOk, lippage, tolerance])

  function handleSave() {
    saveConfig(saveName)
    setSaveName('')
    setSaveFlash(true)
    setTimeout(() => setSaveFlash(false), 1800)
  }

  function handleLoadConfig(id) {
    loadConfig(id)
    setActiveTab('calc')
  }

  return (
    <div style={{ maxWidth: 1300, margin: '0 auto', padding: '24px 20px 60px' }}>

      {/* Header */}
      <header style={{
        display: 'flex', alignItems: 'flex-end', gap: 20,
        marginBottom: 36, paddingBottom: 20,
        borderBottom: '1px solid var(--border)', flexWrap: 'wrap',
      }}>
        <div>
          <div style={{
            fontFamily: 'Fraunces, serif', fontSize: '2.3rem', fontWeight: 700,
            color: 'var(--accent)', letterSpacing: '-0.02em', lineHeight: 1,
          }}>
            Level<span style={{ color: 'var(--text)', fontWeight: 300, fontStyle: 'italic' }}>Check</span>
          </div>
          <div style={{
            fontSize: '0.67rem', color: 'var(--muted)',
            letterSpacing: '0.16em', textTransform: 'uppercase', marginTop: 4,
          }}>
            Floor Transition Planner · Lippage Analyzer
          </div>
        </div>

        <nav style={{
          marginLeft: 'auto', display: 'flex', gap: 4,
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 8, padding: 4,
        }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '7px 14px',
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                border: 'none', borderRadius: 5, cursor: 'pointer', transition: 'all 0.2s',
                background: activeTab === tab.id ? 'var(--accent)' : 'transparent',
                color:      activeTab === tab.id ? 'var(--bg)'     : 'var(--muted)',
                fontWeight: activeTab === tab.id ? 500 : 400,
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* ── CALCULATOR ── */}
      {activeTab === 'calc' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16 }}>
            <SideAPanel
              config={config}
              onChange={updateConfig}
              issues={subfloorIssues}
              extraLayers={config.extraLayersA}
              onAddLayer={addExtraLayer}
              onRemoveLayer={removeExtraLayer}
              onUpdateLayer={updateExtraLayer}
              onMoveLayer={moveExtraLayer}
            />
            <SideBPanel
              config={config}
              onChange={updateConfig}
              extraLayers={config.extraLayersB}
              onAddLayer={addExtraLayer}
              onRemoveLayer={removeExtraLayer}
              onUpdateLayer={updateExtraLayer}
              onMoveLayer={moveExtraLayer}
            />
          </div>

          <div style={{ marginTop: 16 }}>
            <ResultsPanel
              sideA={sideA}
              sideB={sideB}
              reco={reco}
              lippage={lippage}
              tolerance={tolerance}
              transType={config.transType}
            />
          </div>

          <StackDiagram sideA={sideA} sideB={sideB} />

          {/* Save row */}
          <div style={{ display: 'flex', gap: 8, marginTop: 20, flexWrap: 'wrap', alignItems: 'center' }}>
            <Input
              value={saveName}
              onChange={setSaveName}
              placeholder="Configuration name..."
              style={{ maxWidth: 280, background: 'var(--surface)' }}
            />
            <Btn onClick={handleSave}>{saveFlash ? 'Saved! ✓' : 'Save Config'}</Btn>
            <Btn variant="ghost" onClick={resetConfig}>Reset</Btn>
          </div>
        </>
      )}

      {/* ── SAVED ── */}
      {activeTab === 'saved' && (
        <SavedView configs={configs} onLoad={handleLoadConfig} onDelete={deleteConfig} />
      )}

      {/* ── LIBRARY ── */}
      {activeTab === 'library' && (
        <LibraryView
          library={library}
          onAdd={addLibEntry}
          onDelete={deleteLibEntry}
          onReset={resetLibrary}
        />
      )}
    </div>
  )
}
