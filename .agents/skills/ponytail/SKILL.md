---
name: ponytail
description: >-
  Audits code changes, eliminates over-engineering and code bloat, challenges unnecessary dependencies,
  and enforces the Ponytail Laziness Ladder. Use whenever writing or reviewing code in the dcd. portfolio.
---

# Ponytail Code Review & Optimization Skill

Use this skill to inspect prospective changes, pull requests, or refactorings against the Ponytail philosophy.

## The Ponytail Audit Procedure

When evaluating or writing code, step through these questions in order:

### 1. The Laziness Ladder Checklist
1. **YAGNI Check**:
   - Is this code solving an actual problem, or a hypothetical future requirement?
   - Can the entire feature or function be skipped?
2. **Reuse Check**:
   - Is there already a helper in `src/hooks/` or a component in `src/components/` that can be reused?
   - Can we import from `src/data/` rather than defining new constants?
3. **Standard Library Check**:
   - Can modern standard JavaScript/TypeScript APIs (`Array.filter`, `Math.hypot`, `Set`, `URL`) accomplish this without custom utility functions?
4. **Native Platform Check**:
   - Can native browser elements (e.g. `<dialog>`, `details/summary`, CSS custom properties, View Transitions) replace custom JS implementations?
5. **Existing Dependencies Check**:
   - Can GSAP, Lenis, or standard React 19 hooks handle this?
   - **Reject any PR introducing a new npm dependency** unless explicitly justified and approved.
6. **One-Line Challenge**:
   - Can this 10-line block be expressed clearly in 1 or 2 lines?
7. **Minimal Solution**:
   - Is this the minimum amount of code that fulfills the requirement?

### 2. Safety & Correctness Gate (Never Compromise)
- [ ] No `any` types introduced.
- [ ] Keyboard navigation preserved (Esc, Tab, Arrow keys).
- [ ] Screen reader annotations (`aria-label`, `aria-hidden`) preserved.
- [ ] `prefers-reduced-motion` respected (animations disable gracefully).
- [ ] Cleanup functions implemented in all `useEffect` hooks.
- [ ] `npm run build` succeeds without compiler warnings or errors.
