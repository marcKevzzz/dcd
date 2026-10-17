---
name: dcd.
description: Four developers, connected thinking.
colors:
  background: '#0c0c0b'
  foreground: '#eeeee8'
  muted: '#a2a29b'
  border: '#30302d'
  primary: '#7385ff'
  blueprint-line: '#7385ff29'
  light-background: '#eeeee8'
  light-foreground: '#181918'
  light-muted: '#595b56'
  light-border: '#c9cbc2'
  light-primary: '#3d50ce'
  light-blueprint-line: '#3d50ce28'
typography:
  display:
    fontFamily: 'Archivo Variable, sans-serif'
    fontSize: 'clamp(90px, 11.4vw, 174px)'
    fontWeight: 550
    lineHeight: 0.94
    letterSpacing: '-0.04em'
  headline:
    fontFamily: 'Archivo Variable, sans-serif'
    fontSize: 'clamp(48px, 6.2vw, 90px)'
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: '-0.035em'
  body:
    fontFamily: 'Archivo Variable, sans-serif'
    fontSize: 14px
    lineHeight: 1.65
  label:
    fontFamily: 'IBM Plex Mono, monospace'
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: '0.025em'
rounded:
  action: 40px
  dialog: 14px
  command-option: 6px
components:
  button-primary:
    backgroundColor: '{colors.foreground}'
    textColor: '{colors.background}'
    rounded: '{rounded.action}'
    padding: '14px 23px'
  button-primary-hover:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.background}'
---
# Design System: dcd.

## Overview
Experience mode: a dark blueprint portfolio, adapted from the approved Pier Gorelli reference to dcd. branding and supplied project content. Oversized typography, measured annotations and conceptual system drawings connect the presentation.

## Colors
Near-black canvas and off-white text carry the hierarchy; muted gray supports descriptions and metadata. Blue marks drafting guides, diagrams, focus outlines and interactive emphasis. The frontmatter records both themes; `.portfolio.light` switches the same semantic CSS properties. `src/index.css` is the implementation authority.

## Typography
Archivo Variable is locally bundled for display and body; IBM Plex Mono 400 is locally bundled for measurements, stack labels and controls in `src/main.tsx`. The hero uses the display role above; work and team headings use the headline role. Hero supporting text uses `clamp(27px, 4.1vw, 62px)`, weight 480 and line-height 1.06. Project descriptions use the body role; other supporting copy ranges from 16–21px. Mono labels range from 6–10px depending on context and viewport.

## Layout
Page gutters are clamp(18px, 1.2vw, 28px), reduced to 16px on phones. Two outer rules sit at 8px, or 6px on phones. The 1100px breakpoint reduces header density and adjusts project columns; 650px stacks project columns and changes the roster to two columns. The hero uses two statement lines and bottom-aligned content; paragraph and actions share a desktop row. Internal construction grids and their toggle are removed.

## Elevation & Depth
Flat sections use thin borders and tonal layering without box shadows. The native dialog uses a `#0008` backdrop with 10px blur. The fixed progress line and document-position readout sit above the page.

## Shapes
Straight one-pixel rules, crosshairs and blueprint geometry dominate. Actions use 40px pill radii; header controls are circular, the dialog uses 14px and command options use 6px corners.

## Components
`App` contains the header, hero, approach, selected work, team, footer and shortcut dialog. `ProjectDossier` renders each of three project rows; `Blueprint` renders conceptual workflow drawings and `Arrow` supplies shared SVG arrows. The four roster slots remain unnamed placeholders.

Primary actions invert foreground and background; hover switches to accent. Secondary actions have thin borders and invert on hover. Keyboard focus uses a 2px accent outline with 5px offset. Project disclosures use native `details`; image controls expose their selected state with `aria-pressed`. The searchable shortcut dialog supports arrow keys, Enter, Escape and focus restoration.

GSAP compiles the hero from outlined to solid lettering, then reveals its two statement lines word by word. Lenis (1.05s duration, native touch) runs on the GSAP ticker and updates ScrollTrigger. Hero movement uses 0.8s scrub, the approach scene uses a 125vh desktop pin and 0.9s scrub, project clipping and path drawing follow scroll progress with 0.65s scrub, and team drafting marks settle with 0.7s scrub. The command dialog pauses and resumes smooth scrolling. CSS state transitions take 0.2s, grid visibility 0.3s, and the caret blinks every 1.2s. Reduced-motion preferences disable these effects and smooth scrolling; content is visible without animation.

## Do's and Don'ts
- Do retain the supplied project facts and label system diagrams as conceptual.
- Do preserve explicit placeholders for missing team identities.
- Do use the existing theme properties for both color modes.
- Don't invent performance telemetry, team biographies or project outcomes.
- Don't depend on animation to make content visible or understandable.


## Latest surface revision
Hero metadata and the TEAM / 04 measure are removed. Hero content is bottom aligned above its document footer. Global gutters are clamp(18px, 1.2vw, 28px), 16px on phones; only two outer rules remain at 8px (6px on phones), with no internal grid. Navbar is sticky at 92px (76px on phones), with an eight-pixel tick ruler and live percentage marker visible after scrolling. Old fixed progress/readout are removed. Anchor offsets use CSS scroll-margin so Lenis and native navigation share the same clearance.

Approach is a full-width staggered three-line composition: Decide & design. / Code with intent. / Deploy with care. Heading uses 7.1vw fluid type; line offsets are 0/8/16vw, reduced to 0/5/10vw on phones. Expanded supporting copy sits to the lower right. Desktop scene pins below navigation for 125vh of scroll with 0.9 scrub, filling the final outline and revealing the paragraphs. At 760px and below, and for reduced motion, no pin is applied. The section inherits the selected light/dark theme.
