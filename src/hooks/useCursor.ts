import { useEffect } from 'react'
import gsap from 'gsap'

export function useCursor() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    document.documentElement.classList.add('has-cursor')
    const cursor = document.querySelector<HTMLElement>('.cursor')
    const ch = cursor?.querySelector<HTMLElement>('.cursor__h')
    const cv = cursor?.querySelector<HTMLElement>('.cursor__v')
    const cpt = cursor?.querySelector<HTMLElement>('.cursor__pt')
    const clabel = cursor?.querySelector<HTMLElement>('.cursor__label')

    if (!cursor || !ch || !cv || !cpt || !clabel) return

    const setH = gsap.quickTo(ch, 'y', { duration: 0.08, ease: 'power3.out' })
    const setV = gsap.quickTo(cv, 'x', { duration: 0.08, ease: 'power3.out' })
    const setPtX = gsap.quickTo(cpt, 'x', { duration: 0.16, ease: 'power3.out' })
    const setPtY = gsap.quickTo(cpt, 'y', { duration: 0.16, ease: 'power3.out' })

    let hoveredEl: HTMLElement | null = null
    let magneticEl: HTMLElement | null = null

    const onMove = (e: MouseEvent) => {
      cursor.classList.add('is-visible')
      setH(e.clientY)
      setV(e.clientX)
      setPtX(e.clientX)
      setPtY(e.clientY)

      if (!hoveredEl) {
        clabel.textContent = `x ${String(Math.round(e.clientX)).padStart(4, '0')} · y ${String(Math.round(e.clientY)).padStart(4, '0')}`
      }

      const targetBtn = (e.target as HTMLElement)?.closest<HTMLElement>('.button, .circle-button')
      if (targetBtn !== magneticEl) {
        if (magneticEl) gsap.to(magneticEl, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
        magneticEl = targetBtn
      }
      if (magneticEl) {
        const rect = magneticEl.getBoundingClientRect()
        gsap.to(magneticEl, {
          x: (e.clientX - (rect.left + rect.width / 2)) * 0.22,
          y: (e.clientY - (rect.top + rect.height / 2)) * 0.28,
          duration: 0.3,
          ease: 'power3.out',
        })
      }
    }

    const onOver = (e: MouseEvent) => {
      const interactive = (e.target as HTMLElement)?.closest<HTMLElement>('a, button, summary, details, [data-cursor]')
      if (interactive !== hoveredEl) {
        hoveredEl = interactive
        cursor.classList.toggle('is-hover', !!interactive)
        if (interactive) {
          clabel.textContent =
            interactive.dataset.cursor ??
            (interactive.tagName === 'A' && (interactive as HTMLAnchorElement).target === '_blank'
              ? 'visit ↗'
              : interactive.tagName === 'A'
              ? 'open →'
              : 'click')
        }
      }
    }

    const onLeave = () => cursor.classList.remove('is-visible')
    const onDown = () => cursor.classList.add('is-down')
    const onUp = () => cursor.classList.remove('is-down')

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])
}
