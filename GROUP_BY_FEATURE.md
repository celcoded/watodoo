# 🎯 Group By Mode Feature

## Overview

Added the ability to toggle between two kanban board grouping modes:
- **Energy Level** - Group tasks by how demanding they are
- **Urgency** - Group tasks by how time-sensitive they are

---

## Feature Details

### Toggle Button Location
The group-by toggle is located in the task filters section, next to the status filters (All, Active, Done, Overdue).

```
┌─────────────────────────────────────────────────────┐
│  [Search tasks...]                                  │
│                                                     │
│  [All] [Active] [Done] [Overdue]  [⚡Energy] [🔥Urgency] │
└─────────────────────────────────────────────────────┘
```

### Visual Design
- Two toggle buttons with icons
- Desktop: Shows icon + label (e.g., "⚡ Energy", "🔥 Urgency")
- Mobile: Shows icon only (conserves space)
- Active state: Highlighted button
- Smooth transition when switching modes

---

## Energy Mode (Default)

### Columns (4)
```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Low Energy  │ │  Moderate   │ │High Energy  │ │ Very Intense│
│    #0D4715  │ │   #41644A   │ │   #E9762B   │ │   #c5621e   │
├─────────────┤ ├─────────────┤ ├─────────────┤ ├─────────────┤
│ [Task Card] │ │ [Task Card] │ │ [Task Card] │ │ [Task Card] │
│ [Task Card] │ │ [Task Card] │ │ [Task Card] │ │             │
│             │ │ [Task Card] │ │             │ │             │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
```

### Use Case
Group tasks by how much energy/focus they require:
- **Low Energy** - Easy tasks, minimal concentration needed
- **Moderate** - Standard tasks requiring normal focus
- **High Energy** - Demanding tasks requiring high concentration
- **Very Intense** - Extremely demanding, maximum effort required

---

## Urgency Mode

### Columns (4)
```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│    Low      │ │   Medium    │ │    High     │ │  Critical   │
│  #0D4715    │ │   #41644A   │ │  #E9762B    │ │   #c5621e   │
├─────────────┤ ├─────────────┤ ├─────────────┤ ├─────────────┤
│ [Task Card] │ │ [Task Card] │ │ [Task Card] │ │ [Task Card] │
│ [Task Card] │ │ [Task Card] │ │ [Task Card] │ │             │
│             │ │ [Task Card] │ │             │ │             │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
```

### Use Case
Group tasks by how time-sensitive they are:
- **Low** - Can wait, no immediate pressure
- **Medium** - Should be done soon, moderate time pressure
- **High** - Needs attention soon, time-sensitive
- **Critical** - Urgent, must be done immediately

---

## Drag-and-Drop Behavior

### Energy Mode
When you drag a task to a different column:
- Task's **energy level** is updated automatically
- Task's urgency remains unchanged
- Example: Drag "Write report" from "High Energy" → "Moderate"
  - Energy level changes to "Moderate"
  - Urgency stays the same (e.g., "High")

### Urgency Mode
When you drag a task to a different column:
- Task's **urgency** is updated automatically
- Task's energy level remains unchanged
- Example: Drag "Email client" from "Low" → "High"
  - Urgency changes to "High"
  - Energy level stays the same (e.g., "Low Energy")

### Within Column
Both modes support reordering tasks within the same column:
- Drag task above/below other tasks
- Both energy and urgency remain unchanged
- Only position in the list changes

---

## Technical Implementation

### New Props & Types

**TaskFilters.tsx**
```typescript
export type GroupByType = 'energy' | 'urgency';

interface TaskFiltersProps {
  // ... existing props
  groupBy: GroupByType;
  onGroupByChange: (groupBy: GroupByType) => void;
}
```

**TaskManager.tsx**
```typescript
const [groupBy, setGroupBy] = useState<GroupByType>('energy');

// Dynamic column selection
const columns = groupBy === 'energy' ? TIRING_LEVELS : URGENCY_LEVELS;
const fieldName = groupBy === 'energy' ? 'tiringLevel' : 'urgency';
```

### Drag-and-Drop Logic

```typescript
// When dropping in a column
const updatedDragged = groupBy === 'energy'
  ? { ...draggedTask, tiringLevel: columnValue as TiringLevel }
  : { ...draggedTask, urgency: columnValue as Urgency };

// When dropping on a task
const updatedDragged = groupBy === 'energy'
  ? { ...draggedTask, tiringLevel: targetTask.tiringLevel }
  : { ...draggedTask, urgency: targetTask.urgency };
```

---

## User Workflow Examples

### Scenario 1: Planning Your Day by Energy
1. Switch to "Energy" mode
2. Look at your "Low Energy" column for easy warm-up tasks
3. Schedule "High Energy" tasks for peak focus times
4. Save "Very Intense" tasks for when you're most alert

### Scenario 2: Managing Deadlines by Urgency
1. Switch to "Urgency" mode
2. Focus on "Critical" column first
3. Plan "High" urgency tasks next
4. Keep "Low" urgency tasks for later

### Scenario 3: Adjusting Task Properties
**Energy Mode:**
- Realize a task is easier than thought
- Drag from "High Energy" → "Moderate"
- Energy level updates, urgency preserved

**Urgency Mode:**
- Deadline moved up unexpectedly
- Drag from "Medium" → "Critical"
- Urgency updates, energy level preserved

---

## Visual Indicators

### Column Headers
Both modes use the same visual design:
- Column title (different labels per mode)
- Colored bottom border
- Task count badge
- Consistent color scheme

### Task Cards
Task cards show BOTH properties regardless of grouping mode:
```
┌────────────────────────────────────┐
│  ☐  Task Title                  ✏️🗑️│
│     Description...                 │
│                                    │
│  [30m] [Today] [Moderate] [High]  │
│   ⏱️     📅       🔋        ⚠️     │
│                  ↑          ↑      │
│              Energy    Urgency     │
└────────────────────────────────────┘
```

This ensures you always see both classifications, even when grouped by one.

---

## State Persistence

### Current Session
- Group-by mode persists during the session
- Survives filter changes
- Survives search queries
- Resets only on page reload

### Future Enhancement
Could add localStorage to remember preference:
```typescript
// Save preference
localStorage.setItem('groupByMode', groupBy);

// Load on mount
const savedMode = localStorage.getItem('groupByMode') as GroupByType;
setGroupBy(savedMode || 'energy');
```

---

## Mobile Responsive

### Layout
- Columns scroll horizontally
- Toggle buttons show icons only (save space)
- Touch-friendly drag-and-drop
- Full functionality maintained

### Icons Used
- **Energy**: `BatteryChargingFull` icon (⚡)
- **Urgency**: `PriorityHigh` icon (🔥)

---

## Keyboard Shortcuts (Future Enhancement)

Could add keyboard shortcuts:
- `E` - Switch to Energy mode
- `U` - Switch to Urgency mode
- `Tab` - Cycle through columns
- `←→` - Move task between columns

---

## Use Cases by User Type

### Students
- **Energy Mode**: Plan study sessions by difficulty
- **Urgency Mode**: Manage assignment deadlines

### Developers
- **Energy Mode**: Batch similar complexity tasks
- **Urgency Mode**: Prioritize sprint deliverables

### Managers
- **Energy Mode**: Schedule meetings vs. deep work
- **Urgency Mode**: Handle escalations vs. routine tasks

### Freelancers
- **Energy Mode**: Balance client work by effort
- **Urgency Mode**: Meet multiple client deadlines

---

## Benefits

### Energy Mode Benefits
✅ Schedule tasks when you have appropriate energy
✅ Avoid burnout by balancing task difficulty
✅ Optimize productivity based on time of day
✅ Identify too many high-intensity tasks

### Urgency Mode Benefits
✅ Never miss critical deadlines
✅ Visualize time pressure across tasks
✅ Balance urgent vs. important work
✅ Quickly identify what needs immediate attention

### Dual Classification Benefits
✅ Separate concerns (effort vs. deadline)
✅ Better decision making
✅ More nuanced task management
✅ Flexible visualization

---

## Comparison

| Feature | Energy Mode | Urgency Mode |
|---------|-------------|--------------|
| **Focus** | Task difficulty | Time pressure |
| **Columns** | Low → Very Intense | Low → Critical |
| **Use When** | Planning energy | Managing deadlines |
| **Updates** | Energy level | Urgency level |
| **Best For** | Daily planning | Deadline tracking |

---

## Implementation Summary

### Files Modified: 2
1. `app/components/TaskFilters.tsx` - Added group-by toggle
2. `app/components/TaskManager.tsx` - Implemented dual grouping logic

### New Types: 1
- `GroupByType = 'energy' | 'urgency'`

### New State: 1
- `groupBy` state with toggle handler

### Lines Added: ~50

### Breaking Changes: None
- All existing functionality preserved
- Backwards compatible
- Default mode is "energy" (same as before)

---

## Testing Checklist

- [x] Toggle switches between modes
- [x] Columns update correctly
- [x] Drag-and-drop updates correct field
- [x] Task cards show both properties
- [x] Mobile view works
- [x] Icons display properly
- [x] Filters still work
- [x] Search still works
- [x] Color scheme consistent

---

**Feature Added**: January 7, 2026  
**Version**: 2.7  
**Status**: ✅ Complete and Functional
