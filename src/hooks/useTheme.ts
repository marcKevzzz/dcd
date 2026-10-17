import { useState, useCallback } from 'react'
import { flushSync } from 'react-dom'

export function useTheme() {
  const [light, setLight] = useState(false)

  const toggleTheme = useCallback((e?: React.MouseEvent) => {
    let x = window.innerWidth - 80
    let y = 46

    if (e && e.clientX !== undefined) {
      const rect = (e.currentTarget as HTMLElement)?.getBoundingClientRect?.()
      if (rect) {
        x = rect.left + rect.width / 2
        y = rect.top + rect.height / 2
      } else {
        x = e.clientX
        y = e.clientY
      }
    } else {
      const btn = document.querySelector<HTMLElement>('.circle-button')
      if (btn) {
        const rect = btn.getBoundingClientRect()
        x = rect.left + rect.width / 2
        y = rect.top + rect.height / 2
      }
    }

    if (!document.startViewTransition) {
      setLight(prev => !prev)
      return
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setLight(prev => !prev)
      })
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 650,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    })
  }, [])

  return { light, toggleTheme }
}
