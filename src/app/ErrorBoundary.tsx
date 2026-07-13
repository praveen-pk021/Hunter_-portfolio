import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

/** Provides an accessible system-level fallback for unexpected rendering errors. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false }

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  public componentDidCatch(_error: Error, _errorInfo: ErrorInfo): void {
    // Error reporting can be connected through a service when one is introduced.
    void _error
    void _errorInfo
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <main className="system-fallback" aria-labelledby="system-warning-title">
          <p className="system-label">SYSTEM WARNING</p>
          <h1 id="system-warning-title">Recovery protocol required.</h1>
          <p>
            The Hunter System could not complete this operation. Reload to re-establish the link.
          </p>
          <button type="button" onClick={() => window.location.reload()}>
            REINITIALIZE SYSTEM
          </button>
        </main>
      )
    }

    return this.props.children
  }
}
