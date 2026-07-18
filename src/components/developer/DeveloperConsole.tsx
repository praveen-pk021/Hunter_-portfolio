import { useEffect, useState } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { useEventBus } from '@/engine/event-bus'
import { useSceneEngine } from '@/engine/scene-engine'

const DEVELOPMENT_BUILD = import.meta.env.DEV

/** Development-only diagnostics panel for live Core Engine inspection. */
export function DeveloperConsole() {
  const [isOpen, setIsOpen] = useState(false)
  const [eventVersion, setEventVersion] = useState(0)
  const eventBus = useEventBus()
  const { state: sceneState } = useSceneEngine()
  const { highContrast, prefersReducedMotion } = useTheme()

  useEffect(() => {
    if (!DEVELOPMENT_BUILD) return undefined
    return eventBus.observe(() => setEventVersion((version) => version + 1))
  }, [eventBus])

  useEffect(() => {
    if (!DEVELOPMENT_BUILD) return undefined
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'd') {
        event.preventDefault()
        setIsOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!DEVELOPMENT_BUILD || !isOpen) return null

  const history = eventBus.getHistory()
  void eventVersion

  return (
    <aside className="developer-console" aria-label="Developer diagnostics">
      <header>
        <strong>DEVELOPER CONSOLE</strong>
        <span>CTRL + SHIFT + D</span>
      </header>
      <dl>
        <div>
          <dt>ACTIVE MODULE</dt>
          <dd>{sceneState.currentSceneId ?? 'Foundation'}</dd>
        </div>
        <div>
          <dt>LIFECYCLE</dt>
          <dd>{sceneState.lifecycle}</dd>
        </div>
        <div>
          <dt>EVENTS</dt>
          <dd>{history.length}</dd>
        </div>
        <div>
          <dt>QUEUE</dt>
          <dd>{eventBus.getQueueSize()}</dd>
        </div>
        <div>
          <dt>RENDER FPS</dt>
          <dd>Render engine not initialized</dd>
        </div>
        <div>
          <dt>MEMORY</dt>
          <dd>Unavailable</dd>
        </div>
        <div>
          <dt>NOTIFICATIONS</dt>
          <dd>SYSTEM CORE not initialized</dd>
        </div>
        <div>
          <dt>EXPLORER</dt>
          <dd>Explorer engine not initialized</dd>
        </div>
        <div>
          <dt>THEME</dt>
          <dd>{highContrast ? 'High contrast' : 'Hunter Blue'}</dd>
        </div>
        <div>
          <dt>MOTION</dt>
          <dd>{prefersReducedMotion ? 'Reduced' : 'Standard'}</dd>
        </div>
      </dl>
      <ol aria-label="Recent Event Bus traffic">
        {history
          .slice(-5)
          .reverse()
          .map((event) => (
            <li key={event.id}>{event.type}</li>
          ))}
      </ol>
    </aside>
  )
}
