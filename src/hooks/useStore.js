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
  } catch {
    return fallback
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {}
}

// ─── Default calculator config ────────────────────────────────────────────────
export const DEFAULT_CONFIG = {
  // Side A
  typeA:       'hardwood',
  hwThick:     '0.75',
  hwCustom:    '',
  hwInstall:   'nail',
  hwFinish:    '0',
  customA:     '',
  // Subfloor A
  subfloor:    'plywood-3/4',
  deflect:     false,
  unlevel:     false,
  // Side B
  typeB:       'tile',
  tileSize:    'med',
  tileThick:   '0.375',
  tileCustom:  '',
  mortarType:  'auto',
  membrane:    'none',
  memCustom:   '',
  lvpThick:    '0.25',
  lvpPad:      '0',
  customB:     '',
  // Project
  tolerance:   '0.125',
  transType:   'reducer',
  radiant:     false,
  wetArea:     false,
}

export function useStore() {
  const [config, setConfigState] = useState(() => DEFAULT_CONFIG)
  const [configs, setConfigs]    = useState(() => loadFromStorage(STORAGE_KEYS.configs, []))
  const [library, setLibraryState] = useState(() => loadFromStorage(STORAGE_KEYS.library, DEFAULT_LIBRARY))
  const [libNextId, setLibNextId]  = useState(100)

  const updateConfig = useCallback((updates) => {
    setConfigState(prev => ({ ...prev, ...updates }))
  }, [])

  const resetConfig = useCallback(() => {
    setConfigState(DEFAULT_CONFIG)
  }, [])

  const saveConfig = useCallback((name) => {
    const entry = {
      id:   Date.now(),
      name: name || `Config ${configs.length + 1}`,
      date: new Date().toLocaleDateString(),
      config,
    }
    const next = [...configs, entry]
    setConfigs(next)
    saveToStorage(STORAGE_KEYS.configs, next)
    return entry
  }, [config, configs])

  const loadConfig = useCallback((id) => {
    const found = configs.find(c => c.id === id)
    if (found) setConfigState(found.config)
  }, [configs])

  const deleteConfig = useCallback((id) => {
    const next = configs.filter(c => c.id !== id)
    setConfigs(next)
    saveToStorage(STORAGE_KEYS.configs, next)
  }, [configs])

  const addLibEntry = useCallback(({ name, cat, thick, notes }) => {
    const entry = { id: libNextId, name, cat, thick: parseFloat(thick), notes: notes || '' }
    setLibNextId(n => n + 1)
    const next = [...library, entry]
    setLibraryState(next)
    saveToStorage(STORAGE_KEYS.library, next)
  }, [library, libNextId])

  const deleteLibEntry = useCallback((id) => {
    const next = library.filter(l => l.id !== id)
    setLibraryState(next)
    saveToStorage(STORAGE_KEYS.library, next)
  }, [library])

  const resetLibrary = useCallback(() => {
    setLibraryState(DEFAULT_LIBRARY)
    saveToStorage(STORAGE_KEYS.library, DEFAULT_LIBRARY)
  }, [])

  return {
    config, updateConfig, resetConfig,
    configs, saveConfig, loadConfig, deleteConfig,
    library, addLibEntry, deleteLibEntry, resetLibrary,
  }
}
