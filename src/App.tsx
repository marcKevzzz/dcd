import { useRef } from 'react'
import { useTheme } from './hooks/useTheme'
import { useCursor } from './hooks/useCursor'
import { useLenisScroll } from './hooks/useLenisScroll'
import { useShortcuts } from './hooks/useShortcuts'
import { Cursor } from './components/layout/Cursor'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Approach } from './components/sections/Approach'
import { WorkStage } from './components/sections/WorkStage'
import { Services } from './components/sections/Services'
import { Team } from './components/sections/Team'
import { ShortcutDialog } from './components/navigation/ShortcutDialog'

export default function App() {
  const root = useRef<HTMLDivElement>(null)
  const { light, toggleTheme } = useTheme()
  useCursor()

  const {
    smoothScroll,
    progress,
    activeWork,
    stageIndex,
    stageFill,
    scrollTo,
  } = useLenisScroll(root)

  const {
    dialogRef,
    searchRef,
    query,
    setQuery,
    selected,
    setSelected,
    filteredActions,
    openMenu,
    closeMenu,
  } = useShortcuts({
    smoothScroll,
    onToggleTheme: toggleTheme,
    onNavigate: id => scrollTo(`#${id}`),
  })

  return (
    <div id="home" ref={root} className={`portfolio ${light ? 'light' : ''}`}>
      <Cursor />
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header progress={progress} light={light} onToggleTheme={toggleTheme} />

      <main id="main">
        <Hero />
        <Approach />
        <WorkStage activeWork={activeWork} stageIndex={stageIndex} stageFill={stageFill} />
        <Services />
        <Team />
      </main>

      <Footer onOpenMenu={openMenu} />

      <ShortcutDialog
        dialogRef={dialogRef}
        searchRef={searchRef}
        query={query}
        selected={selected}
        filteredActions={filteredActions}
        onQueryChange={setQuery}
        onSelectChange={setSelected}
        onClose={closeMenu}
      />
    </div>
  )
}
