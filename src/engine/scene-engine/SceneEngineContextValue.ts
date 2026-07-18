import { createContext } from 'react'
import type { SceneEngine } from '@/engine/scene-engine/SceneEngine'

export const SceneEngineContext = createContext<SceneEngine | null>(null)
