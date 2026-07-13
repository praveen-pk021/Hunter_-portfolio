import { type PropsWithChildren, useRef } from 'react'
import { EventBus } from '@/engine/event-bus/EventBus'
import { EventBusContext } from '@/engine/event-bus/EventBusContextValue'
import type { HunterSystemEventMap } from '@/engine/event-bus/EventTypes'

/** Provides one stable Event Bus instance for the complete visitor session. */
export function EventBusProvider({ children }: PropsWithChildren) {
  const eventBus = useRef<EventBus<HunterSystemEventMap>>(new EventBus<HunterSystemEventMap>())
  return <EventBusContext.Provider value={eventBus.current}>{children}</EventBusContext.Provider>
}
