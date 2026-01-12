# 🚀 Quick Start Guide - Enhanced Features

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation & Running

```bash
# Navigate to frontend directory
cd Next-AI/frontend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:3000
```

## 🎯 Feature Quick Tour

### 1. Dark Mode (5 seconds)
1. Look at top-right corner
2. Click the sun ☀️ or moon 🌙 icon
3. Watch the theme switch instantly!

### 2. Mobile View (10 seconds)
1. Resize browser window to mobile size (< 600px)
2. Notice hamburger menu (☰) appears
3. Click to open navigation drawer
4. See floating action button (+) at bottom-right

### 3. Notifications (30 seconds)
1. Add a task with deadline in the next few hours
2. Wait or refresh page
3. Click bell icon 🔔 in top bar
4. See notification about upcoming task

### 4. Analytics Dashboard (15 seconds)
1. Click "Analytics" tab (or menu item on mobile)
2. View completion rate, time stats, productivity trend
3. See task distribution by energy level
4. Watch progress bars animate

### 5. Drag-and-Drop (20 seconds)
1. Go to "Tasks" tab
2. Ensure "All" filter is selected
3. Hover over a task - see drag handle (☰)
4. Click and drag task up or down
5. Release to reorder

## 🎨 Customizing Colors

### Quick Color Change

Edit `app/theme/colors.ts`:

```typescript
export const lightPalette = {
  primary: {
    main: '#YOUR_HEX_COLOR', // Change this!
    light: '#LIGHTER_SHADE',
    dark: '#DARKER_SHADE',
  },
  // ... rest of palette
};
```

### Popular Color Schemes

**Purple & Teal**
```typescript
primary: { main: '#8b5cf6' }    // Purple
secondary: { main: '#14b8a6' }  // Teal
```

**Orange & Blue**
```typescript
primary: { main: '#f97316' }    // Orange
secondary: { main: '#0ea5e9' }  // Sky Blue
```

**Green & Yellow**
```typescript
primary: { main: '#22c55e' }    // Green
secondary: { main: '#eab308' }  // Yellow
```

## 📱 Responsive Breakpoints

```typescript
xs: 0-600px      // Mobile phones
sm: 600-960px    // Tablets
md: 960-1280px   // Small laptops
lg: 1280-1920px  // Desktops
xl: 1920px+      // Large screens
```

### Testing Responsive Design

**Chrome DevTools:**
1. Press F12
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select device or enter custom dimensions
4. Test interactions

**Common Test Sizes:**
- iPhone SE: 375 x 667
- iPhone 14: 390 x 844
- iPad: 768 x 1024
- Desktop: 1920 x 1080

## 🔧 Common Customizations

### Change App Title
Edit `app/layout.tsx`:
```typescript
<title>Your App Name - Smart Task Management</title>
```

### Modify Notification Check Frequency
Edit `app/components/NotificationCenter.tsx`:
```typescript
// Line ~75 - Change from 60000 (1 min) to your preference
const interval = setInterval(checkNotifications, 300000); // 5 minutes
```

### Adjust Task Duration Slider
Edit `app/components/TaskDialog.tsx`:
```typescript
<Slider
  min={5}      // Minimum minutes
  max={480}    // Maximum minutes (8 hours)
  step={5}     // Step increment
/>
```

### Change Number of Notifications Displayed
Edit `app/components/NotificationCenter.tsx`:
```typescript
// Line ~70 - Change from 20 to your preference
setNotifications((prev) => [...newNotifications, ...prev].slice(0, 50));
```

## 🐛 Troubleshooting

### Dark Mode Not Persisting
**Solution:** Clear browser localStorage and refresh
```javascript
// In browser console:
localStorage.clear();
location.reload();
```

### Drag-and-Drop Not Working
**Check:**
1. Are you on "All" filter? (Required)
2. Is JavaScript enabled?
3. Try refreshing the page

### Notifications Not Appearing
**Check:**
1. Do you have tasks with deadlines in the next 24 hours?
2. Wait ~1 minute for check interval
3. Check browser console for errors

### Mobile Layout Issues
**Check:**
1. Browser zoom is at 100%
2. Viewport meta tag is present
3. Try hard refresh (Ctrl+Shift+R)

## 💡 Pro Tips

### Keyboard Shortcuts (Browser)
- `F11` - Full screen mode
- `Ctrl + Shift + M` - Device toolbar (Chrome)
- `Ctrl + +/-` - Zoom in/out

### Best Practices
1. **Add Deadlines**: Set realistic deadlines for better scheduling
2. **Use Energy Levels**: Accurately rate task difficulty
3. **Check Analytics**: Review weekly to improve productivity
4. **Reorder Tasks**: Prioritize by dragging important tasks to top
5. **Enable Notifications**: Don't miss important deadlines

### Performance Tips
1. Limit to 100-200 active tasks for best performance
2. Archive or delete completed tasks regularly
3. Use specific search queries instead of scrolling

## 📚 Next Steps

### Learn More
- Read `ENHANCED_FEATURES.md` for detailed feature documentation
- Check `COLOR_PALETTE.md` for color customization guide
- Review `IMPLEMENTATION_CHECKLIST.md` for technical details

### Extend Features
- Add new task categories
- Implement recurring tasks
- Add team collaboration
- Integrate with calendar APIs
- Add data export/import

## 🤝 Contributing

Found a bug or want to add a feature?
1. Document the issue/feature
2. Test your changes
3. Update relevant documentation
4. Submit for review

## 📞 Support

Need help?
- Check the documentation files
- Review browser console for errors
- Test in different browsers
- Check localStorage data

## 🎉 Have Fun!

The app is designed to make task management enjoyable and productive. Experiment with different workflows, customize the colors to your liking, and make it your own!

---

**Made with ❤️ for productivity enthusiasts**
