import { render, screen } from '@testing-library/react'
import { App } from '@/App'

describe('App', () => {
  it('boots into the portfolio scene', async () => {
    render(<App />)
    expect(await screen.findByRole('heading', { name: /K\. Praveen Kumar/i })).toBeVisible()
  })
})
