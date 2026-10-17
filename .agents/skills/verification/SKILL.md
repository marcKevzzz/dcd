---
name: verification
description: >-
  Runs full production validation, type checking, bundle inspection, and accessibility verification
  for the dcd. portfolio.
---

# Production Verification Skill

Use this procedure before pushing commits or creating pull requests.

## 1. Automated Verification Steps
1. Run TypeScript check & Vite build:
   ```bash
   npm run build
   ```
   Must exit with code 0. No typescript errors or unhandled bundle warnings.
2. Check preview server:
   ```bash
   npm run preview
   ```

## 2. Interactive & Accessibility Verification Checklist
- [ ] **Shortcut Navigation**: Press `Ctrl+K` (or `Cmd+K`). The native dialog opens, focus moves to the search input. Search filters actions. Arrow keys move selection. `Enter` triggers action. `Escape` closes and restores focus.
- [ ] **Theme Switching**: Click theme toggle button in header. Circular view-transition clips smoothly between dark and light themes without flashing unstyled content.
- [ ] **Reduced Motion**: Verify that animations degrade to static layouts when `prefers-reduced-motion: reduce` is active.
- [ ] **Responsive Viewports**: Check layout at 375px (mobile), 768px (tablet), 1200px (desktop), and 1600px+ (ultrawide). Ensure no horizontal overflow occurs.
