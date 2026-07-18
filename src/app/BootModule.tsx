import { useEffect, useState } from 'react'
import { useEventBus } from '@/engine/event-bus'

/** Performs the minimum deterministic startup sequence for application scenes. */
export function BootModule({ children }: { children: React.ReactNode }) {
  const eventBus = useEventBus()
  const [canEnter, setCanEnter] = useState(false)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    eventBus.publish({ type: 'BootStarted', source: 'boot', payload: {} })
    const accessTimer = window.setTimeout(() => setCanEnter(true), 2000)
    return () => window.clearTimeout(accessTimer)
  }, [eventBus])

  function enterSystem() {
    setEntered(true)
    eventBus.publish({ type: 'BootCompleted', source: 'boot', payload: {} })
  }

  return (
    <>
      {children}
      {!entered ? (
        <section className="system-boot" aria-label="Hunter System boot sequence">
          <div className="boot-particles" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="boot-portal" aria-hidden="true" />
          <div className="boot-console">
            <p className="system-label">SYSTEM // AWAKENING SEQUENCE</p>
            <h1>The System has selected a new Hunter.</h1>
            <p className="boot-message">A new Hunter has awakened.</p>
            <dl>
              <div>
                <dt>Name</dt>
                <dd>CLASSIFIED</dd>
              </div>
              <div>
                <dt>Rank</dt>
                <dd>Unknown</dd>
              </div>
              <div>
                <dt>Potential</dt>
                <dd>Unlimited</dd>
              </div>
            </dl>
            <div className="boot-log" aria-live="polite">
              {canEnter
                ? 'ACCESS GRANTED. THE SHADOW GATE IS OPEN.'
                : 'INITIALIZING… LOADING HUNTER DATA…'}
            </div>
            {canEnter ? (
              <button type="button" onClick={enterSystem}>
                Enter the system <span aria-hidden="true">→</span>
              </button>
            ) : (
              <span className="boot-progress" />
            )}
          </div>
        </section>
      ) : null}
    </>
  )
}
