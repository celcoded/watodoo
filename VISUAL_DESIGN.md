# 🎨 Visual Design Showcase

## Design Highlights

### Color Scheme

#### Light Mode
```
┌─────────────────────────────────────┐
│  Primary: #6366f1 (Indigo)         │  ███████  Vibrant & Professional
│  Secondary: #ec4899 (Pink)         │  ███████  Bold & Energetic
│  Success: #10b981 (Emerald)        │  ███████  Fresh & Positive  
│  Error: #ef4444 (Red)              │  ███████  Clear & Urgent
│  Warning: #f59e0b (Amber)          │  ███████  Warm & Cautionary
│  Info: #3b82f6 (Blue)              │  ███████  Clear & Informative
│  Background: #f8fafc              │  ░░░░░░░  Soft & Clean
│  Surface: #ffffff                  │  ▓▓▓▓▓▓▓  Crisp White
└─────────────────────────────────────┘
```

#### Dark Mode
```
┌─────────────────────────────────────┐
│  Primary: #818cf8 (Light Indigo)   │  ███████  Vivid & Readable
│  Secondary: #f472b6 (Light Pink)   │  ███████  Bright & Engaging
│  Success: #34d399 (Light Emerald)  │  ███████  Optimistic & Clear
│  Error: #f87171 (Light Red)        │  ███████  Visible & Urgent
│  Warning: #fbbf24 (Light Amber)    │  ███████  Prominent & Safe
│  Info: #60a5fa (Light Blue)        │  ███████  Distinct & Clear
│  Background: #0f172a              │  ░░░░░░░  Deep & Immersive
│  Surface: #1e293b                 │  ▓▓▓▓▓▓▓  Elevated Dark
└─────────────────────────────────────┘
```

### Typography Scale

```
H3 (Main Title)     2.5rem  ██████████████████████████████
H5 (Section)        1.5rem  ████████████████
H6 (Subsection)     1.25rem █████████████
Body1 (Regular)     1rem    ██████████
Body2 (Secondary)   0.875rem ████████
Caption             0.75rem  ██████
```

### Spacing System

```
Base Unit: 8px

xs:   8px   ░
sm:  16px   ░░
md:  24px   ░░░
lg:  32px   ░░░░
xl:  48px   ░░░░░░
```

### Border Radius

```
Small:    4px   ╭─╮
Medium:   8px   ╭──╮
Large:   12px   ╭───╮
Pill:    16px   ╭────╮
Circle:  50%    ●
```

## Layout Examples

### Desktop Layout (> 960px)
```
┌─────────────────────────────────────────────────────────┐
│  ⚡ Watodoo   🔔 ☀️                        │
│  Tasks    Analytics    Schedule                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────────┐  ┌───────────────────┐   │
│  │  📝 Your Tasks           │  │  📊 Analytics     │   │
│  │  ─────────────────────   │  │  ───────────────  │   │
│  │  [Search...]    [Filter] │  │  Completion: 75%  │   │
│  │                           │  │  Time: 4.5h done  │   │
│  │  ┌─ Task Card ─────┐     │  │  Trend: ↗ High   │   │
│  │  │ ☐ Task Title     │     │  │  Balance: Medium  │   │
│  │  │ Description...   │     │  └───────────────────┘   │
│  │  │ 30m | Due: Today│     │                           │
│  │  └──────────────────┘     │  ┌───────────────────┐   │
│  │                           │  │  📅 Schedule      │   │
│  │  ┌─ Task Card ─────┐     │  │  ───────────────  │   │
│  │  │ ☑ Completed      │     │  │  1. Task A       │   │
│  │  │ Description...   │     │  │     9:00-9:30    │   │
│  │  │ 45m | Overdue   │     │  │                   │   │
│  │  └──────────────────┘     │  │  2. Task B       │   │
│  │                           │  │     10:00-11:00   │   │
│  └──────────────────────────┘  └───────────────────┘   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Mobile Layout (< 600px)
```
┌──────────────────────────┐
│ ☰  ⚡ Procs...  🔔 ☀️    │
├──────────────────────────┤
│  Tasks ▼                 │
├──────────────────────────┤
│                          │
│  📝 Your Tasks           │
│  ───────────────────     │
│                          │
│  [Search tasks...]       │
│  [All|Active|Done]       │
│                          │
│  ┌─ Task Card ────────┐  │
│  │ ☐ Task Title       │  │
│  │ Description text   │  │
│  │ 30m | Due: Today   │  │
│  │ Medium Energy      │  │
│  └────────────────────┘  │
│                          │
│  ┌─ Task Card ────────┐  │
│  │ ☑ Completed Task   │  │
│  │ Description text   │  │
│  │ 45m | Yesterday    │  │
│  └────────────────────┘  │
│                          │
│              ┌─────┐     │
│              │  +  │ FAB │
│              └─────┘     │
└──────────────────────────┘
```

## Component Showcase

### App Bar

#### Desktop
```
┌────────────────────────────────────────────────────────┐
│  ⚡ Watodoo          🔔(2)  ☀️           │
│  ═══════════════════════════════════════════════════   │
│  Tasks    Analytics    Schedule                        │
│  ─────                                                  │
└────────────────────────────────────────────────────────┘
```

#### Mobile
```
┌─────────────────────────┐
│  ☰  ⚡ Procs...  🔔 ☀️  │
└─────────────────────────┘
```

### Task Card Variants

#### Active Task
```
┌─────────────────────────────────────┐
│ ≡  ☐  Task: Complete project       │  ← Drag handle
│       Design awesome UI             │
│                                     │
│       ⏱ 2h  |  📅 Today 5:00 PM   │
│       🔴 High Energy                │
│                                     │
│                          ✏️  🗑️    │
└─────────────────────────────────────┘
```

#### Completed Task (Faded)
```
┌─────────────────────────────────────┐
│ ≡  ☑  Task: Review code            │  ← Lower opacity
│       Check for bugs                │
│                                     │
│       ⏱ 30m  |  📅 Yesterday       │
│       🟢 Low Energy                 │
│                                     │
│                          ✏️  🗑️    │
└─────────────────────────────────────┘
```

#### Overdue Task (Red accent)
```
┌─────────────────────────────────────┐
│ ≡  ☐  Task: Submit report          │  ← Red left border
│       Quarterly summary             │
│                                     │
│       ⏱ 1h  |  🔴 2 days overdue   │
│       🟡 Medium Energy              │
│                                     │
│                          ✏️  🗑️    │
└─────────────────────────────────────┘
```

### Analytics Cards

```
┌───────────────────┐  ┌───────────────────┐
│  ✓  Completion    │  │  ⏱  Time         │
│     Rate          │  │     Completed     │
│                   │  │                   │
│     75%           │  │     4h 30m        │
│     3 of 4 tasks  │  │     1h 30m left   │
└───────────────────┘  └───────────────────┘

┌───────────────────┐  ┌───────────────────┐
│  ↗  Productivity  │  │  💡  Energy       │
│     Trend         │  │     Balance       │
│                   │  │                   │
│     High          │  │     Medium        │
│     Based on 75%  │  │     Most common   │
└───────────────────┘  └───────────────────┘
```

### Notification Center

```
┌─────────────────────────────┐
│  Notifications        🔔(3) │
│  ─────────────────────────  │
│                             │
│  ⚠️  Task "Report" overdue  │
│      Just now               │
│                          ✕  │
│  ─────────────────────────  │
│  ⏰  "Meeting" due today    │
│      5:00 PM                │
│                          ✕  │
│  ─────────────────────────  │
│  ⏰  "Review" due tomorrow  │
│      10 minutes ago         │
│                          ✕  │
└─────────────────────────────┘
```

### Task Dialog

```
┌─────────────────────────────────┐
│  Add New Task                   │
├─────────────────────────────────┤
│                                 │
│  Task Title *                   │
│  [________________]             │
│                                 │
│  Description                    │
│  [________________]             │
│  [________________]             │
│                                 │
│  Estimated Duration: 30 minutes │
│  ○──────●──────────────○        │
│  30m    1h            4h        │
│                                 │
│  Deadline                       │
│  [📅 01/15/2026  🕐 2:00 PM]   │
│                                 │
│  Energy Level Required          │
│  [🟡 Medium         ▼]         │
│                                 │
├─────────────────────────────────┤
│            Cancel    Add Task   │
└─────────────────────────────────┘
```

## Interactive States

### Button States
```
Normal:    ┌─────────┐
           │ Add Task│
           └─────────┘

Hover:     ┌─────────┐  ← Elevated shadow
           │ Add Task│
           └─────────┘

Active:    ┌─────────┐  ← Slightly smaller
           │ Add Task│
           └─────────┘

Disabled:  ┌─────────┐  ← Faded
           │ Add Task│
           └─────────┘
```

### Card Hover
```
Normal:    ┌─ Task ─┐
           │ ...    │  ← shadow-sm
           └────────┘

Hover:     ┌─ Task ─┐
           │ ...    │  ← shadow-lg + translateY(-2px)
           └────────┘
```

### Drag States
```
Start:     ┌─ Task ─┐
≡          │ ...    │  ← cursor: grab
           └────────┘

Dragging:  ┌─ Task ─┐
≡          │ ...    │  ← cursor: grabbing, opacity: 0.7
           └────────┘

Drop:      ┌─ Task ─┐
           │ ...    │  ← smooth reorder animation
           └────────┘
```

## Gradient Usage

### Primary Gradient (Header, Buttons)
```
╔══════════════════════════════════╗
║ Indigo → Pink                    ║
║ #6366f1 ────────────→ #ec4899   ║
║ ████████████████████████████████ ║
╚══════════════════════════════════╝
```

### Analytics Background
```
┌──────────────────────────────────┐
│ Indigo 5% → Pink 5% (opacity)    │
│ Subtle gradient wash             │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└──────────────────────────────────┘
```

## Iconography

```
⚡  Watodoo (Logo/Brand)
📝  Tasks Section
📊  Analytics Section
📅  Schedule Section
🔔  Notifications
☀️  Light Mode
🌙  Dark Mode
☰   Hamburger Menu
≡   Drag Handle
+   Add/Create
✏️  Edit
🗑️  Delete
☐   Unchecked Task
☑   Checked Task
⏱   Duration/Time
🎯  Priority
💡  Energy/Ideas
↗   Trending Up
⚠️  Warning/Alert
✓   Success/Complete
```

## Energy Level Indicators

```
🟢 Low          ███████  Easy tasks
🔵 Low-Medium   ███████  Moderate effort
🟡 Medium       ███████  Standard tasks
🟠 Medium-High  ███████  Challenging
🔴 High         ███████  Demanding
```

## Responsive Grid

### Desktop (3 columns)
```
┌────────┐ ┌────────┐ ┌────────┐
│ Card 1 │ │ Card 2 │ │ Card 3 │
└────────┘ └────────┘ └────────┘
┌────────┐ ┌────────┐ ┌────────┐
│ Card 4 │ │ Card 5 │ │ Card 6 │
└────────┘ └────────┘ └────────┘
```

### Tablet (2 columns)
```
┌────────┐ ┌────────┐
│ Card 1 │ │ Card 2 │
└────────┘ └────────┘
┌────────┐ ┌────────┐
│ Card 3 │ │ Card 4 │
└────────┘ └────────┘
```

### Mobile (1 column)
```
┌────────┐
│ Card 1 │
└────────┘
┌────────┐
│ Card 2 │
└────────┘
┌────────┐
│ Card 3 │
└────────┘
```

## Animation Examples

### Fade In
```
Frame 1:  □ (opacity: 0, y: 10px)
Frame 2:  ▢ (opacity: 0.5, y: 5px)
Frame 3:  ▣ (opacity: 1, y: 0px)
Duration: 300ms
```

### Slide Up
```
Frame 1:  ┌──┐
          └──┘ ↑ (translateY: 20px)
          
Frame 2:  ┌──┐ ↑ (translateY: 0px)
          └──┘
Duration: 200ms
```

### Pulse (Notification)
```
Frame 1:  ● (scale: 1)
Frame 2:  ◉ (scale: 1.1)
Frame 3:  ● (scale: 1)
Duration: 500ms, infinite
```

## Accessibility Features

### Focus States
```
Tab Focus:  ┌──────────┐
            │ Button   │ ← 2px blue outline
            └──────────┘
```

### Color Contrast
```
Light Mode:  Dark text on light bg  (7.5:1)
Dark Mode:   Light text on dark bg  (9.2:1)
Buttons:     White text on color    (4.6:1)
```

### Touch Targets
```
Mobile:  ┌──────────┐
         │   44px   │ ← Minimum size
         │  Button  │
         └──────────┘
```

---

This visual design creates a modern, engaging, and accessible user interface that works beautifully across all devices and color modes!
