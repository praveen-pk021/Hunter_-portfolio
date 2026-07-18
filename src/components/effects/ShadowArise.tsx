import { useEffect } from 'react'

/** Sharp shadow-thunder pointer with brief shadow-command feedback for clicks. */
export function ShadowArise() {
  useEffect(() => {
    const ariseLayer = document.querySelector<HTMLElement>('[data-shadow-arise]')
    if (!ariseLayer) return undefined
    const thunderCursor = document.querySelector<HTMLElement>('[data-shadow-thunder-cursor]')
    if (!thunderCursor) return undefined

    const moveThunder = (event: PointerEvent) => {
      thunderCursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
    }

    const summonShadow = (event: PointerEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const mark = document.createElement('span')
      mark.className = 'shadow-arise-mark'
      mark.style.left = `${event.clientX}px`
      mark.style.top = `${event.clientY}px`
      mark.innerHTML = '<i></i><b>ARISE</b>'
      ariseLayer.append(mark)
      window.setTimeout(() => mark.remove(), 950)
    }

    window.addEventListener('pointermove', moveThunder)
    window.addEventListener('pointerdown', summonShadow)
    return () => {
      window.removeEventListener('pointermove', moveThunder)
      window.removeEventListener('pointerdown', summonShadow)
    }
  }, [])

  return (
    <>
      <span className="shadow-thunder-cursor" data-shadow-thunder-cursor aria-hidden="true">
        <i />
        <i />
      </span>
      <span className="shadow-arise-layer" data-shadow-arise aria-hidden="true" />
    </>
  )
}
