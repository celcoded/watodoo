'use client';

import React, { useEffect, useState, useRef } from 'react';
import {
  Snackbar,
  Alert,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Button,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Close as CloseIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { Task } from '../types/task';
import { isTaskOverdue } from '../utils/taskScheduler';
import { format, isToday, isTomorrow } from 'date-fns';

interface Notification {
  id: string;
  type: 'overdue' | 'due-soon' | 'completed';
  message: string;
  task: Task;
  timestamp: Date;
  dateKey: string; // YYYY-MM-DD format for checking duplicates
  read: boolean;
}

interface NotificationCenterProps {
  tasks: Task[];
}

export default function NotificationCenter({ tasks }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const sentNotifications = useRef<Set<string>>(new Set());

  useEffect(() => {
    const checkNotifications = () => {
      const newNotifications: Notification[] = [];
      const today = new Date().toISOString().split('T')[0];

      tasks.forEach((task) => {
        if (!task.isCompleted) {
          // Check for overdue tasks
          if (isTaskOverdue(task)) {
            const notifKey = `overdue-${task.id}-${today}`;
            if (!sentNotifications.current.has(notifKey)) {
              newNotifications.push({
                id: `overdue-${task.id}-${Date.now()}-${Math.random()}`,
                type: 'overdue',
                message: `Task "${task.title}" is overdue!`,
                task,
                timestamp: new Date(),
                dateKey: today,
                read: false,
              });
              sentNotifications.current.add(notifKey);
            }
          }
          // Check for tasks due today or tomorrow
          else if (isToday(task.deadline)) {
            const notifKey = `due-today-${task.id}-${today}`;
            if (!sentNotifications.current.has(notifKey)) {
              newNotifications.push({
                id: `due-today-${task.id}-${Date.now()}-${Math.random()}`,
                type: 'due-soon',
                message: `Task "${task.title}" is due today at ${format(task.deadline, 'h:mm a')}`,
                task,
                timestamp: new Date(),
                dateKey: today,
                read: false,
              });
              sentNotifications.current.add(notifKey);
            }
          } else if (isTomorrow(task.deadline)) {
            const notifKey = `due-tomorrow-${task.id}-${today}`;
            if (!sentNotifications.current.has(notifKey)) {
              newNotifications.push({
                id: `due-tomorrow-${task.id}-${Date.now()}-${Math.random()}`,
                type: 'due-soon',
                message: `Task "${task.title}" is due tomorrow`,
                task,
                timestamp: new Date(),
                dateKey: today,
                read: false,
              });
              sentNotifications.current.add(notifKey);
            }
          }
        }
      });

      if (newNotifications.length > 0) {
        setNotifications((prev) => [...newNotifications, ...prev].slice(0, 20));
        setCurrentNotification(newNotifications[0]);
        setSnackbarOpen(true);
      }
    };

    checkNotifications();
    const interval = setInterval(checkNotifications, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [tasks]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleDismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'overdue':
        return <WarningIcon color="error" />;
      case 'due-soon':
        return <ScheduleIcon color="warning" />;
      case 'completed':
        return <CheckIcon color="success" />;
      default:
        return <NotificationsIcon />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleClick}
        sx={{
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <Badge badgeContent={unreadCount} color="error" max={9}>
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 360,
            maxWidth: '90vw',
            maxHeight: 480,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Notifications
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {unreadCount > 0 ? `${unreadCount} unread` : notifications.length > 0 ? `${notifications.length} total` : ''}
            </Typography>
          </Box>
          {notifications.length > 0 && (
            <Button size="small" onClick={handleClearAll}>
              Clear All
            </Button>
          )}
        </Box>
        <Divider />

        {notifications.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No notifications
            </Typography>
          </Box>
        ) : (
          notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              sx={{
                flexDirection: 'column',
                alignItems: 'stretch',
                py: 1.5,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <Box sx={{ display: 'flex', gap: 1.5, width: '100%' }}>
                <ListItemIcon sx={{ minWidth: 'auto' }}>
                  {getNotificationIcon(notification.type)}
                </ListItemIcon>
                <ListItemText
                  primary={notification.message}
                  secondary={format(notification.timestamp, 'h:mm a')}
                  primaryTypographyProps={{
                    variant: 'body2',
                    sx: { fontWeight: 500 },
                  }}
                  secondaryTypographyProps={{
                    variant: 'caption',
                  }}
                />
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDismissNotification(notification.id);
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </MenuItem>
          ))
        )}
      </Menu>

      {currentNotification && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={
              currentNotification.type === 'overdue'
                ? 'error'
                : currentNotification.type === 'due-soon'
                ? 'warning'
                : 'success'
            }
            sx={{ width: '100%' }}
          >
            {currentNotification.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
