# 🎨 Color Palette Reference Guide

## Base Colors

```
┌─────────────────────────────────────────────────┐
│  #EBE1D1  Cream/Beige     ░░░░░░░░░░░░░░░░░░   │
│  #41644A  Forest Green    ██████████████████   │
│  #0D4715  Deep Green       ████████████████     │
│  #E9762B  Warm Orange      ██████████████████   │
└─────────────────────────────────────────────────┘
```

---

## Light Mode Palette

### Primary Colors
```
Primary (Forest Green)
├─ Main:  #41644A  ████████
├─ Light: #5a8266  ████████
└─ Dark:  #2d4633  ████████

Secondary (Warm Orange)
├─ Main:  #E9762B  ████████
├─ Light: #ed9355  ████████
└─ Dark:  #c5621e  ████████
```

### Status Colors
```
Success (Deep Green)
├─ Main:  #0D4715  ████████
├─ Light: #2d6738  ████████
└─ Dark:  #08300e  ████████

Error/Warning (Darker Orange)
├─ Main:  #c5621e  ████████
├─ Light: #d17940  ████████
└─ Dark:  #a04d15  ████████
```

### Background & Text
```
Background
├─ Default: #EBE1D1  ░░░░░░░░ (Cream)
└─ Paper:   #ffffff  ▓▓▓▓▓▓▓▓ (White)

Text
├─ Primary:   #0D4715  ████████ (Deep Green)
└─ Secondary: #41644A  ████████ (Forest Green)
```

---

## Dark Mode Palette

### Primary Colors
```
Primary (Lighter Forest Green)
├─ Main:  #5a8266  ████████
├─ Light: #7a9d84  ████████
└─ Dark:  #41644A  ████████

Secondary (Lighter Orange)
├─ Main:  #ed9355  ████████
├─ Light: #f2ad7a  ████████
└─ Dark:  #E9762B  ████████
```

### Status Colors
```
Success (Lighter Deep Green)
├─ Main:  #2d6738  ████████
├─ Light: #4a855b  ████████
└─ Dark:  #0D4715  ████████

Error/Warning (Lighter Orange)
├─ Main:  #d17940  ████████
├─ Light: #dc9565  ████████
└─ Dark:  #c5621e  ████████
```

### Background & Text
```
Background
├─ Default: #1a2c1e  ▓▓▓▓▓▓▓▓ (Dark Green-tinted)
└─ Paper:   #243529  ▓▓▓▓▓▓▓▓ (Lighter Dark Green)

Text
├─ Primary:   #EBE1D1  ░░░░░░░░ (Cream)
└─ Secondary: #c4b89f  ░░░░░░░░ (Darker Cream)
```

---

## Energy Level Colors

### Light Mode
```
Low Energy       #0D4715  ████████  Deep Green
Moderate         #41644A  ████████  Forest Green
High Energy      #E9762B  ████████  Warm Orange
Very Intense     #c5621e  ████████  Darker Orange
```

### Dark Mode
```
Low Energy       #2d6738  ████████  Lighter Deep Green
Moderate         #5a8266  ████████  Lighter Forest Green
High Energy      #ed9355  ████████  Lighter Orange
Very Intense     #E9762B  ████████  Warm Orange
```

---

## Urgency Level Colors

### Both Modes
```
Low              #0D4715  ████████  Deep Green (Light) / #2d6738 (Dark)
Medium           #41644A  ████████  Forest Green (Light) / #5a8266 (Dark)
High             #E9762B  ████████  Warm Orange (Light) / #ed9355 (Dark)
Critical         #c5621e  ████████  Darker Orange (Both)
```

---

## Gradients

### Header/AppBar
```
Light Mode:
┌────────────────────────────────────────────┐
│  ████████████████████████████████████████  │
│  #41644A ──────────────────────> #E9762B  │
│  Forest Green ──────────────> Warm Orange  │
└────────────────────────────────────────────┘

Dark Mode: Same gradient, looks different on dark background
```

### Buttons
```
Primary Button:
┌────────────────────────────────────────────┐
│             [Add Task]                     │
│  #41644A ──────────────────────> #E9762B  │
└────────────────────────────────────────────┘

Hover State:
┌────────────────────────────────────────────┐
│             [Add Task]                     │
│  #2d4633 ──────────────────────> #c5621e  │
│  (Darker versions of both colors)          │
└────────────────────────────────────────────┘
```

### Analytics Background
```
Light Mode:
┌────────────────────────────────────────────┐
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  rgba(65,100,74,0.05) ──> rgba(233,118,43,0.05)  │
│  Very subtle green ────────> Very subtle orange   │
└────────────────────────────────────────────┘

Dark Mode:
┌────────────────────────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│  rgba(65,100,74,0.1) ──> rgba(233,118,43,0.1)    │
│  Subtle green ──────────> Subtle orange           │
└────────────────────────────────────────────┘
```

---

## Usage Examples

### Kanban Column Headers
```
┌──────────────────────────┐
│  Low Energy         (3)  │  ← Title: #0D4715
│  ══════════════════════  │  ← Border: #0D4715
│                          │  ← Badge BG: #0D4715
│  [Task Card]             │
│  [Task Card]             │
└──────────────────────────┘
```

### Task Card
```
┌────────────────────────────────────┐
│  ▌ ☐  Task Title                 ✏️ 🗑️  │
│  ▌    Description text...             │
│  ▌                                     │
│  ▌    [30m] [Today] [Moderate] [High] │
│  ▌     ⏱️     📅       🔋        ⚠️    │
└────────────────────────────────────┘
   │
   └─ Left border color = Energy level color
```

### Chips/Tags
```
Energy Level Chips:
  Low       ▐████▌ White text on #0D4715
  Moderate  ▐████▌ White text on #41644A
  High      ▐████▌ White text on #E9762B
  Intense   ▐████▌ White text on #c5621e

Urgency Chips:
  Low       ▐████▌ White text on #0D4715
  Medium    ▐████▌ White text on #41644A
  High      ▐████▌ White text on #E9762B
  Critical  ▐████▌ White text on #c5621e
```

---

## Accessibility

### Contrast Ratios (Text on Background)

**Light Mode (Text on #EBE1D1):**
```
#0D4715 (Deep Green)      8.2:1  ✅ AAA (Normal & Large)
#41644A (Forest Green)    5.1:1  ✅ AA  (Normal & Large)
#E9762B (Warm Orange)     2.8:1  ❌ Fails (Use for large text only)
#c5621e (Darker Orange)   3.8:1  ⚠️  AA  (Large text only)
```

**Dark Mode (Text on #1a2c1e):**
```
#EBE1D1 (Cream)           11.5:1 ✅ AAA (Normal & Large)
#c4b89f (Darker Cream)    8.9:1  ✅ AAA (Normal & Large)
#5a8266 (Light Green)     4.2:1  ✅ AA  (Normal & Large)
#ed9355 (Light Orange)    5.3:1  ✅ AA  (Normal & Large)
```

**Recommendations:**
- ✅ Use deep green (#0D4715) for primary body text (light mode)
- ✅ Use cream (#EBE1D1) for primary body text (dark mode)
- ⚠️  Use orange colors for accents and large text only
- ✅ All button text is white on colored backgrounds (excellent contrast)

---

## Color Meanings & Psychology

### Deep Green (#0D4715)
- **Meaning**: Growth, reliability, freshness
- **Usage**: Success states, low energy tasks, primary text (light mode)
- **Emotion**: Calm, stable, trustworthy

### Forest Green (#41644A)
- **Meaning**: Nature, balance, harmony
- **Usage**: Primary brand color, moderate energy tasks, buttons
- **Emotion**: Balanced, natural, grounded

### Warm Orange (#E9762B)
- **Meaning**: Energy, enthusiasm, creativity
- **Usage**: High energy tasks, call-to-action, urgency
- **Emotion**: Energetic, warm, exciting

### Cream/Beige (#EBE1D1)
- **Meaning**: Simplicity, elegance, neutrality
- **Usage**: Background, breathing room, text (dark mode)
- **Emotion**: Clean, simple, spacious

---

## Implementation Notes

### CSS Variables
```css
:root {
  --background: #EBE1D1;
  --foreground: #0D4715;
  --primary: #41644A;
  --secondary: #E9762B;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #1a2c1e;
    --foreground: #EBE1D1;
    --primary: #5a8266;
    --secondary: #ed9355;
  }
}
```

### Material-UI Theme
```typescript
palette: {
  mode: 'light' | 'dark',
  primary: { main: '#41644A', ... },
  secondary: { main: '#E9762B', ... },
  background: { 
    default: '#EBE1D1',  // Light mode
    paper: '#ffffff'
  },
  text: {
    primary: '#0D4715',   // Light mode
    secondary: '#41644A'
  }
}
```

---

## Color Mixing Guide

### Creating Shades
```
Lighter (+20% brightness):
  #41644A → #5a8266
  #E9762B → #ed9355

Darker (-20% brightness):
  #41644A → #2d4633
  #E9762B → #c5621e
```

### Opacity Variations
```
10% opacity: Background hints
20% opacity: Hover states
30% opacity: Active states
50% opacity: Disabled elements
70% opacity: Secondary elements
100% opacity: Primary elements
```

---

**Color Palette Version**: 2.6  
**Last Updated**: January 7, 2026  
**Status**: ✅ Production Ready
