'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Checkbox,
  IconButton,
  Box,
  Chip,
  Tooltip,
  useTheme,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  AccessTime as TimeIcon,
  Schedule as ScheduleIcon,
  TrendingUp as OngoingIcon,
  PlayArrow as StartIcon,
} from '@mui/icons-material';
import { Task } from '../types/task';
import { formatDuration, isTaskOverdue } from '../utils/taskScheduler';
import { format } from 'date-fns';
import { tiringLevelColors } from '../theme/colors';
import { URGENCY_LEVELS } from '../constants';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  showSuggestedTime?: boolean;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent, task: Task) => void;
  onDragEnd?: () => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent, task: Task) => void;
  onTouchDrop?: (id: string, type: 'column' | 'task') => void;
}

export default function TaskCard({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  showSuggestedTime,
  draggable = false,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onTouchDrop,
}: TaskCardProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isOverdue = isTaskOverdue(task);
  const tiringColor = isDarkMode 
    ? tiringLevelColors.dark[task.tiringLevel]
    : tiringLevelColors.light[task.tiringLevel];

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!draggable || task.isCompleted) return;
    onDragStart?.(e as unknown as React.DragEvent, task);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!draggable || task.isCompleted) return;
    
    // Temporarily hide the element to find what's underneath
    const card = e.currentTarget as HTMLElement;
    const originalDisplay = card.style.display;
    card.style.display = 'none';

    const touch = e.changedTouches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    
    // Restore display
    card.style.display = originalDisplay;

    if (!target) return;

    const columnEl = target.closest('[data-column-id]');
    const taskEl = target.closest('[data-task-id]');
    
    if (taskEl) {
      const id = taskEl.getAttribute('data-task-id');
      if (id && id !== task.id) {
        onTouchDrop?.(id, 'task');
      }
    } else if (columnEl) {
      const id = columnEl.getAttribute('data-column-id');
      if (id) {
        onTouchDrop?.(id, 'column');
      }
    }
    
    onDragEnd?.();
  };

  return (
    <Card
      data-task-id={task.id}
      draggable={draggable && !task.isCompleted}
      onDragStart={(e) => onDragStart?.(e as React.DragEvent, task)}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop?.(e as React.DragEvent, task)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      sx={{
        mb: 2,
        opacity: task.isCompleted ? 0.6 : 1,
        borderLeft: `4px solid ${tiringColor}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: draggable && !task.isCompleted ? 'grab' : 'default',
        '&:hover': {
          boxShadow: task.isCompleted ? 0 : 6,
          transform: task.isCompleted ? 'none' : 'translateY(-2px)',
        },
        '&:active': {
          cursor: draggable && !task.isCompleted ? 'grabbing' : 'default',
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 1, sm: 2 } }}>
          {/* drag handle removed visually; card remains draggable via props */}
          
          <Checkbox
            checked={task.isCompleted}
            onChange={() => onToggleComplete(task.id)}
            sx={{ 
              mt: -1,
              '& .MuiSvgIcon-root': { fontSize: { xs: 20, sm: 24 } },
            }}
          />

          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={{
                textDecoration: task.isCompleted ? 'line-through' : 'none',
                mb: 1,
                color: theme.palette.mode === 'dark' ? '#E8DFD0' : '#1a3321',
                fontSize: { xs: '1rem', sm: '1.25rem' },
                wordBreak: 'break-word',
              }}
            >
              {task.title}
            </Typography>

            {task.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ 
                  mb: 2,
                  fontSize: { xs: '0.875rem', sm: '0.875rem' },
                  wordBreak: 'break-word',
                }}
              >
                {task.description}
              </Typography>
            )}

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
              {task.isOngoing && (
                <Chip
                  icon={<OngoingIcon />}
                  label="Ongoing"
                  size="small"
                  sx={{
                    bgcolor: theme.palette.mode === 'dark' ? '#C9965F' : '#D97028',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                  }}
                />
              )}
              
              <Chip
                icon={<TimeIcon />}
                label={formatDuration(task.estimatedDuration)}
                size="small"
                variant="outlined"
                sx={{ fontSize: { xs: '0.75rem', sm: '0.8125rem' } }}
              />

              {task.startTime && (
                <Chip
                  icon={<StartIcon />}
                  label={format(task.startTime, 'MMM dd, h:mm a')}
                  size="small"
                  variant="outlined"
                  color="primary"
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.8125rem' } }}
                />
              )}

              <Chip
                label={format(task.deadline, 'MMM dd, yyyy h:mm a')}
                size="small"
                color={isOverdue ? 'error' : 'default'}
                variant="outlined"
                sx={{ fontSize: { xs: '0.75rem', sm: '0.8125rem' } }}
              />

              <Chip
                label={task.tiringLevel.replace('-', ' ')}
                size="small"
                sx={{
                  bgcolor: tiringColor,
                  color: 'white',
                  fontWeight: 600,
                  fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                }}
              />

              <Chip
                label={`${task.urgency.charAt(0).toUpperCase() + task.urgency.slice(1)}`}
                size="small"
                sx={{
                  bgcolor: URGENCY_LEVELS.find(u => u.value === task.urgency)?.color || '#ccc',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                }}
              />
            </Box>

            {showSuggestedTime && task.suggestedStartTime && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mt: 2,
                  p: 1.5,
                  bgcolor: 'primary.main',
                  borderRadius: 2,
                  color: 'primary.contrastText',
                }}
              >
                <ScheduleIcon />
                <Typography variant="body2" sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' } }}>
                  <strong>Suggested Start:</strong>{' '}
                  {format(task.suggestedStartTime, 'h:mm a')}
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 0.5 }}>
            <Tooltip title="Edit">
              <span>
                <IconButton
                  size="small"
                  onClick={() => onEdit(task)}
                  disabled={task.isCompleted}
                  sx={{ p: { xs: 0.5, sm: 1 } }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton 
                size="small" 
                onClick={() => onDelete(task.id)} 
                color="error"
                sx={{ p: { xs: 0.5, sm: 1 } }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
