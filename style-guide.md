# Style Guide — Bent Lindberg Portfolio Design
> Optimized for Claude Code implementation

---

## 1. Design Philosophy

This design follows a **Swiss/Editorial Minimalism** aesthetic with strong typographic hierarchy, generous whitespace, and systematic use of rules and dividers. The visual language is confident and restrained — black on off-white, with purposeful grid structures and parenthetical labels as a recurring motif.

**Core Principles:**
- Typography does the heavy lifting — no decorative elements
- Structure is communicated through dividers, not color
- Parenthetical `(labels)` are used consistently for section metadata
- Diagonal arrows (↘) signal navigation or directional actions
- Every element earns its place — nothing is decorative noise

---

## 2. Color Palette

```css
:root {
  /* Backgrounds */
  --color-bg-primary:     #F2F0EB;   /* Off-white/cream — main page background */
  --color-bg-image:       #C07B2A;   /* Warm amber — hero image backdrop */

  /* Text */
  --color-text-primary:   #0D0C0A;   /* Near-black — headings and primary body */
  --color-text-secondary: #3A3835;   /* Soft dark — secondary descriptive text */
  --color-text-muted:     #6B6862;   /* Medium grey — labels, captions */

  /* Borders & Rules */
  --color-border:         #C8C5BE;   /* Warm grey — dividers, horizontal rules */
  --color-border-strong:  #0D0C0A;   /* Near-black — heavy borders */

  /* UI Elements */
  --color-pill-bg:        #0D0C0A;   /* Near-black — menu button, social icons */
  --color-pill-text:      #F2F0EB;   /* Off-white — text on dark pills */

  /* Accent */
  --color-accent-none: transparent;  /* No accent color — intentional */
}
```

**Usage Notes:**
- Never use pure `#000000` or `#FFFFFF` — always use the warm near-blacks and off-whites above
- The amber/golden background (`--color-bg-image`) is reserved solely for the hero image section
- No other colors should be introduced without strong justification

---

## 3. Typography

### Font Stack
```css
:root {
  --font-primary: 'Neue Haas Grotesk', 'Helvetica Neue', 'Arial', sans-serif;
  /* Fallback stack if Neue Haas Grotesk unavailable: */
  --font-fallback: 'Inter', 'DM Sans', system-ui, sans-serif;
}
```

> **Note for Claude Code:** If Neue Haas Grotesk is unavailable, `Inter` at heavy weights is an acceptable substitute. The key characteristic is an extended, bold grotesque with tight letter-spacing at large sizes.

---

### Type Scale

```css
:root {
  /* Display */
  --text-display:    clamp(52px, 9vw, 88px);   /* Hero name/title */

  /* Headings */
  --text-h1:         clamp(28px, 4vw, 42px);   /* Section statements */
  --text-h2:         clamp(18px, 2.2vw, 24px); /* Service/skill titles */

  /* Body */
  --text-body:       clamp(13px, 1.2vw, 15px); /* Descriptive paragraphs */
  --text-label:      clamp(11px, 1vw, 13px);   /* Parenthetical labels, captions */

  /* Marquee */
  --text-marquee:    clamp(60px, 12vw, 120px); /* Scrolling "Work Work Work" text */
}
```

---

### Font Weights & Styles

| Usage                        | Weight      | Style  | Transform    |
|------------------------------|-------------|--------|--------------|
| Hero name / display          | 800 (Black) | Normal | None         |
| Hero subtitle (Digital Designer) | 800    | Normal | None         |
| Section statement (About)    | 700 (Bold)  | Normal | None         |
| Service headings             | 700 (Bold)  | Normal | None         |
| Body / description text      | 400         | Normal | None         |
| Parenthetical labels         | 400         | Normal | None         |
| Navigation items             | 500         | Normal | None         |
| Marquee text                 | 800 (Black) | Normal | Uppercase    |

---

### Letter Spacing

```css
:root {
  --tracking-display:  -0.03em;  /* Tight — display/hero headings */
  --tracking-heading:  -0.02em;  /* Slight tightening — section headings */
  --tracking-body:      0em;     /* Default — body text */
  --tracking-label:     0.01em;  /* Slightly loose — parenthetical labels */
  --tracking-marquee:  -0.02em;  /* Tight — marquee text */
}
```

---

### Line Height

```css
:root {
  --leading-display:  0.95;  /* Very tight — hero title stack */
  --leading-heading:  1.1;   /* Tight — section headings */
  --leading-body:     1.55;  /* Comfortable — body paragraphs */
  --leading-label:    1.4;   /* Labels and captions */
}
```

---

## 4. Spacing System

Uses an **8px base grid** with a modular scale.

```css
:root {
  --space-1:   4px;
  --space-2:   8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  24px;
  --space-6:  32px;
  --space-7:  48px;
  --space-8:  64px;
  --space-9:  80px;
  --space-10: 96px;
  --space-11: 128px;
  --space-12: 160px;

  /* Section padding */
  --section-padding-x: clamp(20px, 4vw, 48px);
  --section-padding-y: clamp(32px, 5vw, 64px);

  /* Container */
  --container-max:     1440px;
  --container-gutter:  clamp(20px, 4vw, 48px);
}
```

---

## 5. Layout & Grid

### Page Structure

```
┌─────────────────────────────────────────────┐
│ NAV BAR          (3)  [Menu]                │  height: ~56px
├─────────────────────────────────────────────┤
│                                             │
│  HERO HEADER                                │
│  [Large Name / Title]                       │  padding: 24px 48px
│  (Location)              ↘ Scroll Down      │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  FULL-WIDTH HERO IMAGE                      │  aspect-ratio: ~16/9 or 2/1
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  ABOUT SECTION                              │
│  [Statement] (About Me)                     │  2-col: 60% / 40%
│              [Social icons]                 │
│                                             │
├─────────────────────────────────────────────┤  horizontal rule
│                                             │
│  SERVICES SECTION        ↘                  │
│  (What I do)                                │
│  ┌──────────────┬───────────────────────┐   │
│  │ Dig. Design  │ Art Direction         │   │  2x2 grid with rules
│  ├──────────────┼───────────────────────┤   │
│  │ Interaction  │ Motion Design         │   │
│  └──────────────┴───────────────────────┘   │
│                                             │
├─────────────────────────────────────────────┤  horizontal rule
│                                             │
│  ork Work Work Work Work W  (marquee)       │  overflow hidden
│                                             │
└─────────────────────────────────────────────┘
```

---

### Grid Columns

```css
/* About section: text + sidebar */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1px minmax(200px, 320px);
  gap: 0;
  align-items: start;
}

/* Services 2x2 grid */
.services-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  border-top: 1px solid var(--color-border);
}

/* Services item — borders via box approach */
.service-item {
  padding: var(--space-7) var(--space-6);
  border-right: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.service-item:nth-child(even) {
  border-right: none;
}
```

---

## 6. Components

### 6.1 Navigation Bar

```
[                    ] [ 3 ] [ Menu ]
```

- Full-width, sits at top of page
- Minimal: only a counter badge and menu pill button
- No logo or wordmark — name is implied by hero heading below
- `position: sticky; top: 0; z-index: 100;`
- Background: `var(--color-bg-primary)` with subtle bottom border on scroll

```css
.nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--container-gutter);
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-bg-primary);
}
```

---

### 6.2 Pill / Badge Component

Used for: Menu button, notification counter badge

```css
.pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 16px;
  border-radius: 9999px;
  background: var(--color-pill-bg);
  color: var(--color-pill-text);
  font-size: var(--text-label);
  font-weight: 500;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.pill:hover {
  opacity: 0.8;
}

/* Counter variant — smaller, circular */
.pill--counter {
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
}
```

---

### 6.3 Parenthetical Label

A recurring motif throughout the design — metadata/category labels in parentheses.

Pattern: `(Section Name)` or `(Location)`

```css
.label-paren {
  font-size: var(--text-label);
  font-weight: 400;
  color: var(--color-text-muted);
  letter-spacing: var(--tracking-label);
  /* Always uses literal parentheses in the text content */
}

/* Usage example: */
/* <span class="label-paren">(About Me)</span> */
/* <span class="label-paren">(Berlin, Germany)</span> */
/* <span class="label-paren">(What I do)</span> */
```

---

### 6.4 Directional Arrow — `↘`

Used to signal: scroll down, navigation links, section transitions.

- Always the southeast diagonal arrow: `↘` (U+2198)
- Rendered as body text at matching size
- Never rotated via CSS — use the literal character
- Positioned inline or in a flex row with label text

```css
.arrow-indicator {
  font-size: inherit;
  line-height: 1;
  display: inline-block;
}
```

---

### 6.5 Horizontal Rule / Divider

```css
.rule {
  width: 100%;
  height: 1px;
  background: var(--color-border);
  border: none;
  margin: 0;
}

/* Heavy version — section boundaries */
.rule--heavy {
  background: var(--color-border-strong);
}
```

---

### 6.6 Vertical Divider

Used between the about statement and the sidebar.

```css
.divider-vertical {
  width: 1px;
  background: var(--color-border);
  align-self: stretch;
  margin: 0 var(--space-7);
}
```

---

### 6.7 Social Icon Circles

Three circular icon buttons aligned horizontally.

```css
.social-icons {
  display: flex;
  gap: var(--space-3);
  align-items: center;
}

.social-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-pill-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.social-icon:hover {
  opacity: 0.75;
}

.social-icon svg {
  width: 14px;
  height: 14px;
  fill: var(--color-pill-text);
}
```

---

### 6.8 Hero Header

```css
.hero-header {
  padding: var(--space-5) var(--container-gutter) var(--space-6);
  display: grid;
  grid-template-rows: auto auto;
}

.hero-header__title {
  font-size: var(--text-display);
  font-weight: 800;
  line-height: var(--leading-display);
  letter-spacing: var(--tracking-display);
  color: var(--color-text-primary);
  max-width: 14ch; /* Force natural line break */
}

.hero-header__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--space-4);
}

.hero-header__location {
  /* Uses .label-paren style */
}

.hero-header__scroll {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-label);
  color: var(--color-text-muted);
}
```

---

### 6.9 Hero Image

```css
.hero-image {
  width: 100%;
  aspect-ratio: 16 / 7;
  object-fit: cover;
  object-position: center top;
  display: block;
  /* No border-radius — full bleed */
}
```

---

### 6.10 About Section

```css
.about {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  padding: var(--space-8) var(--container-gutter);
  gap: 0;
}

.about__statement {
  font-size: var(--text-h1);
  font-weight: 700;
  line-height: var(--leading-heading);
  letter-spacing: var(--tracking-heading);
  color: var(--color-text-primary);
  max-width: 18ch;
  padding-right: var(--space-8);
}

.about__sidebar {
  padding-left: var(--space-8);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-8);
}

.about__sidebar-label {
  /* Uses .label-paren */
  align-self: flex-start;
}
```

---

### 6.11 Services Section

```css
.services {
  padding: var(--space-7) var(--container-gutter);
  border-top: 1px solid var(--color-border-strong);
}

.services__header {
  display: flex;
  align-items: center;
  gap: var(--space-5);
  margin-bottom: var(--space-6);
}

.services__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid var(--color-border);
}

.service-item {
  padding: var(--space-6) var(--space-5);
  border-bottom: 1px solid var(--color-border);
}

.service-item:nth-child(odd) {
  border-right: 1px solid var(--color-border);
  padding-right: var(--space-7);
}

.service-item__title {
  font-size: var(--text-h2);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
  letter-spacing: var(--tracking-heading);
}

.service-item__description {
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  line-height: var(--leading-body);
  max-width: 35ch;
}
```

---

### 6.12 Marquee / Scrolling Text

```css
.marquee {
  overflow: hidden;
  white-space: nowrap;
  padding: var(--space-4) 0;
  border-top: 1px solid var(--color-border-strong);
}

.marquee__track {
  display: inline-block;
  animation: marquee-scroll 18s linear infinite;
}

.marquee__text {
  font-size: var(--text-marquee);
  font-weight: 800;
  color: var(--color-text-primary);
  letter-spacing: var(--tracking-marquee);
  text-transform: uppercase;
  /* Repeat text 3-4x with a separator for seamless loop */
}

@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

---

## 7. Motion & Transitions

The design is intentionally restrained — motion should feel editorial, not playful.

```css
:root {
  --ease-standard:  cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out:       cubic-bezier(0, 0, 0.2, 1);
  --ease-in:        cubic-bezier(0.4, 0, 1, 1);

  --duration-fast:    120ms;
  --duration-default: 200ms;
  --duration-slow:    350ms;
}

/* Default interactive element transition */
a, button, .pill, .social-icon {
  transition: opacity var(--duration-fast) var(--ease-standard);
}
```

**Rules:**
- Hover states use `opacity` reduction (never color changes)
- No bounce or spring animations
- Page load: fade-in hero heading at 300ms delay, image at 150ms
- No parallax effects — keep it flat and fast

---

## 8. Responsive Behavior

### Breakpoints

```css
:root {
  --bp-sm:  480px;
  --bp-md:  768px;
  --bp-lg:  1024px;
  --bp-xl:  1440px;
}
```

### Responsive Rules

| Element               | Mobile (<768px)                      | Desktop (≥768px)             |
|-----------------------|--------------------------------------|------------------------------|
| Hero title            | 40–52px, full width                  | 72–88px, ~14ch wide          |
| Hero image            | aspect-ratio: 4/3                    | aspect-ratio: 16/7           |
| About section         | Single column, stacked               | 2-col grid with divider      |
| Services grid         | Single column, stacked               | 2×2 grid with rules          |
| Marquee text          | 60px, slower scroll                  | 90–120px, normal speed       |
| Container gutter      | 20px                                 | 32–48px                      |

---

## 9. Accessibility

```css
/* Focus styles — maintain keyboard navigation visibility */
*:focus-visible {
  outline: 2px solid var(--color-text-primary);
  outline-offset: 3px;
  border-radius: 2px;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .marquee__track {
    animation-duration: 60s; /* Slow significantly, don't stop */
  }

  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

**Minimum contrast ratios met:**
- Body text on background: `#3A3835` on `#F2F0EB` — passes AA
- Primary text on background: `#0D0C0A` on `#F2F0EB` — passes AAA
- White on pill background: `#F2F0EB` on `#0D0C0A` — passes AAA

---

## 10. Iconography

- Use simple, geometric line icons at **16–18px** in circular containers
- Stroke weight: 1.5px
- Style: minimal, no fills on interactive icons
- Avoid decorative icons — every icon must be functional
- Social icons: use brand-standard SVGs at reduced opacity when inactive

---

## 11. Do's and Don'ts

### ✅ Do
- Use parenthetical labels `(Like This)` for all section metadata
- Use `↘` arrows for navigation signals
- Keep the color palette strictly to the defined tokens
- Let typography create hierarchy — not color
- Use 1px borders/rules to structure content regions
- Keep button/pill components minimal and dark

### ❌ Don't
- Don't add drop shadows, gradients, or glows
- Don't use color for emphasis — use weight and size
- Don't add border-radius to content containers (only pills/badges)
- Don't use more than 2 font weights in a single section
- Don't add hover background colors — use opacity only
- Don't introduce new colors outside the defined palette
- Don't center-align text (all text is left-aligned)

---

## 12. CSS Custom Properties — Complete Reference

```css
:root {
  /* Colors */
  --color-bg-primary:     #F2F0EB;
  --color-bg-image:       #C07B2A;
  --color-text-primary:   #0D0C0A;
  --color-text-secondary: #3A3835;
  --color-text-muted:     #6B6862;
  --color-border:         #C8C5BE;
  --color-border-strong:  #0D0C0A;
  --color-pill-bg:        #0D0C0A;
  --color-pill-text:      #F2F0EB;

  /* Typography */
  --font-primary:       'Neue Haas Grotesk', 'Inter', 'Helvetica Neue', sans-serif;
  --text-display:       clamp(52px, 9vw, 88px);
  --text-h1:            clamp(28px, 4vw, 42px);
  --text-h2:            clamp(18px, 2.2vw, 24px);
  --text-body:          clamp(13px, 1.2vw, 15px);
  --text-label:         clamp(11px, 1vw, 13px);
  --text-marquee:       clamp(60px, 12vw, 120px);
  --tracking-display:   -0.03em;
  --tracking-heading:   -0.02em;
  --tracking-body:       0em;
  --tracking-label:      0.01em;
  --leading-display:    0.95;
  --leading-heading:    1.1;
  --leading-body:       1.55;

  /* Spacing */
  --space-1:   4px;
  --space-2:   8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  24px;
  --space-6:  32px;
  --space-7:  48px;
  --space-8:  64px;
  --space-9:  80px;
  --space-10: 96px;
  --space-11: 128px;
  --section-padding-x: clamp(20px, 4vw, 48px);
  --section-padding-y: clamp(32px, 5vw, 64px);
  --container-max:     1440px;
  --container-gutter:  clamp(20px, 4vw, 48px);

  /* Motion */
  --ease-standard:      cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out:           cubic-bezier(0, 0, 0.2, 1);
  --duration-fast:      120ms;
  --duration-default:   200ms;
  --duration-slow:      350ms;

  /* Breakpoints (reference only — use in @media queries) */
  /* --bp-sm: 480px; --bp-md: 768px; --bp-lg: 1024px; --bp-xl: 1440px; */
}
```
