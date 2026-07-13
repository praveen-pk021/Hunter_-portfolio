import { AppProviders } from '@/app/AppProviders'
import { ErrorBoundary } from '@/app/ErrorBoundary'
import { AppRouter } from '@/router/AppRouter'

/** Application composition root. */
export function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </ErrorBoundary>
  )
}
