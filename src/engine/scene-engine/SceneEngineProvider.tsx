import { type PropsWithChildren, useContext, useRef } from 'react'
import { EventBusContext } from '@/engine/event-bus/EventBusContextValue'
import { SceneEngine } from '@/engine/scene-engine/SceneEngine'
import { SceneEngineContext } from '@/engine/scene-engine/SceneEngineContextValue'

/** Provides a single Scene Engine that depends on the shared Event Bus. */
export function SceneEngineProvider({ children }: PropsWithChildren) {
  const eventBus = useContext(EventBusContext)
  if (!eventBus) throw new Error('SceneEngineProvider must be used within EventBusProvider.')
  const sceneEngine = useRef<SceneEngine>(new SceneEngine(eventBus))
  return (
    <SceneEngineContext.Provider value={sceneEngine.current}>
      {children}
    </SceneEngineContext.Provider>
  )
}
