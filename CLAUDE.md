# Simple Jumps - Claude Code Documentation

## Project Overview
Simple Jumps is a React-based web application that calculates jump distances for tabletop RPG games (like D&D 5e). It provides calculators for long jumps, high jumps, and reaching high jumps based on character attributes.

## Design System Reference
For typography, colors, components, and patterns:
→ `/design-system/design_system.md`

## Tech Stack
- **Framework**: React 19.1.1
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Testing**: Jest with React Testing Library
- **Styling**: CSS

## Project Structure
```
simple-jumps/
├── public/              # Static assets and index.html
├── src/                 # Source code
│   ├── assets/         # Images and media files
│   ├── App.js          # Main application component
│   ├── App.css         # Application styles
│   ├── index.js        # Entry point
│   └── ...             # Other React components and utilities
├── logs/               # Application logs
├── package.json        # Dependencies and scripts
└── README.md          # Standard CRA documentation
```

## Key Features
- **Jump Calculators**: Three types of jump calculations (long, high, reaching high)
- **Character Attributes**: Strength and height inputs affect calculations
- **Running Start**: Toggle for running vs standing start
- **Magic Items**: Support for items that modify jump calculations (e.g., Boots of Springing)
- **Mobile Responsive**: Optimized for various screen sizes

## Development Commands
```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm start

# Run tests
npm test

# Build for production
npm run build
```

## Code Conventions
- **Components**: Functional React components with hooks
- **State Management**: useState and useEffect hooks for local state
- **Styling**: Component-specific CSS files
- **Assets**: Images stored in src/assets/images/
- **Testing**: Test files alongside components (*.test.js)

## Important Files
- `src/App.js`: Main application logic and jump calculations
- `src/App.css`: Application styling and responsive design
- `package.json`: Project configuration and dependencies

## Notes for Claude
- This is a Create React App project - use standard CRA conventions
- No custom linting or type checking commands configured
- Test framework is Jest with React Testing Library
- Mobile-first responsive design implemented
- Jump calculations follow D&D 5e rules

## Frontend Positioning

Claude.MD — Frontend Positioning & Anti-Loop Playbook

Purpose: make Claude Code reliably fix front-end layout/positioning without looping, scope-creep, or structural churn. This governs how you (Claude) read, plan, patch, and stop.

Core Contract

Primary mode: Read → Plan → Patch → Stop.

Smallest diff first: Prefer targeted CSS edits over HTML changes. Do not add files/deps.

One layout system per container: Choose Flex or Grid or Absolute; never mix unless explicitly required.

HTML is frozen unless the task explicitly says you may edit markup.

Respect invariants & breakpoints already in the codebase.

Finish line defined: Every task must include explicit Acceptance Checks; you must report which now pass/fail.

Task Intake Template (fill before acting)
GOAL
<What must be true visually? Be concrete, e.g., "Center CTA vertically in .hero; pin .badge 16px from top-right of the image.">

SCOPE
Only edit: <paths...>
Do NOT: rename classes, change layout system, touch global styles, alter markup (unless allowed).

INVARIANTS
• Keep current layout system (Flex/Grid) unless permission granted.
• No absolute positioning except for: <list or “none”>.
• Preserve existing responsive breakpoints and tokens.

ACCEPTANCE (exit criteria)
• <e.g., CTA’s box vertically centered within .hero (±2px).>
• <e.g., .badge top:16px; right:16px at ≥768px; 8px at <768px.>
• Output: one unified patch + ≤2-sentence rationale.


If missing, create reasonable Acceptance Checks (quantified, testable) and proceed.

Required Workflow (do not skip)

READ (diagnose current state)

Identify containing block for each positioned child.

For each relevant element, capture: display, position, top/right/bottom/left, justify-content, align-items, grid-*, transform, computed width/height.

Note blockers (e.g., “parent has no height; 100% cannot resolve”).

PLAN (one plan, ≤3 bullets)

Choose a single layout strategy (Flex or Grid or Absolute).

Explain why it resolves the blocker.

Declare the smallest diff strategy (CSS-only unless permitted).

PATCH (single, atomic)

Produce one unified patch touching only files in SCOPE.

Include a 1–2 sentence rationale.

Do not emit multiple alternatives.

STOP (report status)

Map Acceptance Checks → Pass/Fail with reasoning.

If any Fail, name exactly one next micro-fix (but don’t apply it yet).

If the user says “repeat steps 1–4,” keep plan type (e.g., Flex) unless given permission to change.

Output Format

Prefer Cursor/Code-Assistant patch blocks:

*** Begin Patch
*** Update File: src/components/Hero.css
@@
-.hero { ... }
+.hero {
+  min-height: 70vh;
+  display: grid;
+  place-items: center;
+}
*** End Patch


If unified diff is required, use standard diff with file headers.

After the patch, output a short “Rationale” and “Acceptance status”.

Do not output prose instead of a patch when a patch is requested.

Anti-Loop Protocols

When you feel uncertainty or start to thrash, apply the first matching rule:

Conflicting layout systems?

Pick one:

Centering both axes → display:grid; place-items:center;

Horizontal row with vertical centering → display:flex; align-items:center;

Pin a thing → parent: position:relative; child: position:absolute; top/right/...

Remove the competing system (e.g., drop margin:auto when using Grid centering).

Element won’t center vertically?

Ensure the container has a resolved height (min-height: <vh or token>) or the ancestor chain supports height:100%.

Avoid using transform on the measuring parent (alters containing/stacking context).

Absolute not respecting offsets?

Confirm the nearest positioned ancestor (position:relative|absolute|fixed|sticky) exists on the intended parent, not an accidental grandparent.

100% height not working?

Every ancestor up to the viewport must have height:100%. Prefer min-height:100vh or min-h-screen (if Tailwind) for heroes.

Unexpected overflow or clipping?

Inspect overflow, white-space, min-width and images (set img { display:block; max-width:100%; height:auto; }).

Z-index issues?

Identify stacking contexts (position + z-index, transform, filter, opacity<1). Raise z-index within the same context or remove the extra context.

Structural churn detected?

Stop. Describe current DOM & computed layout in 5 bullets. Name exactly one culprit. Propose one fix. Then patch.

Debug Telemetry (use, then remove)

Temporary debug CSS

/* debug.css (temporary) */
* { outline: 1px solid rgba(0,0,0,.06); outline-offset: -1px; }
._bbox { position: relative; }
._bbox::after {
  content: attr(data-name) " " attr(data-size);
  position: absolute; inset: 0; pointer-events: none;
  border: 1px dashed rgba(0,0,0,.35);
  font: 11px/1.2 ui-monospace, monospace;
  padding: 2px 4px; color: #0008; background: #fff8;
}


Console measurement helper (DevTools)

function box(sel){
  const el = document.querySelector(sel); if(!el) return console.warn('No match', sel);
  const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
  const info = {
    sel, x: Math.round(r.x), y: Math.round(r.y),
    w: Math.round(r.width), h: Math.round(r.height),
    display: cs.display, position: cs.position,
    justifyContent: cs.justifyContent, alignItems: cs.alignItems,
    top: cs.top, right: cs.right, bottom: cs.bottom, left: cs.left
  };
  console.table(info); return info;
}


When Acceptance depends on offsets, run and report:
box('.hero'), box('.cta'), box('.badge').

Remove debug CSS/JS in the patch that closes the task (unless instructed to keep).

Positioning Recipes (safe defaults)

Center both axes (hero)

.hero { min-height: 70vh; display: grid; place-items: center; }


Badge pinned to image corner

.card { position: relative; }
.card img { display:block; width:100%; height:auto; }
.badge { position:absolute; top:16px; right:16px; }


Row with wrap + vertical centering

.row { display:flex; gap:12px; flex-wrap:wrap; align-items:center; }
.row > * { flex: 0 0 auto; }


Two-column with sticky aside

.wrap { display:grid; grid-template-columns: 1fr min(320px, 30%); gap:24px; }
.aside { position: sticky; top: 24px; align-self: start; }


Containment for absolute children

.parent { position: relative; } /* defines containing block */
.child--pin { position: absolute; inset: auto; top:16px; right:16px; }

Tailwind Note (if present)

Do not convert between CSS and Tailwind unless requested.

Respect existing tokens (--space, --container, Tailwind scales).

For centering via Tailwind: grid place-items-center or flex items-center justify-center.

Breakpoints & Responsiveness

Preserve existing breakpoint logic; if a rule changes across breakpoints, declare it explicitly:

Example:

@media (min-width: 768px) { .badge { top:16px; right:16px; } }

@media (max-width: 767.98px) { .badge { top:8px; right:8px; } }

Prefer mobile-first unless the codebase is desktop-first.

Acceptance Check Patterns (copy/paste)

Offsets & centering

[ ] .cta’s bounding box vertically centered within .hero (±2px)
[ ] .badge offset: top 16px, right 16px at ≥768px; 8px/8px below
[ ] No unintended horizontal scrollbar at 375–1440px widths


Sticky behavior

[ ] .aside sticks within viewport with top offset 24px
[ ] Does not overlap .footer when scrolled to bottom


Regression guards

[ ] No changes to HTML structure or class names
[ ] No new files/dependencies

Selection-Based Editing (Cursor)

Prefer selection editing on the specific component (TSX + CSS) to constrain context.

If asked for a patch, return only the patch plus the brief rationale & acceptance status.

Replan Triggers

Switch plan (e.g., from Flex to Grid) only if:

The container requires orthogonal centering across several dynamic children, and Flex cannot satisfy without hacks, and you have permission to change the layout system.

When switching, remove conflicting styles from the old system in the same patch.

Common Gotchas (checklist)

Parent height unresolved → set min-height or fix height:100% chain.

Unwanted stacking context from transform, filter, opacity on parent.

Images causing layout shift → ensure display:block; max-width:100%; height:auto; and add width/height attrs if available.

Auto margins fighting Grid/Flex centering.

Absolute child measuring against the wrong ancestor (missing position:relative on intended parent).

overflow:hidden clipping positioned elements unintentionally.

Example: Minimal Patch & Report
*** Begin Patch
*** Update File: src/components/Hero.css
@@
-.hero { height: 100%; display: flex; align-items: center; }
+.hero {
+  min-height: 70vh;     /* resolves unresolved height */
+  display: grid;        /* single layout system */
+  place-items: center;  /* centers both axes */
+}
*** End Patch


Rationale: The hero lacked a resolved height, so vertical centering via Flex was unreliable. Grid + place-items:center with min-height:70vh deterministically centers the CTA.

Acceptance status:

✅ CTA vertically centered within .hero (±2px)

⏳ Badge offsets unchanged (not in scope for this patch)

If Blocked (no visual target, ambiguous goal)

Produce a 1-screen Diagnostic Report: current DOM, computed layout, single culprit, single recommended fix with estimated side-effects.

Then wait for a clarified goal or permission to change the layout system.

Use this playbook every time you alter positioning. Keep changes minimal, measurable, and final.