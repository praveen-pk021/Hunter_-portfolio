import type { PropsWithChildren } from 'react'
import { ThemeProvider } from '@/context/ThemeProvider'
import { EventBusProvider } from '@/engine/event-bus'

/** Registers application-wide providers in dependency order. */
export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <EventBusProvider>{children}</EventBusProvider>
    </ThemeProvider>
  )
}
