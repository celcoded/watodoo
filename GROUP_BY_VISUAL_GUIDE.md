# 🎯 Group By Mode - Quick Visual Guide

## Toggle Location

```
┌─────────────────────────────────────────────────────────┐
│  Your Tasks                            [Add Task] ━━━┓  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  [Search tasks...]                               │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────────────────────────────┐  ┌────────────────┐  │
│  │ [All] [Active] [Done] [Overdue] │  │ [⚡Energy] [🔥Urgency] │  │
│  └──────────────────────────────┘  └────────────────┘  │
│                                      ↑                   │
│                                  GROUP BY TOGGLE        │
└─────────────────────────────────────────────────────────┘
```

---

## Energy Mode (Default)

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Low Energy   │  Moderate    │ High Energy  │ Very Intense │
│    (2)       │     (5)      │     (3)      │     (1)      │
│ ══════════   │ ══════════   │ ══════════   │ ══════════   │
│              │              │              │              │
│ ┌──────────┐ │ ┌──────────┐ │ ┌──────────┐ │ ┌──────────┐ │
│ │ Reply to │ │ │ Write    │ │ │ Design   │ │ │ Present  │ │
│ │ emails   │ │ │ report   │ │ │ mockups  │ │ │ to board │ │
│ │          │ │ │          │ │ │          │ │ │          │ │
│ │ 30m      │ │ │ 2h       │ │ │ 3h       │ │ │ 1h       │ │
│ │ Today    │ │ │ Today    │ │ │ Tomorrow │ │ │ Today    │ │
│ │ 🟢 Low   │ │ │ 🟡 Mod   │ │ │ 🟠 High  │ │ │ 🔴 Intns │ │
│ │ ⚠️ High  │ │ │ ⚠️ Med   │ │ │ ⚠️ High  │ │ │ ⚠️ Crit  │ │
│ └──────────┘ │ └──────────┘ │ └──────────┘ │ └──────────┘ │
│              │              │              │              │
│ ┌──────────┐ │ ┌──────────┐ │ ┌──────────┐ │              │
│ │ Review   │ │ │ Update   │ │ │ Client   │ │              │
│ │ notes    │ │ │ docs     │ │ │ meeting  │ │              │
│ └──────────┘ │ └──────────┘ │ └──────────┘ │              │
│              │ ┌──────────┐ │              │              │
│              │ │ Call     │ │              │              │
│              │ │ supplier │ │              │              │
│              │ └──────────┘ │              │              │
└──────────────┴──────────────┴──────────────┴──────────────┘

Grouped by: How much energy/focus the task requires
```

---

## Urgency Mode

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│    Low       │   Medium     │    High      │  Critical    │
│    (3)       │     (4)      │     (2)      │     (2)      │
│ ══════════   │ ══════════   │ ══════════   │ ══════════   │
│              │              │              │              │
│ ┌──────────┐ │ ┌──────────┐ │ ┌──────────┐ │ ┌──────────┐ │
│ │ Review   │ │ │ Update   │ │ │ Reply to │ │ │ Present  │ │
│ │ notes    │ │ │ docs     │ │ │ emails   │ │ │ to board │ │
│ │          │ │ │          │ │ │          │ │ │          │ │
│ │ 1h       │ │ │ 45m      │ │ │ 30m      │ │ │ 1h       │ │
│ │ Next wk  │ │ │ Tomorrow │ │ │ Today    │ │ │ Today    │ │
│ │ 🟢 Low E │ │ │ 🟡 Mod E │ │ │ 🟢 Low E │ │ │ 🔴 Intns │ │
│ │ ⚠️ Low   │ │ │ ⚠️ Med   │ │ │ ⚠️ High  │ │ │ ⚠️ Crit  │ │
│ └──────────┘ │ └──────────┘ │ └──────────┘ │ └──────────┘ │
│              │              │              │              │
│ ┌──────────┐ │ ┌──────────┐ │ ┌──────────┐ │ ┌──────────┐ │
│ │ Design   │ │ │ Write    │ │ │ Client   │ │ │ Submit   │ │
│ │ mockups  │ │ │ report   │ │ │ meeting  │ │ │ proposal │ │
│ └──────────┘ │ └──────────┘ │ └──────────┘ │ └──────────┘ │
│              │ ┌──────────┐ │              │              │
│ ┌──────────┐ │ │ Call     │ │              │              │
│ │ Plan     │ │ │ supplier │ │              │              │
│ │ vacation │ │ └──────────┘ │              │              │
│ └──────────┘ │              │              │              │
└──────────────┴──────────────┴──────────────┴──────────────┘

Grouped by: How time-sensitive/urgent the task is
```

---

## Drag-and-Drop Examples

### Example 1: Energy Mode - Task Gets Easier

**Before:** Task in "High Energy" column
```
┌──────────────┐
│ High Energy  │
├──────────────┤
│ ┌──────────┐ │
│ │ Write    │ │ ← You realize this is easier than thought
│ │ report   │ │
│ │ 🟠 High  │ │
│ │ ⚠️ Med   │ │
│ └──────────┘ │
└──────────────┘
```

**Action:** Drag left to "Moderate" column
```
        ┌─────────────────────────┐
        │                         │
        │    [Dragging...]        │
        │                         │
        └─────────────────────────┘
              ↓
┌──────────────┐
│  Moderate    │
├──────────────┤
│ ┌──────────┐ │
│ │ [Drop    │ │
│ │  here]   │ │
│ └──────────┘ │
└──────────────┘
```

**After:** Energy updated, urgency preserved
```
┌──────────────┐
│  Moderate    │
├──────────────┤
│ ┌──────────┐ │
│ │ Write    │ │ ← Energy changed: High → Moderate
│ │ report   │ │
│ │ 🟡 Mod   │ │ ← Updated!
│ │ ⚠️ Med   │ │ ← Urgency unchanged
│ └──────────┘ │
└──────────────┘
```

---

### Example 2: Urgency Mode - Deadline Moved Up

**Before:** Task in "Medium" urgency column
```
┌──────────────┐
│   Medium     │
├──────────────┤
│ ┌──────────┐ │
│ │ Submit   │ │ ← Deadline suddenly moved up!
│ │ proposal │ │
│ │ 🟠 High E│ │
│ │ ⚠️ Med   │ │
│ └──────────┘ │
└──────────────┘
```

**Action:** Drag right to "Critical" column
```
        ┌─────────────────────────┐
        │                         │
        │    [Dragging...]        │
        │                         │
        └─────────────────────────┘
              ↓
┌──────────────┐
│  Critical    │
├──────────────┤
│ ┌──────────┐ │
│ │ [Drop    │ │
│ │  here]   │ │
│ └──────────┘ │
└──────────────┘
```

**After:** Urgency updated, energy level preserved
```
┌──────────────┐
│  Critical    │
├──────────────┤
│ ┌──────────┐ │
│ │ Submit   │ │ ← Urgency changed: Medium → Critical
│ │ proposal │ │
│ │ 🟠 High E│ │ ← Energy level unchanged
│ │ ⚠️ Crit  │ │ ← Updated!
│ └──────────┘ │
└──────────────┘
```

---

## Task Card Annotations

### All Information Always Visible

```
┌────────────────────────────────────────┐
│  ☐  Complete quarterly report       ✏️🗑️ │
│     Summarize Q4 performance...        │
│                                        │
│  ⏱️ [2h]  📅 [Today 5PM]  🔋 [High]  ⚠️ [Med] │
│    ↑         ↑             ↑          ↑     │
│  Time     Deadline      Energy    Urgency   │
│                         Level               │
└────────────────────────────────────────┘

Legend:
  ⏱️  Duration          - How long it takes
  📅  Deadline          - When it's due
  🔋  Energy Level      - How demanding it is
  ⚠️  Urgency          - How time-sensitive it is
```

---

## Column Color Coding

### Both Modes Use Same Colors

```
Low/Low Energy        #0D4715  🟢  Deep Green
Medium/Moderate       #41644A  🟡  Forest Green
High/High Energy      #E9762B  🟠  Warm Orange
Critical/Very Intense #c5621e  🔴  Darker Orange
```

### Visual Hierarchy
```
  Calm ←──────────────────────────────→ Urgent
  Easy ←──────────────────────────────→ Intense

  🟢 ────────── 🟡 ────────── 🟠 ────────── 🔴
```

---

## Mobile View

### Toggle Buttons (Icon Only)
```
┌─────────────────────────────────────┐
│  [Search...]                        │
│                                     │
│  [All] [Active] [Done] [Overdue]   │
│                                     │
│  [⚡] [🔥]  ← Only icons on mobile  │
│   ↑    ↑                            │
│  Energy Urgency                     │
└─────────────────────────────────────┘
```

### Horizontal Scroll
```
┌─────────────────────────────────────┐
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │
│  │ Low │ │ Med │ │High │ │Crit │ →│
│  │ (2) │ │ (3) │ │ (1) │ │ (2) │   │
│  ├─────┤ ├─────┤ ├─────┤ ├─────┤   │
│  │Card │ │Card │ │Card │ │Card │   │
│  │Card │ │Card │ │     │ │Card │   │
│  └─────┘ └─────┘ └─────┘ └─────┘   │
│  ←──── Swipe to see more ────→      │
└─────────────────────────────────────┘
```

---

## Quick Reference

### When to Use Energy Mode
```
☑️  Planning your day by energy levels
☑️  Scheduling tasks around peak focus times
☑️  Balancing easy and hard tasks
☑️  Avoiding burnout from too many hard tasks
☑️  Identifying when to take breaks
```

### When to Use Urgency Mode
```
☑️  Managing multiple deadlines
☑️  Prioritizing time-sensitive work
☑️  Dealing with urgent requests
☑️  Planning what to do first
☑️  Visualizing time pressure
```

---

## Keyboard Navigation (Future)

```
Proposed Shortcuts:

E          Switch to Energy mode
U          Switch to Urgency mode
Tab        Cycle through columns
Shift+Tab  Cycle backward
←→         Move task between columns
↑↓         Navigate within column
Enter      Edit selected task
Delete     Delete selected task
N          New task
```

---

**Feature**: Group By Mode Toggle  
**Version**: 2.7  
**Status**: ✅ Active
