# Ponytail Engineering Standard

> "He says nothing. He writes one line. It works." — Dietrich Gebert

Ponytail is the guiding philosophy of the pragmatic, minimalist senior developer:
**The best code is the code you never wrote.**

AI agents and team developers must resist over-engineering, premature abstractions, speculative flexibility, and gratuitous dependencies. Before adding new code or packages, climb the **Laziness Ladder** in order, stopping at the first level that solves the requirement.

---

## The Laziness Ladder

```
[7] Minimum Code That Actually Works (Default fallback)
[6] The One-Line Solution (Can it be condensed without losing clarity?)
[5] Already-Installed Dependency (Can existing packages solve it?)
[4] Native Platform Feature (Browser HTML5/CSS/DOM primitives)
[3] Standard Library (Built-in JavaScript/TypeScript language APIs)
[2] Existing Code & Reuse (Helpers, components, styles already in repo)
[1] YAGNI (Does this feature or code even need to exist?)
```

1. **YAGNI (You Aren't Gonna Need It)**:
   - Challenge every new requirement and speculative abstraction.
   - Do not build configurability for things that have a single use case.
   - Do not write wrapper components around wrappers.
2. **Existing Code & Reuse**:
   - Check `src/data/`, `src/hooks/`, `src/components/`, and `src/index.css` before writing new logic.
   - Reuse existing design tokens, typography styles, and SVG components (`Arrow`, `Blueprint`).
3. **Standard Library**:
   - Prefer modern built-in JavaScript/TypeScript methods (`Math.hypot`, `Array.prototype.find`, `Object.fromEntries`, `URL`, `Set`) over utility libraries.
4. **Native Platform Features**:
   - Use native `<dialog>` for modal/command dialogs with `showModal()` and `close()`.
   - Use CSS custom properties (`var(--...)`) and View Transitions API (`document.startViewTransition`) for animations and themes.
   - Use native HTML elements (`details`, `summary`, `dialog`, semantic landmarks) for built-in accessibility.
5. **Already-Installed Dependencies**:
   - We already have: `react`, `react-dom`, `gsap`, `lenis`, `tailwindcss`, `@fontsource-variable/archivo`, `@fontsource/ibm-plex-mono`.
   - **Never install new npm packages** without explicit project stakeholder consensus.
6. **The One-Line Solution**:
   - If a function or component can be expressed cleanly in fewer lines, do it. Brevity aids readability and lowers bug surface.
7. **The Default Fallback**:
   - Write the cleanest, most concise implementation that satisfies the acceptance criteria.

---

## The Non-Negotiable Safety Floor

Ponytail is lazy about complexity, but **rigorous about correctness and production safety**:
- **Accessibility (A11y)**: Never skip `aria-*`, focus management, keyboard navigation (ESC, arrows, Enter), or `prefers-reduced-motion`.
- **Type Safety**: No `any` escapes. Strictly type props, models, and API boundaries.
- **Error Boundaries & Fallbacks**: Graceful fallback if experimental APIs (e.g., View Transitions) are unavailable in a browser.
- **Brand Fidelity**: Retain the dcd. identity and design system faithfully.
