# 📐 Component Architecture

## Component Hierarchy

```
RootLayout (layout.tsx)
│
├── ThemeModeProvider (context/ThemeContext.tsx)
│   └── ThemeWrapper
│       ├── ThemeProvider (MUI)
│       ├── LocalizationProvider (MUI Date Pickers)
│       └── CssBaseline (MUI)
│
└── TaskManager (components/TaskManager.tsx) ⭐ MAIN
    │
    ├── AppBar
    │   ├── Toolbar
    │   │   ├── MenuIcon (mobile only)
    │   │   ├── Typography (app title)
    │   │   ├── NotificationCenter 🆕
    │   │   │   ├── IconButton (bell icon)
    │   │   │   ├── Badge (notification count)
    │   │   │   ├── Menu (notification dropdown)
    │   │   │   └── Snackbar (alerts)
    │   │   └── IconButton (dark mode toggle) 🆕
    │   │
    │   └── Tabs (desktop only)
    │       ├── Tab (Tasks)
    │       ├── Tab (Analytics) 🆕
    │       └── Tab (Schedule)
    │
    ├── Drawer (mobile only)
    │   └── List (navigation items)
    │
    ├── Container
    │   │
    │   ├── [Tasks Tab View] 🔄 Enhanced
    │   │   └── Grid
    │   │       └── Paper
    │   │           ├── Box (header)
    │   │           │   ├── Typography (title)
    │   │           │   └── Button (add task)
    │   │           │
    │   │           ├── TaskFilters 🔄
    │   │           │   ├── TextField (search)
    │   │           │   ├── ToggleButtonGroup (filter)
    │   │           │   └── ToggleButtonGroup (view mode)
    │   │           │
    │   │           └── Box (task list)
    │   │               └── TaskCard[] 🔄 Enhanced
    │   │                   ├── DragIndicator (drag handle) 🆕
    │   │                   ├── Checkbox (complete toggle)
    │   │                   ├── Box (content)
    │   │                   │   ├── Typography (title)
    │   │                   │   ├── Typography (description)
    │   │                   │   ├── Box (chips)
    │   │                   │   │   ├── Chip (duration)
    │   │                   │   │   ├── Chip (deadline)
    │   │                   │   │   └── Chip (energy level)
    │   │                   │   └── Box (suggested time)
    │   │                   └── Box (actions)
    │   │                       ├── IconButton (edit)
    │   │                       └── IconButton (delete)
    │   │
    │   ├── [Analytics Tab View] 🆕 NEW
    │   │   └── AnalyticsDashboard
    │   │       ├── Typography (title)
    │   │       ├── Grid (stats cards)
    │   │       │   └── Paper[] (4 stat cards)
    │   │       │       ├── Box (content)
    │   │       │       │   ├── Typography (label)
    │   │       │       │   ├── Typography (value)
    │   │       │       │   └── Typography (subtitle)
    │   │       │       └── Chip (icon)
    │   │       │
    │   │       └── Box (distribution)
    │   │           └── LinearProgress[] (energy levels)
    │   │
    │   └── [Schedule Tab View] 🔄 Enhanced
    │       └── SchedulePanel
    │           ├── Typography (title)
    │           ├── Box (summary chips)
    │           │   ├── Chip (free time)
    │           │   └── Chip (completion)
    │           ├── Divider
    │           └── List (schedule)
    │               └── ListItem[] (suggested tasks)
    │                   ├── Typography (task name)
    │                   ├── Chip (duration)
    │                   ├── Typography (time range)
    │                   └── Typography (reasoning)
    │
    ├── Fab (mobile only)
    │   └── AddIcon
    │
    └── TaskDialog 🔄 Enhanced
        ├── DialogTitle
        ├── DialogContent
        │   ├── TextField (title)
        │   ├── TextField (description)
        │   ├── Slider (duration)
        │   ├── DateTimePicker (deadline)
        │   └── Select (energy level)
        └── DialogActions
            ├── Button (cancel)
            └── Button (save)
```

## Component Relationships

### Parent-Child Relationships

```
TaskManager
├─► NotificationCenter (sibling in AppBar)
├─► TaskCard (renders multiple)
├─► TaskDialog (modal)
├─► TaskFilters (filters tasks)
├─► AnalyticsDashboard (tab view) 🆕
└─► SchedulePanel (tab view)
```

### Data Flow

```
TaskManager (state owner)
    ↓ tasks[]
    ├─► TaskCard[] (display)
    ├─► AnalyticsDashboard (analyze) 🆕
    ├─► SchedulePanel (schedule)
    └─► NotificationCenter (notify) 🆕
    
    ↓ actions
    ├─► addTask()
    ├─► updateTask()
    ├─► deleteTask()
    ├─► toggleTaskComplete()
    └─► reorderTasks() 🆕
```

### Context Providers

```
RootLayout
    └─► ThemeModeProvider
            ├─► mode: 'light' | 'dark'
            └─► toggleTheme()
                    ↓
                Used by: All components
```

## Component Types

### Container Components (Smart)
- **TaskManager** - Main app logic and state
- **NotificationCenter** - Notification logic 🆕
- **AnalyticsDashboard** - Analytics calculations 🆕

### Presentation Components (Dumb)
- **TaskCard** - Display single task
- **TaskDialog** - Task form
- **TaskFilters** - Filter controls
- **SchedulePanel** - Display schedule

### Context Components
- **ThemeModeProvider** - Dark mode state 🆕
- **ThemeWrapper** - MUI theme application 🆕

## State Management

### Global State (Context)
```typescript
ThemeContext
├─► mode: 'light' | 'dark'
└─► toggleTheme: () => void
```

### Local State (TaskManager)
```typescript
TaskManager
├─► tasks: Task[]
├─► loading: boolean
├─► dialogOpen: boolean
├─► editingTask: Task | undefined
├─► searchQuery: string
├─► viewMode: 'list' | 'grid'
├─► filter: FilterType
├─► drawerOpen: boolean (mobile)
├─► currentTab: TabValue 🆕
└─► draggedTask: Task | null 🆕
```

### Derived State (useMemo)
```typescript
filteredTasks = useMemo(() => {
  // Filter and search logic
}, [tasks, filter, searchQuery])
```

## Hooks Used

### Custom Hooks
- **useTasks()** - Task CRUD operations
- **useThemeMode()** - Dark mode state 🆕

### React Hooks
- **useState** - Component state
- **useEffect** - Side effects, lifecycle
- **useMemo** - Memoized computations
- **useContext** - Context consumption

### MUI Hooks
- **useTheme()** - Access MUI theme
- **useMediaQuery()** - Responsive breakpoints

## Event Flow

### Task Creation
```
User clicks "Add Task"
    ↓
TaskManager.setDialogOpen(true)
    ↓
TaskDialog renders
    ↓
User fills form → handleSubmit()
    ↓
TaskManager.handleSaveTask()
    ↓
useTasks.addTask()
    ↓
LocalStorage update
    ↓
Re-render with new task
```

### Dark Mode Toggle
```
User clicks theme icon
    ↓
ThemeContext.toggleTheme()
    ↓
Update localStorage
    ↓
ThemeWrapper re-renders
    ↓
All components update with new theme
```

### Drag-and-Drop
```
User starts dragging task
    ↓
TaskCard.handleDragStart()
    ↓
TaskManager.setDraggedTask()
    ↓
User drops on target
    ↓
TaskCard.handleDrop()
    ↓
TaskManager.reorderTasks()
    ↓
useTasks.reorderTasks()
    ↓
LocalStorage update
    ↓
Re-render with new order
```

### Notification Check
```
setInterval (every 60s)
    ↓
NotificationCenter.checkNotifications()
    ↓
Compare task deadlines with current time
    ↓
Generate notification objects
    ↓
Update notifications state
    ↓
Show snackbar alert
    ↓
Update notification badge
```

## Responsive Behavior

### Desktop (> 960px)
```
AppBar
├─► Tabs (visible)
└─► No drawer

Container
└─► Multi-column grid
```

### Tablet (600-960px)
```
AppBar
├─► Tabs (visible)
└─► No drawer

Container
└─► Two-column grid
```

### Mobile (< 600px)
```
AppBar
├─► No tabs
├─► Hamburger menu
└─► Drawer navigation

Container
├─► Single-column grid
└─► Full-screen dialogs

Fab (visible)
```

## Performance Optimization

### Memoization
- **filteredTasks** - useMemo for expensive filtering
- **Component.memo** - Prevent unnecessary re-renders (could be added)

### Lazy Loading
- Next.js automatic code splitting
- Components load on demand

### State Updates
- Batch updates where possible
- Avoid unnecessary state changes
- Use functional updates for arrays

## File Organization

```
app/
├── components/          (UI Components)
│   ├── TaskManager.tsx       (Main)
│   ├── TaskCard.tsx          (Presentation)
│   ├── TaskDialog.tsx        (Form)
│   ├── TaskFilters.tsx       (Controls)
│   ├── SchedulePanel.tsx     (Display)
│   ├── AnalyticsDashboard.tsx 🆕
│   └── NotificationCenter.tsx 🆕
│
├── context/            (Global State)
│   └── ThemeContext.tsx 🆕
│
├── hooks/              (Custom Hooks)
│   └── useTasks.ts
│
├── theme/              (Design System)
│   └── colors.ts 🆕
│
├── types/              (TypeScript)
│   └── task.ts
│
├── utils/              (Helpers)
│   └── taskScheduler.ts
│
├── constants/          (Config)
│   └── index.ts
│
├── layout.tsx          (Root Layout)
├── page.tsx            (Entry Point)
└── globals.css         (Global Styles)
```

## Component Size Comparison

### Small Components (< 100 lines)
- TaskFilters
- page.tsx

### Medium Components (100-300 lines)
- TaskCard
- TaskDialog
- SchedulePanel
- ThemeContext
- AnalyticsDashboard 🆕

### Large Components (> 300 lines)
- TaskManager (450+ lines)
- NotificationCenter (250+ lines) 🆕

## Testing Strategy

### Unit Tests (Recommended)
- useTasks hook
- Utility functions
- Individual components

### Integration Tests
- Task CRUD flow
- Theme switching
- Notification triggering

### E2E Tests
- Complete user workflows
- Mobile responsive behavior
- Cross-browser compatibility

---

🆕 = New Component/Feature
🔄 = Enhanced Component
⭐ = Main Entry Point
