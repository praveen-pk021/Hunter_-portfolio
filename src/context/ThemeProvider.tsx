import { type PropsWithChildren, useEffect, useMemo, useState } from 'react'
import { ThemeContext } from '@/context/ThemeContext'

/** Exposes global display preferences while retaining the system motion preference. */
export function ThemeProvider({ children }: PropsWithChildren) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.contrast = highContrast ? 'high' : 'standard'
  }, [highContrast])

  const value = useMemo(
    () => ({
      prefersReducedMotion,
      highContrast,
      toggleHighContrast: () => setHighContrast((current) => !current),
    }),
    [highContrast, prefersReducedMotion],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
