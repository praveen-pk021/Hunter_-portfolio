import { useEffect } from 'react'

/** Fine-pointer enhancement: an original energy cursor with a lightweight particle trail. */
export function CrystalCursor() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined
    const cursor = document.querySelector<HTMLElement>('[data-crystal-cursor]')
    const trail = document.querySelector<HTMLElement>('[data-crystal-trail]')
    if (!cursor || !trail) return undefined
    let lastParticle = 0
    const move = (event: PointerEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
      const now = performance.now()
      if (now - lastParticle < 55) return
      lastParticle = now
      const particle = document.createElement('i')
      particle.style.left = `${event.clientX}px`
      particle.style.top = `${event.clientY}px`
      trail.append(particle)
      window.setTimeout(() => particle.remove(), 650)
    }
    const click = (event: PointerEvent) => {
      const ripple = document.createElement('i')
      ripple.className = 'magic-ripple'
      ripple.style.left = `${event.clientX}px`
      ripple.style.top = `${event.clientY}px`
      trail.append(ripple)
      window.setTimeout(() => ripple.remove(), 800)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerdown', click)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', click)
    }
  }, [])
  return (
    <>
      <span className="crystal-cursor" data-crystal-cursor aria-hidden="true">
        <i />
      </span>
      <span className="crystal-trail" data-crystal-trail aria-hidden="true" />
    </>
  )
}
