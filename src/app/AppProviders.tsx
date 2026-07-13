import type { PropsWithChildren } from 'react'
import { ThemeProvider } from '@/context/ThemeProvider'

/** Registers application-wide providers in dependency order. */
export function AppProviders({ children }: PropsWithChildren) {
  return <ThemeProvider>{children}</ThemeProvider>
}
