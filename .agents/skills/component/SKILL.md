---
name: component
description: >-
  Scaffolds or refactors a React component following dcd.'s blueprint design system,
  TypeScript standards, and Ponytail principles.
---

# Component Creation & Refactoring Skill

Follow this standardized procedure whenever introducing or modifying a component in the dcd. portfolio.

## 1. Directory Determination
Place the new component in the appropriate subdirectory:
- Low-level primitives (buttons, icons, indicators): `src/components/common/`
- Structural shell (headers, footers, persistent overlays): `src/components/layout/`
- Dialogs, drawers, palette menus: `src/components/navigation/`
- Full-width page sections: `src/components/sections/`
- Diagrams, drawings, and case visualizers: `src/components/work/`

## 2. Standard Component Template

```tsx
import type { FC } from 'react'

interface MyComponentProps {
  title: string
  isActive?: boolean
  onAction?: () => void
}

export function MyComponent({ title, isActive = false, onAction }: MyComponentProps) {
  return (
    <div className={`my-component ${isActive ? 'is-active' : ''}`}>
      <h3 className="mono">{title}</h3>
      {onAction && (
        <button type="button" onClick={onAction} className="button button-small">
          Execute
        </button>
      )}
    </div>
  )
}
```

## 3. Checklist
- [ ] Explicit props interface with strict types.
- [ ] Named export (e.g., `export function MyComponent(...)`).
- [ ] No inline anonymous event handlers that trigger unnecessary re-renders.
- [ ] Styling uses semantic tokens from `index.css` (e.g. `mono`, `section-shell`, `button`).
- [ ] Verified via `npm run build`.
