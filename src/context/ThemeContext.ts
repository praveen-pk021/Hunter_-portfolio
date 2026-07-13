import { createContext } from 'react'

export interface ThemeContextValue {
  prefersReducedMotion: boolean
  highContrast: boolean
  toggleHighContrast: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
