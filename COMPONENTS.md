# Component Documentation

## Component Usage Examples

### TaskManager

The main container component that orchestrates the entire application.

```tsx
import TaskManager from './components/TaskManager';

export default function Home() {
  return <TaskManager />;
}
```

**Features**:
- Complete task management
- Search and filtering
- Schedule display
- Task CRUD operations
- localStorage persistence

---

### TaskCard

Displays an individual task with all its details and actions.

```tsx
import TaskCard from './components/TaskCard';

<TaskCard
  task={{
    id: '123',
    title: 'Complete project proposal',
    description: 'Write and submit the Q1 proposal',
    estimatedDuration: 120,
    deadline: new Date('2024-02-01T14:00:00'),
    tiringLevel: 'high',
    isCompleted: false,
    createdAt: new Date(),
  }}
  onToggleComplete={(id) => console.log('Toggle', id)}
  onEdit={(task) => console.log('Edit', task)}
  onDelete={(id) => console.log('Delete', id)}
  showSuggestedTime={true}
/>
```

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| task | Task | Yes | The task object to display |
| onToggleComplete | (id: string) => void | Yes | Called when checkbox is clicked |
| onEdit | (task: Task) => void | Yes | Called when edit button is clicked |
| onDelete | (id: string) => void | Yes | Called when delete button is clicked |
| showSuggestedTime | boolean | No | Whether to show suggested start time |

**Visual Elements**:
- Colored left border (energy level indicator)
- Checkbox for completion
- Task title and description
- Duration, deadline, and energy level chips
- Suggested time panel (when enabled)
- Edit and delete buttons

---

### TaskDialog

Modal dialog for creating and editing tasks.

```tsx
import TaskDialog from './components/TaskDialog';

<TaskDialog
  open={isDialogOpen}
  onClose={() => setIsDialogOpen(false)}
  onSave={(task) => {
    console.log('New task:', task);
    addTask(task);
  }}
  editTask={taskToEdit} // Optional
/>
```

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| open | boolean | Yes | Controls dialog visibility |
| onClose | () => void | Yes | Called when dialog is closed |
| onSave | (task: Task) => void | Yes | Called when task is saved |
| editTask | Task | No | Task to edit (omit for new task) |

**Form Fields**:
1. **Title** (TextField)
   - Required
   - Single line
   - Max 200 characters recommended

2. **Description** (TextField)
   - Optional
   - Multi-line (3 rows)
   - Max 500 characters recommended

3. **Estimated Duration** (Slider)
   - Range: 5-480 minutes
   - Step: 5 minutes
   - Default: 30 minutes
   - Displays as "X minutes"

4. **Deadline** (DateTimePicker)
   - Date and time selection
   - Defaults to current date/time
   - Uses Material UI date picker

5. **Energy Level** (Select)
   - Low Energy (green)
   - Moderate (orange)
   - High Energy (red)
   - Very Intense (purple)

**Validation**:
- Title: Cannot be empty
- Duration: Must be positive
- Dates: Validated by picker

---

### SchedulePanel

Displays the optimized schedule with suggestions.

```tsx
import SchedulePanel from './components/SchedulePanel';

<SchedulePanel
  tasks={[
    // Array of all tasks (completed and incomplete)
  ]}
/>
```

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| tasks | Task[] | Yes | Array of all tasks |

**Display Sections**:

1. **Header**
   - "Smart Schedule" title
   - Stats chips (free time, completion)

2. **Schedule List**
   - Numbered tasks in priority order
   - Start and end times
   - Task duration
   - Reasoning for placement

3. **Empty State**
   - Shown when no pending tasks
   - Encourages adding tasks

**Data Processing**:
- Filters out completed tasks
- Runs TaskScheduler algorithm
- Calculates free time
- Orders by priority

---

### TaskFilters

Search and filter controls for task list.

```tsx
import TaskFilters from './components/TaskFilters';

<TaskFilters
  searchQuery={searchQuery}
  onSearchChange={setSearchQuery}
  viewMode={viewMode}
  onViewModeChange={setViewMode}
  filter={filter}
  onFilterChange={setFilter}
/>
```

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| searchQuery | string | Yes | Current search query |
| onSearchChange | (query: string) => void | Yes | Called when search changes |
| viewMode | 'list' \| 'grid' | Yes | Current view mode |
| onViewModeChange | (mode: ViewMode) => void | Yes | Called when view changes |
| filter | FilterType | Yes | Current filter type |
| onFilterChange | (filter: FilterType) => void | Yes | Called when filter changes |

**Filter Options**:
- **All**: Show all tasks
- **Active**: Only incomplete tasks
- **Completed**: Only completed tasks
- **Overdue**: Only overdue tasks

**View Modes**:
- **List**: Vertical list view (default)
- **Grid**: Grid layout (future implementation)

---

## Custom Hooks

### useTasks

Manages task state and localStorage persistence.

```tsx
import { useTasks } from './hooks/useTasks';

function MyComponent() {
  const {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    clearCompletedTasks,
  } = useTasks();

  // Use the hook methods
}
```

**Return Values**:

| Property | Type | Description |
|----------|------|-------------|
| tasks | Task[] | Array of all tasks |
| loading | boolean | True during initial load |
| addTask | (task: Task) => void | Add new task |
| updateTask | (id: string, updates: Partial<Task>) => void | Update existing task |
| deleteTask | (id: string) => void | Delete task |
| toggleTaskComplete | (id: string) => void | Toggle completion status |
| clearCompletedTasks | () => void | Remove all completed tasks |

**Features**:
- Automatic localStorage sync
- Date serialization/deserialization
- Error handling
- Loading state management

**Usage Example**:
```tsx
const { tasks, addTask, loading } = useTasks();

if (loading) return <CircularProgress />;

const handleAddTask = () => {
  addTask({
    id: generateId(),
    title: 'New Task',
    estimatedDuration: 30,
    deadline: new Date(),
    tiringLevel: 'medium',
    isCompleted: false,
    createdAt: new Date(),
  });
};
```

---

## Utility Functions

### TaskScheduler Class

```tsx
import { TaskScheduler } from './utils/taskScheduler';

const scheduler = new TaskScheduler(tasks, {
  start: 9,  // 9 AM
  end: 18,   // 6 PM
});

const suggestions = scheduler.generateSchedule();
```

**Methods**:

1. **generateSchedule(): ScheduleSuggestion[]**
   - Generates optimized schedule
   - Returns array of suggestions
   - Includes reasoning for each task

2. **static calculateFreeTime(tasks: Task[]): number**
   - Calculates remaining free time
   - Returns minutes
   - Accounts for recovery time

### Helper Functions

```tsx
import {
  formatDuration,
  getTiringLevelColor,
  isTaskOverdue,
  generateId,
} from './utils/taskScheduler';
```

**formatDuration(minutes: number): string**
```tsx
formatDuration(90);   // "1h 30m"
formatDuration(60);   // "1h"
formatDuration(30);   // "30m"
```

**getTiringLevelColor(level: TiringLevel): string**
```tsx
getTiringLevelColor('low');       // "#4caf50"
getTiringLevelColor('high');      // "#f44336"
```

**isTaskOverdue(task: Task): boolean**
```tsx
isTaskOverdue(task);  // true if deadline passed and not completed
```

**generateId(): string**
```tsx
generateId();  // "1706745600000-x9k2m4n8p"
```

---

## Type Definitions

### Task

```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  estimatedDuration: number;
  deadline: Date;
  tiringLevel: TiringLevel;
  isCompleted: boolean;
  createdAt: Date;
  suggestedStartTime?: Date;
}
```

### TiringLevel

```typescript
type TiringLevel = 'low' | 'medium' | 'high' | 'very-high';
```

### ScheduleSuggestion

```typescript
interface ScheduleSuggestion {
  task: Task;
  suggestedStartTime: Date;
  suggestedEndTime: Date;
  reasoning: string;
}
```

### TaskFormData

```typescript
interface TaskFormData {
  title: string;
  description?: string;
  estimatedDuration: number;
  deadline: Date;
  tiringLevel: TiringLevel;
}
```

---

## Styling Guide

### Theme Customization

Edit `app/layout.tsx`:

```tsx
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',      // Blue
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',      // Purple
    },
    success: {
      main: '#4caf50',      // Green
    },
    error: {
      main: '#f44336',      // Red
    },
    warning: {
      main: '#ff9800',      // Orange
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',  // No uppercase
          borderRadius: 8,         // Rounded corners
        },
      },
    },
  },
});
```

### Custom Component Styles

Use Material UI's `sx` prop:

```tsx
<Box
  sx={{
    display: 'flex',
    gap: 2,
    p: 3,
    borderRadius: 2,
    bgcolor: 'background.paper',
    boxShadow: 1,
  }}
>
  {/* Content */}
</Box>
```

### Responsive Design

```tsx
<Box
  sx={{
    flexDirection: { xs: 'column', md: 'row' },
    gap: { xs: 1, sm: 2, md: 3 },
  }}
>
```

Breakpoints:
- `xs`: 0px+
- `sm`: 600px+
- `md`: 900px+
- `lg`: 1200px+
- `xl`: 1536px+

---

## Common Patterns

### Loading State

```tsx
if (loading) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
      <CircularProgress />
    </Box>
  );
}
```

### Empty State

```tsx
{tasks.length === 0 && (
  <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary' }}>
    <Typography variant="h6">No tasks yet</Typography>
    <Typography variant="body2">Add your first task to get started!</Typography>
  </Box>
)}
```

### Error Handling

```tsx
try {
  // Operation
} catch (error) {
  console.error('Error:', error);
  // Show error message to user
}
```

---

## Accessibility

### Keyboard Navigation

All components support:
- Tab navigation
- Enter to activate
- Escape to close dialogs

### Screen Readers

- Semantic HTML elements
- ARIA labels on icon buttons
- Proper heading hierarchy

### Color Contrast

All text meets WCAG AA standards:
- Normal text: 4.5:1
- Large text: 3:1

---

## Testing Examples

### Component Test

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from './TaskCard';

test('toggles task completion', () => {
  const mockToggle = jest.fn();
  const task = {
    id: '1',
    title: 'Test Task',
    // ... other properties
  };

  render(
    <TaskCard
      task={task}
      onToggleComplete={mockToggle}
      onEdit={() => {}}
      onDelete={() => {}}
    />
  );

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  expect(mockToggle).toHaveBeenCalledWith('1');
});
```

### Hook Test

```tsx
import { renderHook, act } from '@testing-library/react-hooks';
import { useTasks } from './useTasks';

test('adds task', () => {
  const { result } = renderHook(() => useTasks());

  act(() => {
    result.current.addTask({
      id: '1',
      title: 'Test',
      // ... other properties
    });
  });

  expect(result.current.tasks).toHaveLength(1);
  expect(result.current.tasks[0].title).toBe('Test');
});
```

---

## Best Practices

1. **Always use TypeScript types**
2. **Add 'use client' for browser APIs**
3. **Validate user input**
4. **Handle loading and error states**
5. **Use useMemo for expensive calculations**
6. **Keep components focused and small**
7. **Document complex logic with comments**
8. **Test user interactions**
9. **Follow Material Design guidelines**
10. **Maintain accessibility standards**

---

For more examples, see the actual component implementations in the `app/components/` directory.
