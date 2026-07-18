import { AppProviders } from '@/app/AppProviders'
import { BootModule } from '@/app/BootModule'
import { ErrorBoundary } from '@/app/ErrorBoundary'
import { DeveloperConsole } from '@/components/developer/DeveloperConsole'
import { ShadowArise } from '@/components/effects/ShadowArise'
import { AppRouter } from '@/router/AppRouter'

/** Application composition root. */
export function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <BootModule>
          <AppRouter />
          <DeveloperConsole />
          <ShadowArise />
        </BootModule>
      </AppProviders>
    </ErrorBoundary>
  )
}
