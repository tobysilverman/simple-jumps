# Design System Reference
*Bauhaus-inspired design system optimized for rapid development with Claude Code*

## Quick Navigation
- [Core Principles](#core-principles)
- [Typography](#typography)
- [Color System](#color-system)
- [Component Patterns](#component-patterns)
- [Implementation Examples](#implementation-examples)
- [Accessibility Guidelines](#accessibility-guidelines)

## Core Principles

### Design Philosophy
- **Form follows function** - Every element serves a purpose
- **95/5 Rule** - 95% neutral foundation, 5% vibrant accents maximum
- **Single accent rule** - One dominant accent color per screen/component
- **Geometric simplicity** - Clean shapes, generous whitespace

### Key Constraints
- **Typography:** 12 total type sizes (5 headings + 4 body + 3 code)
- **Colors:** 12 colors per theme (3 primary + 6 neutral)
- **Spacing:** 8px base unit system
- **Breakpoints:** Mobile (375px), Tablet (768px), Desktop (1440px)

---

## Typography

### Font Stack
```css
/* Display & Headings */
--font-display: 'Bricolage Grotesque', system-ui, -apple-system, sans-serif;

/* Body & UI */
--font-body: 'IBM Plex Sans', system-ui, -apple-system, sans-serif;

/* Code & Technical */
--font-mono: 'IBM Plex Mono', 'SF Mono', 'Monaco', monospace;
```

### Type Scale

#### Headings (Bricolage Grotesque Variable)
```css
/* H1 - Hero/Page Title */
.h1 {
  font-family: var(--font-display);
  font-size: 6rem;     /* 96px */
  line-height: 1.04;   /* 100px */
  font-weight: 700;
  font-variation-settings: 'wght' 700, 'opsz' 96, 'wdth' 100;
}

/* H2 - Major Section */
.h2 {
  font-family: var(--font-display);
  font-size: 4rem;     /* 64px */
  line-height: 1.09;   /* 70px */
  font-weight: 700;
  font-variation-settings: 'wght' 700, 'opsz' 64, 'wdth' 100;
}

/* H3 - Section */
.h3 {
  font-family: var(--font-display);
  font-size: 3rem;     /* 48px */
  line-height: 1.15;   /* 55px */
  font-weight: 600;
  font-variation-settings: 'wght' 600, 'opsz' 48, 'wdth' 100;
}

/* H4 - Subsection */
.h4 {
  font-family: var(--font-display);
  font-size: 2rem;     /* 32px */
  line-height: 1.25;   /* 40px */
  font-weight: 600;
  font-variation-settings: 'wght' 600, 'opsz' 32, 'wdth' 100;
}

/* H5 - Minor Heading */
.h5 {
  font-family: var(--font-display);
  font-size: 1.5rem;   /* 24px */
  line-height: 1.33;   /* 32px */
  font-weight: 500;
  font-variation-settings: 'wght' 500, 'opsz' 24, 'wdth' 100;
}
```

#### Body Text (IBM Plex Sans)
```css
/* Large - Lead paragraphs */
.body-large {
  font-family: var(--font-body);
  font-size: 1.125rem;  /* 18px */
  line-height: 1.61;    /* 29px */
  font-weight: 400;
}

/* Base - Standard content */
.body-base {
  font-family: var(--font-body);
  font-size: 1rem;      /* 16px */
  line-height: 1.5;     /* 24px */
  font-weight: 400;
}

/* Small - UI text */
.body-small {
  font-family: var(--font-body);
  font-size: 0.875rem;  /* 14px */
  line-height: 1.43;    /* 20px */
  font-weight: 400;
  letter-spacing: 0.01em;
}

/* Tiny - Labels/metadata */
.body-tiny {
  font-family: var(--font-body);
  font-size: 0.75rem;   /* 12px */
  line-height: 1.33;    /* 16px */
  font-weight: 500;
  letter-spacing: 0.03em;
}
```

#### Code (IBM Plex Mono)
```css
/* Code Block */
.code-base {
  font-family: var(--font-mono);
  font-size: 1rem;      /* 16px */
  line-height: 1.5;     /* 24px */
  font-weight: 400;
}

/* Inline Code */
.code-small {
  font-family: var(--font-mono);
  font-size: 0.875rem;  /* 14px */
  line-height: 1.43;    /* 20px */
  font-weight: 400;
}
```

---

## Color System

### CSS Custom Properties
```css
/* Light Theme */
:root {
  /* Primary Accents (Use Sparingly) */
  --color-primary: #1886E2;      /* Electric Blue */
  --color-danger: #FD5250;        /* Coral Red */
  --color-warning: #F5B800;       /* Golden Yellow */
  
  /* Neutral Foundation */
  --color-bg: #FDFBF7;            /* Cream */
  --color-surface: #FFFEF9;       /* Warm White */
  --color-border: #E8E3DB;        /* Light Warm Gray */
  --color-text-secondary: #8F8678; /* Medium Warm Gray */
  --color-text-primary: #4A4540;  /* Dark Warm Gray */
  --color-text-emphasis: #1A1816; /* Warm Black */
}

/* Dark Theme */
[data-theme="dark"] {
  /* Primary Accents (Adjusted for Dark) */
  --color-primary: #5BA3F5;       /* Sky Blue */
  --color-danger: #FF6B6B;        /* Bright Coral */
  --color-warning: #FFD93D;       /* Sunshine Yellow */
  
  /* Neutral Foundation */
  --color-bg: #2E2A28;            /* Dark Brown */
  --color-surface: #3D3835;       /* Elevated Dark */
  --color-border: #5A524D;        /* Medium Brown */
  --color-text-secondary: #B8AFA7; /* Light Brown */
  --color-text-primary: #E8E3DB;  /* Warm Light Gray */
  --color-text-emphasis: #FDFBF7; /* Off White */
}
```

### Color Usage Rules
1. **Primary actions**: Use `--color-primary` for CTAs, links, active states
2. **Destructive actions**: Use `--color-danger` for delete, error states
3. **Cautions**: Use `--color-warning` for alerts, highlights (ensure contrast)
4. **Text hierarchy**: emphasis > primary > secondary
5. **Surface elevation**: surface color on bg color with subtle shadow

---

## Component Patterns

### Button Component
```html
<!-- Primary Button -->
<button class="btn btn-primary">
  <span>Take Action</span>
</button>

<!-- Danger Button -->
<button class="btn btn-danger">
  <span>Delete Item</span>
</button>

<!-- Secondary Button -->
<button class="btn btn-secondary">
  <span>Cancel</span>
</button>
```

```css
.btn {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
}

.btn-danger {
  background: var(--color-danger);
  color: white;
}

.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
}

/* Hover States */
.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
```

### Card Component
```html
<article class="card">
  <h3 class="card-title h5">Card Title</h3>
  <p class="card-body body-base">Card content goes here...</p>
  <div class="card-accent"></div>
</article>
```

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  padding: 1.5rem;
  position: relative;
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

/* Optional accent border */
.card-accent {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--color-primary);
  border-radius: 0.5rem 0 0 0.5rem;
}
```

### Code Block Component
```html
<pre class="code-block">
  <code class="code-content">const greeting = "Hello, Bauhaus";</code>
</pre>
```

```css
.code-block {
  background: var(--color-text-emphasis);
  color: var(--color-bg);
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
}

.code-content {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Syntax Highlighting */
.token-keyword { color: var(--color-primary); }
.token-string { color: var(--color-danger); }
.token-comment { opacity: 0.6; }
```

### Form Elements
```html
<div class="form-group">
  <label class="form-label body-tiny">Email Address</label>
  <input type="email" class="form-input" placeholder="you@example.com">
</div>
```

```css
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-text-secondary);
  text-transform: uppercase;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-family: var(--font-body);
  font-size: 1rem;
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: 0.25rem;
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
}
```

---

## Implementation Examples

### Hero Section
```html
<section class="hero">
  <h1 class="h1">Build with <span class="text-accent">Purpose</span></h1>
  <p class="body-large">A design system that values function over form.</p>
  <button class="btn btn-primary">Get Started</button>
</section>
```

```css
.hero {
  padding: 4rem 2rem;
  text-align: center;
  background: var(--color-bg);
}

.text-accent {
  color: var(--color-primary);
}
```

### Navigation Bar
```html
<nav class="navbar">
  <a href="/" class="nav-logo h5">Brand</a>
  <ul class="nav-links">
    <li><a href="/about" class="nav-link">About</a></li>
    <li><a href="/work" class="nav-link nav-link-active">Work</a></li>
    <li><a href="/contact" class="nav-link">Contact</a></li>
  </ul>
</nav>
```

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-link {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link-active {
  color: var(--color-primary);
}
```

### Notification Badge
```html
<div class="notification notification-success">
  <span class="notification-icon">✓</span>
  <span>Operation completed successfully</span>
</div>
```

```css
.notification {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
}

.notification-success {
  background: var(--color-primary);
  color: white;
}

.notification-error {
  background: var(--color-danger);
  color: white;
}

.notification-warning {
  background: var(--color-warning);
  color: var(--color-text-emphasis);
}
```

---

## Accessibility Guidelines

### Color Contrast
- **Light Mode Ratios:**
  - Electric Blue on cream: 4.8:1 (AA)
  - Coral Red on cream: 4.5:1 (AA)
  - Golden Yellow on cream: 2.1:1 (use with dark text overlay)

- **Dark Mode Ratios:**
  - Sky Blue on dark: 8.7:1 (AAA)
  - Bright Coral on dark: 7.2:1 (AA)
  - Sunshine Yellow on dark: 13.5:1 (AAA)

### Typography
- Minimum font size: 14px for body text
- Line height: 1.5x minimum for body text
- Letter spacing increases for smaller text (12-14px)
- Use font weights ≥500 for text under 14px

### Interactive Elements
- Minimum touch target: 44x44px
- Focus indicators: 2px outline minimum
- Color alone never indicates state
- Provide text alternatives for icons

### Motion
```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Quick Implementation Checklist

### Starting a New Component
1. ✓ Use CSS custom properties for all colors
2. ✓ Apply appropriate type scale class
3. ✓ Follow 95/5 neutral-to-accent ratio
4. ✓ Test color contrast (AA minimum)
5. ✓ Add hover/focus states
6. ✓ Include dark mode support
7. ✓ Test at mobile breakpoint

### Color Selection Priority
1. Start with neutral foundation (95%)
2. Choose ONE accent color per context
3. Use accent for primary action only
4. Reserve red for errors/destructive
5. Use yellow sparingly for warnings

### Typography Hierarchy
1. One H1 per page maximum
2. H2 for major sections
3. H3-H5 progressively for subsections
4. Body-base for content
5. Body-small for UI elements
6. Body-tiny for labels/metadata

### Responsive Considerations
```css
/* Mobile adjustments */
@media (max-width: 768px) {
  .h1 { font-size: 4rem; }
  .h2 { font-size: 3rem; }
  .h3 { font-size: 2rem; }
  /* Maintain optical size ratios */
}
```

---

## File Structure Recommendation
```
/src
├── /styles
│   ├── design-tokens.css    # Custom properties
│   ├── typography.css        # Type system
│   ├── colors.css           # Color system
│   └── components.css       # Component styles
├── /components
│   ├── Button.jsx
│   ├── Card.jsx
│   └── CodeBlock.jsx
└── /utils
    └── theme-switcher.js
```

---

## Notes for Claude Code

### When implementing this design system:
1. **Always start with the neutral foundation** - Add accents last
2. **Use semantic color names** - `--color-primary` not `--color-blue`
3. **Apply the correct optical size** - Match `opsz` to font size for Bricolage
4. **One accent rule** - Never use multiple vibrant colors equally
5. **Component first** - Build reusable components, not one-off styles
6. **Test contrast** - Especially yellows and light colors
7. **Mobile first** - Start with small screens, enhance up

### Common Patterns to Generate:
- Hero sections with single accent color
- Card grids with hover states
- Navigation with active states
- Form layouts with validation states
- Code blocks with syntax highlighting
- Notification/alert components
- Data tables with sortable headers
- Modal dialogs with proper focus management

Remember: **Less is more. Every accent counts.**