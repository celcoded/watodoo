# 🎨 Color Palette Documentation

## Design System Colors

### Primary Colors

#### Indigo (Primary Brand Color)
- **Light Mode**
  - Main: `#6366f1`
  - Light: `#818cf8`
  - Dark: `#4f46e5`
  
- **Dark Mode**
  - Main: `#818cf8`
  - Light: `#a5b4fc`
  - Dark: `#6366f1`

**Usage**: Primary buttons, links, key UI elements, app header gradient

#### Pink (Secondary/Accent Color)
- **Light Mode**
  - Main: `#ec4899`
  - Light: `#f472b6`
  - Dark: `#db2777`
  
- **Dark Mode**
  - Main: `#f472b6`
  - Light: `#f9a8d4`
  - Dark: `#ec4899`

**Usage**: Accent elements, call-to-action, app header gradient

### Status Colors

#### Success (Emerald)
- **Light Mode**
  - Main: `#10b981`
  - Light: `#34d399`
  - Dark: `#059669`
  
- **Dark Mode**
  - Main: `#34d399`
  - Light: `#6ee7b7`
  - Dark: `#10b981`

**Usage**: Completed tasks, success messages, positive metrics

#### Error (Red)
- **Light Mode**
  - Main: `#ef4444`
  - Light: `#f87171`
  - Dark: `#dc2626`
  
- **Dark Mode**
  - Main: `#f87171`
  - Light: `#fca5a5`
  - Dark: `#ef4444`

**Usage**: Overdue tasks, error messages, delete actions

#### Warning (Amber)
- **Light Mode**
  - Main: `#f59e0b`
  - Light: `#fbbf24`
  - Dark: `#d97706`
  
- **Dark Mode**
  - Main: `#fbbf24`
  - Light: `#fcd34d`
  - Dark: `#f59e0b`

**Usage**: Due soon notifications, medium priority items

#### Info (Blue)
- **Light Mode**
  - Main: `#3b82f6`
  - Light: `#60a5fa`
  - Dark: `#2563eb`
  
- **Dark Mode**
  - Main: `#60a5fa`
  - Light: `#93c5fd`
  - Dark: `#3b82f6`

**Usage**: Information messages, secondary highlights

### Task Energy Level Colors

#### Low Energy
- Light Mode: `#10b981` (Emerald)
- Dark Mode: `#34d399`
- **Use Case**: Easy, quick tasks that require minimal effort

#### Low-Medium Energy
- Light Mode: `#3b82f6` (Blue)
- Dark Mode: `#60a5fa`
- **Use Case**: Tasks requiring some focus but not exhausting

#### Medium Energy
- Light Mode: `#f59e0b` (Amber)
- Dark Mode: `#fbbf24`
- **Use Case**: Standard tasks requiring moderate effort

#### Medium-High Energy
- Light Mode: `#f97316` (Orange)
- Dark Mode: `#fb923c`
- **Use Case**: Challenging tasks requiring significant focus

#### High Energy
- Light Mode: `#ef4444` (Red)
- Dark Mode: `#f87171`
- **Use Case**: Demanding tasks requiring maximum energy and focus

### Background Colors

#### Light Mode
- **Default**: `#f8fafc` (Slate 50)
- **Paper**: `#ffffff` (White)

#### Dark Mode
- **Default**: `#0f172a` (Slate 900)
- **Paper**: `#1e293b` (Slate 800)

### Text Colors

#### Light Mode
- **Primary**: `#1e293b` (Slate 800)
- **Secondary**: `#64748b` (Slate 500)

#### Dark Mode
- **Primary**: `#f1f5f9` (Slate 100)
- **Secondary**: `#cbd5e1` (Slate 300)

## Gradients

### Primary Gradient
```css
background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
```
**Usage**: App header, primary buttons, hero sections

### Analytics Background
```css
background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%);
```
**Usage**: Analytics dashboard background

## Color Accessibility

All color combinations meet WCAG 2.1 AA standards:
- **Text on Light Background**: Minimum 4.5:1 contrast ratio
- **Text on Dark Background**: Minimum 4.5:1 contrast ratio
- **Interactive Elements**: Minimum 3:1 contrast ratio

## Color Psychology

- **Indigo**: Trust, professionalism, productivity
- **Pink**: Energy, creativity, enthusiasm
- **Emerald**: Success, growth, completion
- **Red**: Urgency, importance, attention
- **Amber**: Caution, awareness, priority
- **Blue**: Information, clarity, focus

## Usage Examples

### Task Cards
```typescript
borderLeft: `4px solid ${tiringLevelColor}` // Indicates energy level
```

### Buttons
```typescript
// Primary action
background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'

// Success action
color: 'success.main'

// Danger action
color: 'error.main'
```

### Status Chips
```typescript
// Completed
color="success"

// Overdue
color="error"

// Due soon
color="warning"
```

## Dark Mode Implementation

Colors automatically adjust based on theme mode:
```typescript
const theme = useTheme();
const color = theme.palette.mode === 'dark' 
  ? darkModeColor 
  : lightModeColor;
```

## Brand Colors

If you want to customize for your brand:
1. Edit `app/theme/colors.ts`
2. Update `lightPalette` and `darkPalette` objects
3. Ensure contrast ratios meet accessibility standards
4. Test in both light and dark modes

## Tools & Resources

- **Color Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Coolors**: https://coolors.co/ (palette generator)
- **Adobe Color**: https://color.adobe.com/ (color wheel)
- **Material Design Color Tool**: https://material.io/resources/color/
