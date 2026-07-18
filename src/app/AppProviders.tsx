import type { PropsWithChildren } from 'react'
import { ThemeProvider } from '@/context/ThemeProvider'
import { EventBusProvider } from '@/engine/event-bus'
import { SceneEngineProvider } from '@/engine/scene-engine'

/** Registers application-wide providers in dependency order. */
export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <EventBusProvider>
        <SceneEngineProvider>{children}</SceneEngineProvider>
      </EventBusProvider>
    </ThemeProvider>
  )
}
