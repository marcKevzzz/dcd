# dcd. implementation plan

Goal: ship the approved reference-led React portfolio.
Architecture: Vite entry, a composed App, typed project data, shared CSS tokens and Tailwind utilities. GSAP scoped to component lifecycle; native dialog handles shortcut focus.
Spec: docs/superpowers/specs/2026-10-17-dcd-portfolio-design.md

1. Create Vite/React/TypeScript/Tailwind configuration and install GSAP and local font packages.
2. Implement Header, Hero, Manifesto, SelectedWork, Team, Footer and ShortcutMenu; copy supplied assets.
3. Add scoped intro and scroll motion, theme/grid shortcuts and accessible project disclosure.
4. Build and typecheck; verify keyboard interactions and responsive overflow with a small browser smoke test. Inspect desktop and mobile once, resolve material findings and document limits.

Review focus: reduced motion, menu focus restoration, empty search, small screens, unavailable project URLs. No fabricated team identities or telemetry.
