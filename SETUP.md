# Setup Guide for Watodoo

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## Step-by-Step Setup

### 1. Install Dependencies

Since we've already updated package.json with Material UI dependencies, run:

```bash
npm install
```

This will install:
- Material UI core (`@mui/material`)
- Material UI icons (`@mui/icons-material`)
- Emotion (styling engine)
- date-fns (date utilities)
- All existing Next.js dependencies

### 2. Install Material UI Date Pickers (Required)

The TaskDialog component uses date pickers, so install:

```bash
npm install @mui/x-date-pickers
```

### 3. Verify Installation

Check that all dependencies are installed:

```bash
npm list @mui/material @mui/icons-material @mui/x-date-pickers
```

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
npm start
```

## Troubleshooting

### Issue: Material UI Styles Not Applying

**Solution**: Ensure you're using the client-side components with `'use client'` directive at the top of component files.

### Issue: Date Picker Not Working

**Solution**: Make sure `@mui/x-date-pickers` is installed and LocalizationProvider is wrapping your app (already done in layout.tsx).

### Issue: localStorage Not Working

**Solution**: localStorage only works in the browser. Make sure components using it have `'use client'` directive.

### Issue: TypeScript Errors

**Solution**: Run `npm install` to ensure all types are installed correctly.

## Project Structure Explained

```
app/
├── components/         # UI Components
│   ├── TaskManager.tsx    # Main container, orchestrates all features
│   ├── TaskCard.tsx       # Displays individual task with actions
│   ├── TaskDialog.tsx     # Modal for creating/editing tasks
│   ├── SchedulePanel.tsx  # Shows optimized schedule
│   └── TaskFilters.tsx    # Search and filter controls
│
├── hooks/             # Custom React Hooks
│   └── useTasks.ts       # Manages task state and localStorage
│
├── types/             # TypeScript Definitions
│   └── task.ts           # All type definitions for tasks
│
├── utils/             # Business Logic
│   └── taskScheduler.ts  # Scheduling algorithm and helpers
│
├── constants/         # Configuration
│   └── index.ts          # App constants (work hours, energy levels)
│
├── layout.tsx         # Root layout with MUI theme provider
└── page.tsx          # Home page (entry point)
```

## Key Features Implementation

### 1. Smart Scheduling Algorithm
Located in `utils/taskScheduler.ts`:
- Sorts tasks by priority (deadline + energy level)
- Assigns optimal time slots
- Calculates recovery periods
- Generates human-readable reasoning

### 2. Task Management
Implemented in `hooks/useTasks.ts`:
- CRUD operations
- localStorage persistence
- Automatic date serialization/deserialization

### 3. Material UI Integration
- Custom theme in `layout.tsx`
- Responsive components
- Consistent design system

## Development Tips

### Adding New Features

1. **New Task Property**: 
   - Update `types/task.ts`
   - Modify `TaskDialog.tsx` form
   - Update scheduling logic if needed

2. **New Component**:
   - Create in `components/`
   - Use TypeScript
   - Add `'use client'` if using hooks/browser APIs
   - Export and import in parent component

3. **New Utility Function**:
   - Add to `utils/`
   - Write unit tests
   - Document with JSDoc comments

### Code Quality

- Run linter: `npm run lint`
- Type check: `npx tsc --noEmit`
- Format code consistently
- Follow existing patterns

## Performance Optimization

1. **useMemo**: Already implemented for filtered tasks
2. **Lazy Loading**: Add dynamic imports for heavy components
3. **Code Splitting**: Next.js handles this automatically
4. **Image Optimization**: Use Next.js Image component

## Security Notes

- Data stored locally (localStorage) - not sensitive data appropriate
- No authentication implemented - add if needed for production
- Input validation in place for task creation
- XSS protection via React's default escaping

## Next Steps

Consider adding:
- [ ] Backend API for multi-device sync
- [ ] User authentication
- [ ] Task categories/tags
- [ ] Recurring tasks
- [ ] Calendar integration
- [ ] Export/import functionality
- [ ] Dark mode toggle
- [ ] Notifications/reminders
- [ ] Analytics dashboard
- [ ] Drag-and-drop task reordering

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Material UI Documentation](https://mui.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Hooks Guide](https://react.dev/reference/react)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review component documentation in code comments
3. Refer to official documentation for libraries used
4. Check browser console for error messages

---

Happy coding! 🚀
