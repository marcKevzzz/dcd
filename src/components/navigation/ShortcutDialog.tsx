import type { RefObject } from 'react'
import type { NavAction } from '../../types/navigation'

interface ShortcutDialogProps {
  dialogRef: RefObject<HTMLDialogElement | null>
  searchRef: RefObject<HTMLInputElement | null>
  query: string
  selected: number
  filteredActions: NavAction[]
  onQueryChange: (value: string) => void
  onSelectChange: (index: number) => void
  onClose: () => void
}

export function ShortcutDialog({
  dialogRef,
  searchRef,
  query,
  selected,
  filteredActions,
  onQueryChange,
  onSelectChange,
  onClose,
}: ShortcutDialogProps) {
  return (
    <dialog
      ref={dialogRef}
      className="shortcut-dialog"
      data-lenis-prevent
      onCancel={onClose}
      onClick={event => {
        if (event.target === dialogRef.current) onClose()
      }}
      aria-label="Shortcut navigation"
    >
      <div className="command-search">
        <label htmlFor="command-search" className="mono">
          ⌘ K
        </label>
        <input
          id="command-search"
          ref={searchRef}
          value={query}
          placeholder="Search pages and actions…"
          autoComplete="off"
          onChange={event => {
            onQueryChange(event.target.value)
            onSelectChange(0)
          }}
          onKeyDown={event => {
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault()
              onSelectChange(
                filteredActions.length
                  ? (selected + (event.key === 'ArrowDown' ? 1 : -1) + filteredActions.length) % filteredActions.length
                  : 0
              )
            }
            if (event.key === 'Enter' && filteredActions[selected]) {
              event.preventDefault()
              filteredActions[selected].run()
              onClose()
            }
          }}
          aria-controls="command-results"
          aria-activedescendant={filteredActions[selected] ? `command-${selected}` : undefined}
          role="combobox"
          aria-expanded="true"
          aria-autocomplete="list"
        />
        <button onClick={onClose} className="mono" aria-label="Close shortcut menu">
          ESC
        </button>
      </div>

      <p className="mono command-label">GO TO / DO</p>

      <div id="command-results" role="listbox" aria-label="Pages and actions">
        {filteredActions.length ? (
          filteredActions.map((action, index) => (
            <button
              role="option"
              aria-selected={selected === index}
              id={`command-${index}`}
              className={selected === index ? 'selected' : ''}
              key={action.label}
              onMouseEnter={() => onSelectChange(index)}
              onClick={() => {
                action.run()
                onClose()
              }}
            >
              {action.label}
              <span className="mono">{action.hint}</span>
            </button>
          ))
        ) : (
          <p className="empty-results">No matches. Try “work”, “team”, or “theme”.</p>
        )}
      </div>

      <div className="command-footer mono">
        ↑ ↓ NAVIGATE <span>ENTER TO SELECT</span>
      </div>
    </dialog>
  )
}
