import { Arrow } from '../common/Arrow'
import { NAV_LINKS } from '../../data/navigation'

interface HeaderProps {
  progress: number
  light: boolean
  onToggleTheme: (e?: React.MouseEvent) => void
}

export function Header({ progress, light, onToggleTheme }: HeaderProps) {
  return (
    <header className={`header ${progress > 0 ? 'is-scrolled' : ''}`}>
      <a href="#home" className="brand" aria-label="dcd. home">
        dcd<span className="accent">.</span>
      </a>

      <nav aria-label="Main navigation">
        {NAV_LINKS.map(link => (
          <a key={link.id} href={`#${link.id}`} className="nav-link">
            <small>{link.number}</small>{' '}
            <span className="nav-label">
              <span className="nav-label-inner" data-label={link.label}>
                {link.label}
              </span>
            </span>
          </a>
        ))}
      </nav>

      <div className="header-controls">
        <button
          className="circle-button"
          aria-label={`Switch to ${light ? 'dark' : 'light'} theme`}
          onClick={onToggleTheme}
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18">
            <circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" />
            <path d="M10 3.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" />
          </svg>
        </button>
        <a href="#work" className="button button-small">
          Explore the work <Arrow />
        </a>
      </div>

      <div className="nav-ruler" aria-hidden="true">
        <div className="ruler-track" />
        <div className="ruler-progress" style={{ width: `${progress}%` }} />
        <span
          className="ruler-marker mono"
          style={{ left: `clamp(16px, ${progress}%, calc(100% - 16px))` }}
        >
          {String(progress).padStart(2, '0')}%
        </span>
      </div>
    </header>
  )
}
