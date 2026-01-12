# Watodoo

A smart task management system built with Next.js 14+ and Material UI that helps you optimize your schedule, maximize productivity, and enjoy more free time.

## 🚀 Features

- **Smart Scheduling Algorithm**: Automatically suggests optimal time slots for your tasks based on:
  - Task deadlines
  - Estimated duration
  - Energy level requirements
  - Available time slots

- **Task Management**:
  - Add, edit, and delete tasks
  - Mark tasks as complete
  - Track task details (title, description, duration, deadline, energy level)
  - Visual indicators for task priority and status

- **Intelligent Features**:
  - Automatic schedule optimization
  - Energy-based task ordering (harder tasks when you're fresh)
  - Recovery time calculation between tasks
  - Free time calculation
  - Overdue task detection

- **User Experience**:
  - Clean, modern Material UI interface
  - Responsive design (mobile, tablet, desktop)
  - Search and filter functionality
  - Multiple view modes (list/grid)
  - Local storage persistence
  - Real-time schedule updates

## 📁 Project Structure

```
frontend/
├── app/
│   ├── components/          # React components
│   │   ├── TaskManager.tsx  # Main task management component
│   │   ├── TaskCard.tsx     # Individual task display
│   │   ├── TaskDialog.tsx   # Task creation/editing modal
│   │   ├── SchedulePanel.tsx # Smart schedule display
│   │   └── TaskFilters.tsx  # Search and filter controls
│   ├── hooks/              # Custom React hooks
│   │   └── useTasks.ts     # Task management hook with localStorage
│   ├── types/              # TypeScript type definitions
│   │   └── task.ts         # Task-related types
│   ├── utils/              # Utility functions
│   │   └── taskScheduler.ts # Scheduling algorithm
│   ├── constants/          # App constants
│   │   └── index.ts        # Energy levels, work hours, etc.
│   ├── layout.tsx          # Root layout with MUI theme
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── public/                 # Static assets
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── next.config.ts         # Next.js config
└── README.md             # This file
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **UI Library**: Material UI (MUI) v5
- **Date Handling**: date-fns
- **State Management**: React Hooks + localStorage
- **Styling**: MUI's emotion + Tailwind CSS

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Usage

### Adding a Task

1. Click the "Add Task" button
2. Fill in task details:
   - **Title**: What needs to be done
   - **Description**: Optional details
   - **Estimated Duration**: How long it will take (5-480 minutes)
   - **Deadline**: When it needs to be completed
   - **Energy Level**: How tiring the task is (Low, Moderate, High, Very Intense)
3. Click "Add Task" to save

### Viewing Your Schedule

The right panel shows your optimized schedule with:
- Suggested start times for each task
- Task ordering based on priority and energy
- Free time calculation
- Completion progress

### Managing Tasks

- **Complete**: Click the checkbox on any task
- **Edit**: Click the edit icon
- **Delete**: Click the delete icon
- **Filter**: Use the filter buttons (All, Active, Completed, Overdue)
- **Search**: Type in the search box to find specific tasks

## 🧠 Scheduling Algorithm

The system uses an intelligent algorithm that:

1. **Prioritizes by deadline**: Urgent tasks are scheduled first
2. **Considers energy levels**: High-energy tasks are placed early in the day
3. **Includes recovery time**: Adds breaks between tasks based on their intensity
4. **Respects work hours**: Schedules within 9 AM - 6 PM by default
5. **Optimizes flow**: Arranges tasks for maximum productivity

### Energy Levels

- **Low Energy**: 10 minutes recovery time
- **Moderate**: 20 minutes recovery time
- **High Energy**: 30 minutes recovery time
- **Very Intense**: 45 minutes recovery time

## 🎨 Design Principles

1. **Clean and Modern**: Minimalist interface with focus on usability
2. **Responsive**: Works seamlessly on all device sizes
3. **Accessible**: Proper color contrast and semantic HTML
4. **Consistent**: Following Material Design guidelines
5. **Performance**: Optimized rendering and efficient state management

## 🔧 Configuration

### Work Hours

Edit `app/constants/index.ts` to change default work hours:

```typescript
export const DEFAULT_WORK_HOURS = {
  start: 9,  // 9 AM
  end: 18,   // 6 PM
};
```

### Theme

Customize the theme in `app/layout.tsx`:

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    // ... customize colors
  },
});
```

## 📱 Component API

### TaskCard

```typescript
<TaskCard
  task={task}
  onToggleComplete={(id) => {}}
  onEdit={(task) => {}}
  onDelete={(id) => {}}
  showSuggestedTime={true}
/>
```

### TaskDialog

```typescript
<TaskDialog
  open={true}
  onClose={() => {}}
  onSave={(task) => {}}
  editTask={existingTask} // optional
/>
```

### SchedulePanel

```typescript
<SchedulePanel tasks={tasks} />
```

## 🚀 Deployment

### Build for production:

```bash
npm run build
npm start
```

### Deploy to Vercel:

```bash
vercel deploy
```

## 🤝 Best Practices Implemented

1. **Type Safety**: Full TypeScript implementation
2. **Component Composition**: Reusable, single-responsibility components
3. **Custom Hooks**: Separation of concerns with `useTasks` hook
4. **Immutable State**: Proper state management with React hooks
5. **Error Handling**: Validation and error states
6. **Performance**: useMemo for filtered lists, efficient re-renders
7. **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
8. **Code Organization**: Clear folder structure, separated concerns
9. **Documentation**: Comprehensive comments and README

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🙏 Acknowledgments

- Material UI for the excellent component library
- Next.js team for the amazing framework
- date-fns for reliable date handling

---

Built with ❤️ for better productivity and less procrastination!
