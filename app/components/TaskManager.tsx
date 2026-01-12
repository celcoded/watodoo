'use client';

import React, { useState, useMemo } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Fab,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Dashboard as DashboardIcon,
  Assignment as TasksIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TaskCard from './TaskCard';
import TaskDialog from './TaskDialog';
import SchedulePanel from './SchedulePanel';
import TaskFilters, { FilterType, GroupByType, DateFilter } from './TaskFilters';
import AnalyticsDashboard from './AnalyticsDashboard';
import NotificationCenter from './NotificationCenter';
import { useTasks } from '../hooks/useTasks';
import { useThemeMode } from '../context/ThemeContext';
import { Task, TiringLevel, Urgency } from '../types/task';
import { isTaskOverdue } from '../utils/taskScheduler';
import { TIRING_LEVELS, URGENCY_LEVELS } from '../constants';

type TabValue = 'tasks' | 'analytics' | 'schedule';

export default function TaskManager() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { mode, toggleTheme } = useThemeMode();
  const { tasks, loading, addTask, updateTask, deleteTask, toggleTaskComplete, reorderTasks } = useTasks();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [groupBy, setGroupBy] = useState<GroupByType>('energy');
  const [dateFilter, setDateFilter] = useState<DateFilter>({ startDate: '', endDate: '' });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabValue>('tasks');
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    let result = tasks;

    switch (filter) {
      case 'active':
        result = result.filter((t) => !t.isCompleted);
        break;
      case 'completed':
        result = result.filter((t) => t.isCompleted);
        break;
      case 'overdue':
        result = result.filter((t) => isTaskOverdue(t));
        break;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description?.toLowerCase().includes(query)
      );
    }

    // Apply date filter
    if (dateFilter.startDate || dateFilter.endDate) {
      result = result.filter((task) => {
        const taskDate = task.deadline || task.createdAt;
        const taskDateTime = new Date(taskDate).getTime();

        if (dateFilter.startDate) {
          const startDate = new Date(dateFilter.startDate);
          startDate.setHours(0, 0, 0, 0);
          if (taskDateTime < startDate.getTime()) return false;
        }

        if (dateFilter.endDate) {
          const endDate = new Date(dateFilter.endDate);
          endDate.setHours(23, 59, 59, 999);
          if (taskDateTime > endDate.getTime()) return false;
        }

        return true;
      });
    }

    return result;
  }, [tasks, filter, searchQuery, dateFilter]);

  const handleSaveTask = (task: Task) => {
    if (editingTask) {
      updateTask(task.id, task);
    } else {
      addTask(task);
    }
    setEditingTask(undefined);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingTask(undefined);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
    }
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setHoveredColumn(null);
  };

  const handleColumnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleColumnDragEnter = (e: React.DragEvent, columnValue: string) => {
    e.preventDefault();
    e.stopPropagation();
    setHoveredColumn(columnValue);
  };

  const handleColumnDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setHoveredColumn(null);
  };

  const handleColumnDrop = (e: React.DragEvent, columnValue: string) => {
    e.preventDefault();
    if (draggedTask) {
      const draggedIndex = tasks.findIndex((t) => t.id === draggedTask.id);
      if (draggedIndex !== -1) {
        const newTasks = [...tasks];
        newTasks.splice(draggedIndex, 1);

        // Find insertion point: end of target column's tasks
        let insertionIndex = newTasks.length;
        const fieldName = groupBy === 'energy' ? 'tiringLevel' : 'urgency';
        const indices = newTasks.reduce<number[]>((acc, t, idx) => {
          if (t[fieldName] === columnValue) acc.push(idx);
          return acc;
        }, []);

        if (indices.length > 0) {
          insertionIndex = indices[indices.length - 1] + 1;
        }

        // Update the appropriate field based on grouping mode
        const updatedDragged = groupBy === 'energy'
          ? { ...draggedTask, tiringLevel: columnValue as TiringLevel }
          : { ...draggedTask, urgency: columnValue as Urgency };

        newTasks.splice(insertionIndex, 0, updatedDragged);
        reorderTasks(newTasks);
      }
    }
    setDraggedTask(null);
    setHoveredColumn(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetTask: Task) => {
    e.preventDefault();
    if (draggedTask && draggedTask.id !== targetTask.id) {
      const draggedIndex = tasks.findIndex((t) => t.id === draggedTask.id);
      if (draggedIndex !== -1) {
        const newTasks = [...tasks];
        newTasks.splice(draggedIndex, 1);

        const newTargetIndex = newTasks.findIndex((t) => t.id === targetTask.id);
        
        // Update the dragged task to match target's grouping field
        const updatedDragged = groupBy === 'energy'
          ? { ...draggedTask, tiringLevel: targetTask.tiringLevel }
          : { ...draggedTask, urgency: targetTask.urgency };

        if (newTargetIndex !== -1) {
          newTasks.splice(newTargetIndex, 0, updatedDragged);
        } else {
          newTasks.push(updatedDragged);
        }

        reorderTasks(newTasks);
      }
    }
    setDraggedTask(null);
  };

  const handleTouchDrop = (droppedId: string, type: 'column' | 'task') => {
    const mockEvent = { preventDefault: () => {}, stopPropagation: () => {}, dataTransfer: { dropEffect: 'move' } } as unknown as React.DragEvent;
    
    if (type === 'column') {
      handleColumnDrop(mockEvent, droppedId);
    } else {
      const targetTask = tasks.find(t => t.id === droppedId);
      if (targetTask) {
        handleDrop(mockEvent, targetTask);
      }
    }
  };

  const menuItems = [
    { text: 'Tasks', icon: <TasksIcon />, value: 'tasks' as TabValue },
    { text: 'Analytics', icon: <DashboardIcon />, value: 'analytics' as TabValue },
    { text: 'Schedule', icon: <ScheduleIcon />, value: 'schedule' as TabValue },
  ];

  // Get the appropriate column configuration based on groupBy mode
  const columns = groupBy === 'energy' ? TIRING_LEVELS : URGENCY_LEVELS;
  const fieldName = groupBy === 'energy' ? 'tiringLevel' : 'urgency';

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          background: theme.palette.mode === 'dark' 
            ? '#2D3E32'
            : '#2d6738',
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 700,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
            }}
          >
            🤔 Watodoo
          </Typography>
          
          <NotificationCenter tasks={tasks} />
          
          <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 1 }}>
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>

        {/* Desktop Tabs */}
        {!isMobile && (
          <Tabs
            value={currentTab}
            onChange={(_, newValue) => setCurrentTab(newValue)}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{ 
              px: 3,
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-selected': {
                  color: 'white',
                },
              },
            }}
          >
            {menuItems.map((item) => (
              <Tab key={item.value} label={item.text} value={item.value} icon={item.icon} iconPosition="start" />
            ))}
          </Tabs>
        )}
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {menuItems.map((item) => (
              <ListItem
                component="button"
                key={item.value}
                selected={currentTab === item.value}
                onClick={() => {
                  setCurrentTab(item.value);
                  setDrawerOpen(false);
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  textAlign: 'left',
                  border: 'none',
                  backgroundColor: currentTab === item.value ? 'action.selected' : 'transparent',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 4 }, flexGrow: 1 }}>
        {currentTab === 'tasks' && (
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            <Grid item xs={12}>
              <Paper sx={{ p: { xs: 2, sm: 3 } }}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: 'space-between', 
                  alignItems: { xs: 'stretch', sm: 'center' },
                  gap: 2,
                  mb: 3,
                }}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>Your Tasks</Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setDialogOpen(true)}
                    fullWidth={isMobile}
                    sx={{
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #6B9677 0%, #C9965F 100%)'
                        : 'linear-gradient(135deg, #41644A 0%, #D97028 100%)',
                      '&:hover': {
                        background: theme.palette.mode === 'dark'
                          ? 'linear-gradient(135deg, #4F7359 0%, #B07D4A 100%)'
                          : 'linear-gradient(135deg, #2d4633 0%, #B85920 100%)',
                      },
                    }}
                  >
                    Add Task
                  </Button>
                </Box>

                <TaskFilters
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  filter={filter}
                  onFilterChange={setFilter}
                  groupBy={groupBy}
                  onGroupByChange={setGroupBy}
                  dateFilter={dateFilter}
                  onDateFilterChange={setDateFilter}
                />

                {filteredTasks.length === 0 ? (
                  <Box
                    sx={{
                      textAlign: 'center',
                      py: 8,
                      color: 'text.secondary',
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      No tasks found
                    </Typography>
                    <Typography variant="body2">
                      {tasks.length === 0
                        ? 'Start by adding your first task!'
                        : 'Try adjusting your filters or search query'}
                    </Typography>
                  </Box>
                ) : (
                  // Kanban board columns grouped by selected mode (energy or urgency)
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 2, 
                    alignItems: 'stretch', 
                    overflowX: 'auto',
                    pb: 1,
                  }}>
                    {columns.map((column) => {
                      const tasksForColumn = filteredTasks.filter(
                        (t) => t[fieldName] === column.value
                      );
                      return (
                        <Box
                          key={column.value}
                          data-column-id={column.value}
                          onDragOver={handleColumnDragOver}
                          onDragEnter={(e) => handleColumnDragEnter(e, column.value)}
                          onDragLeave={handleColumnDragLeave}
                          onDrop={(e) => handleColumnDrop(e, column.value)}
                          sx={{
                            flex: '1 1 0',
                            minWidth: { xs: 280, sm: 300 },
                            bgcolor: hoveredColumn === column.value 
                              ? 'action.selected' 
                              : theme.palette.mode === 'dark' 
                                ? 'rgba(107, 150, 119, 0.08)'
                                : 'rgba(245, 240, 232, 0.6)',
                            border: '2px solid',
                            borderColor: hoveredColumn === column.value ? 'primary.main' : 'divider',
                            borderRadius: 2,
                            p: 2,
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between', 
                            mb: 2,
                            pb: 1,
                            borderBottom: '2px solid',
                            borderColor: column.color,
                          }}>
                            <Typography 
                              variant="subtitle1" 
                              sx={{ 
                                fontWeight: 700,
                                color: column.color,
                              }}
                            >
                              {column.label}
                            </Typography>
                            <Box
                              sx={{
                                bgcolor: column.color,
                                color: 'white',
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 1,
                                fontSize: '0.875rem',
                                fontWeight: 600,
                              }}
                            >
                              {tasksForColumn.length}
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {tasksForColumn.map((task) => (
                              <TaskCard
                                key={task.id}
                                task={task}
                                onToggleComplete={toggleTaskComplete}
                                onEdit={handleEditTask}
                                onDelete={deleteTask}
                                draggable={true}
                                onDragStart={handleDragStart}
                                onDragEnd={handleDragEnd}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                onTouchDrop={handleTouchDrop}
                              />
                            ))}
                            {tasksForColumn.length === 0 && (
                              <Box
                                sx={{
                                  textAlign: 'center',
                                  py: 4,
                                  color: 'text.secondary',
                                  fontSize: '0.875rem',
                                }}
                              >
                                No tasks in this category
                              </Box>
                            )}
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        )}

        {currentTab === 'analytics' && (
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            <Grid item xs={12}>
              <AnalyticsDashboard tasks={tasks} />
            </Grid>
          </Grid>
        )}

        {currentTab === 'schedule' && (
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            <Grid item xs={12}>
              <SchedulePanel tasks={tasks} />
            </Grid>
          </Grid>
        )}
      </Container>

      {/* Floating Action Button for mobile */}
      {isMobile && currentTab === 'tasks' && (
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #6B9677 0%, #C9965F 100%)'
              : 'linear-gradient(135deg, #41644A 0%, #D97028 100%)',
            '&:hover': {
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #4F7359 0%, #B07D4A 100%)'
                : 'linear-gradient(135deg, #2d4633 0%, #B85920 100%)',
            },
          }}
          onClick={() => setDialogOpen(true)}
        >
          <AddIcon />
        </Fab>
      )}

      {/* Task Dialog */}
      <TaskDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveTask}
        editTask={editingTask}
      />
    </Box>
    </LocalizationProvider>
  );
}
