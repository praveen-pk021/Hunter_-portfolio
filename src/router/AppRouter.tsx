import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FoundationReady } from '@/app/FoundationReady'

/** Provides the application route boundary for future scene routing. */
export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FoundationReady />} />
      </Routes>
    </BrowserRouter>
  )
}
