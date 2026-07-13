import { render, screen } from '@testing-library/react'
import { App } from '@/App'

describe('App', () => {
  it('renders the foundation readiness screen', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Hunter System Foundation Ready' })).toBeVisible()
  })
})
