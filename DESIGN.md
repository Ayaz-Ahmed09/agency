# Presitgious Tech Design System

## 1. Atmosphere & Identity

Presitgious Tech feels like a dark, high-trust digital studio: cinematic, sharp, and commercial without feeling noisy. The signature is ember glass: off-black surfaces, warm orange highlights, restrained blur, and large compressed typography that makes service work feel tangible and premium.

## 2. Color

### Palette

| Role | Token | Light | Dark | Usage |
|------|-------|-------|------|-------|
| Surface/primary | `--prestige-canvas` | `#0b0707` | `#0b0707` | Page background and section base |
| Surface/secondary | `--prestige-panel` | `#151010` | `#151010` | Cards, modal panels, media frames |
| Surface/deep | `--prestige-deep` | `#090505` | `#090505` | Browser chrome, deep separators |
| Text/primary | `--prestige-ink` | `#f5f1ea` | `#f5f1ea` | Headlines, button text, key labels |
| Text/secondary | `--prestige-muted` | `#a59b93` | `#a59b93` | Body copy, captions, secondary metadata |
| Border/default | `--prestige-line` | `rgb(255 238 226 / 0.14)` | `rgb(255 238 226 / 0.14)` | Glass borders and section dividers |
| Accent/primary | `--prestige-gold` | `#ff5a1f` | `#ff5a1f` | Primary CTAs, active states, overlines |
| Accent/deep | `--prestige-gold-deep` | `#6d120d` | `#6d120d` | Glow depth and background gradients |
| Status/success | `--status-success` | `#56c271` | `#56c271` | Browser dots and positive status marks |
| Status/warning | `--status-warning` | `#f2b950` | `#f2b950` | Browser dots and caution accents |

### Rules

- Use the ember accent for actions and section metadata, not random decoration.
- Backgrounds stay dark and warm; avoid blue/purple gradients as the dominant palette.
- If a new semantic color is needed, add it here before using it in components.

## 3. Typography

### Scale

| Level | Size | Weight | Line Height | Tracking | Usage |
|-------|------|--------|-------------|----------|-------|
| Display | `clamp(3.5rem, 9vw, 7rem)` | 600-900 | 0.86-0.92 | `-0.07em` | Hero and marquee headlines |
| H1 | `3.75rem / 6rem` | 600 | 0.9 | `-0.07em` | Major section headers |
| H2 | `3rem / 4.5rem` | 600 | 0.92 | `-0.065em` | Template and service card titles |
| H3 | `1.5rem / 2rem` | 600 | 0.95-1.1 | `-0.06em` | Compact card headings |
| Body/lg | `1rem / 1.125rem` | 400 | 1.65 | 0 | Lead paragraphs |
| Body | `0.875rem / 1rem` | 400 | 1.7 | 0 | Default copy |
| Body/sm | `0.75rem / 0.8125rem` | 400-500 | 1.5 | 0 | Supporting labels and cards |
| Overline | `0.6rem / 0.6875rem` | 600 | 1.3 | `0.18em-0.34em` | Uppercase metadata |

### Font Stack

- Primary: `"Plus Jakarta Sans", "Satoshi", "Cabinet Grotesk", system-ui, sans-serif`
- Mono: `"JetBrains Mono", "SFMono-Regular", Consolas, monospace`
- Serif: none

### Rules

- Keep display text tight and balanced; reduce size before allowing awkward wraps.
- Body text never goes below 12px, and long paragraphs stay under roughly 65 characters.
- Mono is for metadata, controls, and technical labels only.

## 4. Spacing & Layout

### Base Unit

All spacing derives from a base of **4px**.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight icon-to-label gaps |
| `--space-2` | 8px | Small chips and compact groups |
| `--space-3` | 12px | Browser dots, small cards |
| `--space-4` | 16px | Mobile section gutters |
| `--space-5` | 20px | Card inner rhythm |
| `--space-6` | 24px | Standard panel padding |
| `--space-8` | 32px | Section header gaps |
| `--space-10` | 40px | Card group separation |
| `--space-12` | 48px | Major content separation |
| `--space-16` | 64px | Desktop section gutters |
| `--space-20` | 80px | Section vertical padding |
| `--space-24` | 96px | Large section vertical padding |

### Grid

- Max content width: 1280px.
- Column system: responsive CSS grid, one column on mobile, two columns for large showcase cards.
- Breakpoints: sm 640px, md 768px, lg 1024px, xl 1280px, 2xl 1536px.

### Rules

- Use stable aspect ratios for media previews and card stacks.
- Section spacing can be asymmetric when it improves scroll rhythm.
- Cards must not resize when labels, images, or hover states change.

## 5. Components

### Template showcase card

- **Structure**: `article` with browser-framed media, metadata row, title, description, feature chips, tag chips, and action links.
- **Variants**: completed project, free template.
- **Spacing**: `--space-5` to `--space-8` inside cards; `--space-2` to `--space-3` for chips.
- **States**: hover raises border contrast and slightly scales media; active controls compress by 1px where applicable.
- **Accessibility**: preview images require specific alt text; download links name the artifact.
- **Motion**: enter with opacity and Y transform; media hover uses transform only.

### Ember glass control

- **Structure**: inline button or link with icon, label, and 1px translucent border.
- **Variants**: filled accent, muted glass, gold outline.
- **Spacing**: `--space-3` to `--space-4` horizontal padding; `--space-2` icon gap.
- **States**: hover color shift, visible focus ring, active translate by 1px.
- **Accessibility**: icons are decorative unless the control has no text.
- **Motion**: 200-300ms color, border, transform.

## 6. Motion & Interaction

### Timing

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Micro | 120-180ms | ease-out | Button press and icon response |
| Standard | 240-300ms | `var(--prestige-ease)` | Hover, card border, chip response |
| Emphasis | 500-700ms | `[0.32, 0.72, 0, 1]` | Scroll reveal and card entrance |
| Stack | spring, 1s | bounce 0 | Service card stack movement |

### Rules

- Animate only `transform`, `opacity`, `filter`, and border/color transitions.
- Respect reduced motion for moving card stacks and scroll reveals.
- Every interactive element has hover, active, and focus-visible states.

## 7. Depth & Surface

### Strategy

Mixed, with a strict hierarchy: tonal shifts and translucent borders define structure, while tinted shadows and blur are reserved for premium cards, modals, and image frames.

| Level | Value | Usage |
|-------|-------|-------|
| Subtle | `1px solid rgb(255 238 226 / 0.13)` | Dividers, chips, small panels |
| Default | `inset 0 1px 0 rgb(255 255 255 / 0.12)` plus warm panel gradient | Service cards and template cards |
| Prominent | `0 34px 96px rgba(0,0,0,0.44)` plus glass border | Stacked cards, modals, browser preview frames |

Surfaces should look layered, not plastic. Avoid default black drop shadows and avoid decorative cards nested inside other decorative cards unless the inner card represents actual product UI.
