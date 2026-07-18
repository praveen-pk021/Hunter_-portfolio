import { useContext, useSyncExternalStore } from 'react'
import { SceneEngineContext } from '@/engine/scene-engine/SceneEngineContextValue'
import type { SceneEngineState } from '@/engine/scene-engine/SceneTypes'
import type { SceneEngine } from '@/engine/scene-engine/SceneEngine'

/** Returns the Scene Engine and its live navigation state. */
export function useSceneEngine(): { sceneEngine: SceneEngine; state: SceneEngineState } {
  const sceneEngine = useContext(SceneEngineContext)
  if (!sceneEngine) throw new Error('useSceneEngine must be used within SceneEngineProvider.')
  const state = useSyncExternalStore(
    (listener) => sceneEngine.subscribe(listener),
    () => sceneEngine.getState(),
    () => sceneEngine.getState(),
  )
  return { sceneEngine, state }
}
