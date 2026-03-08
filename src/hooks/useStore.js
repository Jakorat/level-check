import { useState, useCallback } from 'react'
import { DEFAULT_LIBRARY } from '../utils/calculations'

const STORAGE_KEYS = {
  configs: 'lc_configs',
  library: 'lc_library',
}

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}

function saveToStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

export const DEFAULT_CONFIG = {
  // Side A — existing floor
  typeA:        'hardwood',
  hwThick:      '0.75',
  hwCustom:     '',
  hwInstall:    'nail',
  hwFinish:     '0',
  customA:      '',
  // Subfloor A
  subfloor:     'plywood-3/4',
  deflect:      false,
  unlevel:      false,
  // Extra layers Side A (array of layer objects)
  extraLayersA: [],
  // Side B — new floor
  typeB:        'tile',
  tileSize:     'med',
  tileThick:    '0.375',
  tileCustom:   '',
  mortarType:   'auto',
  membrane:     'none',
  memCustom:    '',
  lvpThick:     '0.25',
  lvpPad:       '0',
  customB:      '',
  // Subfloor B
  subfloorB:    'plywood-3/4',
  // Extra layers Side B
  extraLayersB: [],
  // Project settings
  tolerance:    '0.125',
  transType:    'reducer',
  radiant:      false,
  wetArea:      false,
}

// Each extra layer: { uid, id, name, thick, customThick, color, cat }

let _uidCounter = 1
export function makeLayerUID() { return _uidCounter++ }

export function useStore() {
  const [config,       setConfig]       = useState(() => DEFAULT_CONFIG)
  const [configs,      setConfigs]      = useState(() => loadFromStorage(STORAGE_KEYS.configs, []))
  const [library,      setLibrary]      = useState(() => loadFromStorage(STORAGE_KEYS.library, DEFAULT_LIBRARY))
  const [libNextId,    setLibNextId]    = useState(100)

  const updateConfig = useCallback((updates) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }, [])

  const resetConfig = useCallback(() => setConfig(DEFAULT_CONFIG), [])

  // ── Extra layers helpers ──────────────────────────────────────────────────

  const addExtraLayer = useCallback((side, preset) => {
    const key = side === 'A' ? 'extraLayersA' : 'extraLayersB'
    const layer = { ...preset, uid: makeLayerUID(), customThick: '' }
    setConfig(prev => ({ ...prev, [key]: [...prev[key], layer] }))
  }, [])

  const removeExtraLayer = useCallback((side, uid) => {
    const key = side === 'A' ? 'extraLayersA' : 'extraLayersB'
    setConfig(prev => ({ ...prev, [key]: prev[key].filter(l => l.uid !== uid) }))
  }, [])

  const updateExtraLayer = useCallback((side, uid, updates) => {
    const key = side === 'A' ? 'extraLayersA' : 'extraLayersB'
    setConfig(prev => ({
      ...prev,
      [key]: prev[key].map(l => l.uid === uid ? { ...l, ...updates } : l),
    }))
  }, [])

  const moveExtraLayer = useCallback((side, uid, dir) => {
    const key = side === 'A' ? 'extraLayersA' : 'extraLayersB'
    setConfig(prev => {
      const arr = [...prev[key]]
      const idx = arr.findIndex(l => l.uid === uid)
      if (idx === -1) return prev
      const next = dir === 'up' ? idx - 1 : idx + 1
      if (next < 0 || next >= arr.length) return prev
      ;[arr[idx], arr[next]] = [arr[next], arr[idx]]
      return { ...prev, [key]: arr }
    })
  }, [])

  // ── Saved configs ─────────────────────────────────────────────────────────

  const saveConfig = useCallback((name) => {
    const entry = {
      id:     Date.now(),
      name:   name || `Config ${configs.length + 1}`,
      date:   new Date().toLocaleDateString(),
      config,
    }
    const next = [...configs, entry]
    setConfigs(next)
    saveToStorage(STORAGE_KEYS.configs, next)
    return entry
  }, [config, configs])

  const loadConfig = useCallback((id) => {
    const found = configs.find(c => c.id === id)
    if (found) setConfig({ ...DEFAULT_CONFIG, ...found.config })
  }, [configs])

  const deleteConfig = useCallback((id) => {
    const next = configs.filter(c => c.id !== id)
    setConfigs(next)
    saveToStorage(STORAGE_KEYS.configs, next)
  }, [configs])

  // ── Library ───────────────────────────────────────────────────────────────

  const addLibEntry = useCallback(({ name, cat, thick, notes }) => {
    const entry = { id: libNextId, name, cat, thick: parseFloat(thick), notes: notes || '' }
    setLibNextId(n => n + 1)
    const next = [...library, entry]
    setLibrary(next)
    saveToStorage(STORAGE_KEYS.library, next)
  }, [library, libNextId])

  const deleteLibEntry = useCallback((id) => {
    const next = library.filter(l => l.id !== id)
    setLibrary(next)
    saveToStorage(STORAGE_KEYS.library, next)
  }, [library])

  const resetLibrary = useCallback(() => {
    setLibrary(DEFAULT_LIBRARY)
    saveToStorage(STORAGE_KEYS.library, DEFAULT_LIBRARY)
  }, [])

  return {
    config, updateConfig, resetConfig,
    addExtraLayer, removeExtraLayer, updateExtraLayer, moveExtraLayer,
    configs, saveConfig, loadConfig, deleteConfig,
    library, addLibEntry, deleteLibEntry, resetLibrary,
  }
}
