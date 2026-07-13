import { createContext } from 'react'
import { EventBus } from '@/engine/event-bus/EventBus'
import type { HunterSystemEventMap } from '@/engine/event-bus/EventTypes'

export const EventBusContext = createContext<EventBus<HunterSystemEventMap> | null>(null)
