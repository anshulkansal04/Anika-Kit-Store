# Anika Kit Store — Design System

## Color Palette

### Primary (Terracotta)
| Token | Hex | Usage |
|---|---|---|
| primary-50 | #FEF5F0 | Backgrounds, tints |
| primary-100 | #FDE8DC | Hover backgrounds |
| primary-200 | #FACBB3 | Borders, highlights |
| primary-300 | #F5A882 | Active states |
| primary-400 | #F08A57 | Secondary buttons |
| primary-500 | #E8724A | **Primary brand color** |
| primary-600 | #D45C34 | Hover states |
| primary-700 | #B04527 | Active/pressed |
| primary-800 | #8C371F | Dark accents |
| primary-900 | #6B2A18 | Text on light |

### Accent (Teal)
| Token | Hex | Usage |
|---|---|---|
| accent-50 | #EEFBFB | Backgrounds |
| accent-100 | #D4F4F5 | Hover backgrounds |
| accent-200 | #A3E6E9 | Borders |
| accent-300 | #6DD4D9 | Highlights |
| accent-400 | #3DC2C9 | Interactive |
| accent-500 | #2AABB3 | **Accent color** |
| accent-600 | #228E95 | Hover |
| accent-700 | #1B7178 | Pressed |
| accent-800 | #155A5F | Dark |
| accent-900 | #104548 | Text |

### Highlight (Lavender)
| Token | Hex | Usage |
|---|---|---|
| highlight-50 | #F5F1FB | Backgrounds |
| highlight-100 | #EAE2F7 | Hover |
| highlight-200 | #D4C5EF | Borders |
| highlight-300 | #BDA7E6 | |
| highlight-400 | #AB90DD | |
| highlight-500 | #9B7FD4 | **Highlight color** |
| highlight-600 | #7E61B8 | Hover |
| highlight-700 | #634A99 | |
| highlight-800 | #4A377A | |
| highlight-900 | #35275C | |

### Surfaces
| Token | Hex | Usage |
|---|---|---|
| surface | #FDFCFA | Page background |
| surface-warm | #F5F0E8 | Card image backgrounds, inputs |
| surface-elevated | #FFFFFF | Card content areas |

### Neutrals (warm-tinted)
| Token | Hex | Usage |
|---|---|---|
| neutral-50 | #FAF9F7 | |
| neutral-100 | #F0EEED | Dividers (light) |
| neutral-200 | #E2DFDC | Borders |
| neutral-300 | #C8C3BF | Disabled text |
| neutral-400 | #A39E99 | Placeholder text |
| neutral-500 | #7D7872 | Muted text |
| neutral-600 | #5C5752 | Secondary text |
| neutral-700 | #403C38 | Body text |
| neutral-800 | #2A2725 | Headings |
| neutral-900 | #1A1816 | Primary text |

### Semantic
| Token | Hex |
|---|---|
| success | #22C55E |
| error | #EF4444 |
| warning | #F59E0B |

---

## Typography

### Font Families
- **Display / Headings:** Outfit (Google Fonts)
- **Body / Labels / Captions:** Inter (Google Fonts)

### Type Scale

| Variant | Font | Size / Line Height | Weight | Letter Spacing | Element |
|---|---|---|---|---|---|
| `h1` | Outfit | 32px / 40px | 700 (bold) | -0.02em | `h1` |
| `h2` | Outfit | 24px / 32px | 600 (semibold) | -0.01em | `h2` |
| `h3` | Outfit | 20px / 28px | 600 (semibold) | 0 | `h3` |
| `h4` | Outfit | 18px / 26px | 500 (medium) | 0 | `h4` |
| `body` | Inter | 16px / 24px | 400 (regular) | 0 | `p` |
| `body-sm` | Inter | 14px / 20px | 400 (regular) | 0 | `p` |
| `caption` | Inter | 12px / 16px | 400 (regular) | 0 | `span` |
| `overline` | Inter | 12px / 16px | 600 (semibold) | 0.05em | `span` |

### Weight Tokens
| Weight name | Value |
|---|---|
| light | 300 |
| regular | 400 |
| medium | 500 |
| semibold | 600 |
| bold | 700 |

---

## Spacing

8px base unit. All spacing is a multiple.

| Token | Value |
|---|---|
| 1 | 4px |
| 2 | 8px |
| 3 | 12px |
| 4 | 16px |
| 5 | 20px |
| 6 | 24px |
| 8 | 32px |
| 10 | 40px |
| 12 | 48px |
| 16 | 64px |

---

## Border Radius

| Token | Value | Usage |
|---|---|---|
| sm | 8px | Badges, small chips |
| DEFAULT | 16px | Cards, inputs, buttons |
| lg | 24px | Hero sections, modals |
| full | 9999px | Pill buttons, avatars |

---

## Shadows (warm-tinted)

| Token | Value | Usage |
|---|---|---|
| ambient-low | `0 4px 15px rgba(120, 80, 50, 0.06)` | Cards at rest |
| ambient-high | `0 10px 30px rgba(120, 80, 50, 0.12)` | Cards on hover |
| inner | `inset 0 2px 4px rgba(120, 80, 50, 0.04)` | Inputs |

---

## Easing (per Emil Kowalski)

| Token | Value | Usage |
|---|---|---|
| ease-out-quart | `cubic-bezier(0.23, 1, 0.32, 1)` | UI interactions |
| ease-in-out-quart | `cubic-bezier(0.77, 0, 0.175, 1)` | On-screen movement |

---

## Animation Durations

| Element | Duration |
|---|---|
| Button press | 160ms |
| Card hover shadow | 300ms |
| Image scale on hover | 500ms |
| Page fade-in | 300ms |
| Stagger delay | 40ms between items |
| Skeleton shimmer | 2s infinite |

---

## Component Specs

### Card (Product/Category)
- Outer: `rounded-[16px]`, `shadow-ambient-low`, `overflow-hidden`
- Image area: `aspect-square`, `bg-surface-warm`, `p-4`, image with `object-contain`
- Content: padding 20px, category as overline, name as h3
- Hover: `shadow-ambient-high`, image `scale(1.05)`, desktop only
- Press: `scale(0.98)`, 160ms
- Height: `h-full flex flex-col` for equal rows

### Button
- Primary: `bg-primary-500`, `text-white`, `rounded-full`, `px-6 py-3`
- Outline: `border-2 border-primary-500`, `text-primary-500`, `rounded-full`
- Press: `active:scale-[0.98]`
- Hover: darken bg (primary-600)

### Glass Panel (Header)
- `background: rgba(253, 252, 250, 0.8)`
- `backdrop-filter: blur(12px)`
- `border-bottom: 1px solid rgba(0,0,0,0.06)`
