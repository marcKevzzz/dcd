import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import type Lenis from 'lenis'
import type { NavAction } from '../types/navigation'

interface UseShortcutsProps {
  smoothScroll: React.RefObject<Lenis | null>
  onToggleTheme: (e?: React.MouseEvent) => void
  onNavigate: (id: string) => void
}

export function useShortcuts({ smoothScroll, onToggleTheme, onNavigate }: UseShortcutsProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)

  const actions: NavAction[] = useMemo(
    () => [
      { label: 'Home', hint: '/', run: () => onNavigate('home') },
      { label: 'Selected work', hint: '/work', run: () => onNavigate('work') },
      { label: 'Services', hint: '/services', run: () => onNavigate('services') },
      { label: 'Our approach', hint: '/approach', run: () => onNavigate('approach') },
      { label: 'The team', hint: '/team', run: () => onNavigate('team') },
      { label: 'Toggle light / dark', hint: 'THEME', run: (e?: React.MouseEvent) => onToggleTheme(e) },
    ],
    [onNavigate, onToggleTheme]
  )

  const filteredActions = useMemo(() => {
    return actions.filter(action => action.label.toLowerCase().includes(query.toLowerCase()))
  }, [actions, query])

  const closeMenu = useCallback(() => {
    dialogRef.current?.close()
    smoothScroll.current?.start()
    previousFocus.current?.focus()
  }, [smoothScroll])

  const openMenu = useCallback(() => {
    previousFocus.current = document.activeElement as HTMLElement
    setQuery('')
    setSelected(0)
    dialogRef.current?.showModal()
    smoothScroll.current?.stop()
    searchRef.current?.focus()
  }, [smoothScroll])

  const navigateAndClose = useCallback(
    (id: string) => {
      closeMenu()
      onNavigate(id)
    },
    [closeMenu, onNavigate]
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        if (dialogRef.current?.open) {
          closeMenu()
        } else {
          openMenu()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [closeMenu, openMenu])

  return {
    dialogRef,
    searchRef,
    query,
    setQuery,
    selected,
    setSelected,
    filteredActions,
    openMenu,
    closeMenu,
    navigateAndClose,
  }
}
