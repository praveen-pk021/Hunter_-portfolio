import { useContext } from 'react'
import { EventBusContext } from '@/engine/event-bus/EventBusContextValue'
import type { HunterSystemEventMap } from '@/engine/event-bus/EventTypes'
import type { EventBus } from '@/engine/event-bus/EventBus'

/** Returns the shared Event Bus for typed module communication. */
export function useEventBus(): EventBus<HunterSystemEventMap> {
  const eventBus = useContext(EventBusContext)
  if (!eventBus) throw new Error('useEventBus must be used within EventBusProvider.')
  return eventBus
}
