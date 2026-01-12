'use client';

import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  Divider,
  Chip,
  List,
  ListItem,
  useTheme,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  FreeBreakfast as BreakIcon,
  CheckCircle as CheckIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { Task, SchedulePreferences, RestingPeriod } from '../types/task';
import { TaskScheduler, formatDuration } from '../utils/taskScheduler';
import ScheduleSettings from './ScheduleSettings';
import { format, isValid } from 'date-fns';

interface SchedulePanelProps {
  tasks: Task[];
}

const DEFAULT_PREFERENCES: SchedulePreferences = {
  workStartHour: 9,
  workEndHour: 18,
  workDays: [1, 2, 3, 4, 5], // Monday to Friday
  specialDays: [],
  restingPeriods: [
    {
      id: '1',
      startTime: 12,
      endTime: 13,
      label: 'Lunch',
      isActive: true,
    },
    {
      id: '2',
      startTime: 15,
      endTime: 16,
      label: 'Coffee Break',
      isActive: true,
    },
  ],
};

export default function SchedulePanel({ tasks }: SchedulePanelProps) {
  const theme = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [preferences, setPreferences] = useState<SchedulePreferences>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('schedulePreferences');
      return saved ? JSON.parse(saved) : DEFAULT_PREFERENCES;
    }
    return DEFAULT_PREFERENCES;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('schedulePreferences', JSON.stringify(preferences));
    }
  }, [preferences]);

  const hourToTime = (hour: number): string => {
    const h = Math.floor(hour);
    const m = Math.round((hour - h) * 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  const hourToAmPm = (hour: number): string => {
    const h = Math.floor(hour);
    const m = Math.round((hour - h) * 60);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${displayHour}:${m.toString().padStart(2, '0')} ${period}`;
  };

  const incompleteTasks = tasks.filter((t) => !t.isCompleted);
  const scheduler = new TaskScheduler(incompleteTasks, preferences);
  const suggestions = scheduler.generateSchedule();
  
  // Calculate free time for today within work hours
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const workStartHour = preferences.workStartHour;
  const workEndHour = preferences.workEndHour;
  
  let timeLeftToday = 0;
  if (currentHour < workEndHour) {
    const minutesUntilEnd = (workEndHour - currentHour) * 60 - currentMinute;
    
    // Calculate scheduled time for today
    const tasksForToday = suggestions.filter(s => {
      const taskDate = new Date(s.suggestedStartTime);
      const todayDate = new Date(now);
      return taskDate.toDateString() === todayDate.toDateString();
    });
    
    const scheduledMinutes = tasksForToday.reduce((total, s) => {
      return total + (s.suggestedEndTime.getTime() - s.suggestedStartTime.getTime()) / 60000;
    }, 0);
    
    // Account for resting periods
    const activeRestingPeriods = preferences.restingPeriods.filter(p => p.isActive);
    let restingMinutes = 0;
    for (const period of activeRestingPeriods) {
      const periodStart = period.startTime * 60;
      const periodEnd = period.endTime * 60;
      const currentMinutes = currentHour * 60 + currentMinute;
      
      if (periodStart >= currentMinutes && periodStart < workEndHour * 60) {
        restingMinutes += Math.min(periodEnd, workEndHour * 60) - periodStart;
      }
    }
    
    timeLeftToday = Math.max(0, minutesUntilEnd - scheduledMinutes - restingMinutes);
  }
  
  const freeTime = timeLeftToday;

  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const totalCount = tasks.length;

  const activeRestingPeriods = preferences.restingPeriods.filter(p => p.isActive);

  return (
    <Paper sx={{ p: { xs: 2, sm: 3 }, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            fontWeight: 700,
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
          }}
        >
          <TrendingUpIcon color="primary" />
          Smart Schedule
        </Typography>
        <Tooltip title="Schedule Settings">
          <IconButton size="small" onClick={() => setSettingsOpen(true)}>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2, 
          mb: 2,
        }}>
          <Chip
            icon={<BreakIcon />}
            label={`${formatDuration(freeTime)} free time`}
            color="success"
            variant="outlined"
            sx={{ 
              flex: { xs: 1, sm: 'auto' },
              justifyContent: 'flex-start',
            }}
          />
          <Chip
            icon={<CheckIcon />}
            label={`${completedCount}/${totalCount} completed`}
            color="info"
            variant="outlined"
            sx={{ 
              flex: { xs: 1, sm: 'auto' },
              justifyContent: 'flex-start',
            }}
          />
        </Box>

        {activeRestingPeriods.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
              Resting periods to avoid:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {activeRestingPeriods.map((period) => (
                <Chip
                  key={period.id}
                  label={`${period.label} (${hourToAmPm(period.startTime)} - ${hourToAmPm(period.endTime)})`}
                  size="small"
                  variant="outlined"
                  color="warning"
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>

      <Divider sx={{ mb: 2 }} />

      {suggestions.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: { xs: 4, sm: 6 },
            color: 'text.secondary',
          }}
        >
          <Typography variant="body1" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            No pending tasks. Add tasks to see your optimized schedule!
          </Typography>
        </Box>
      ) : (
        <>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2,
              fontSize: { xs: '0.813rem', sm: '0.875rem' },
            }}
          >
            Based on your task priorities, energy levels, and resting periods, here's your optimized schedule:
          </Typography>

          <List sx={{ maxHeight: { xs: '400px', md: 'calc(100vh - 400px)' }, overflow: 'auto' }}>
            {suggestions.map((suggestion, index) => (
              <ListItem
                key={`${suggestion.task.id}-${suggestion.suggestedStartTime.getTime()}`}
                sx={{
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'background.default',
                  borderRadius: 2,
                  mb: 1,
                  p: { xs: 1.5, sm: 2 },
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  mb: 1,
                  gap: 1,
                }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: '0.875rem', sm: '0.938rem' },
                      flex: 1,
                      wordBreak: 'break-word',
                    }}
                  >
                    {index + 1}. {suggestion.task.title}
                  </Typography>
                  <Chip
                    label={formatDuration(suggestion.task.estimatedDuration)}
                    size="small"
                    variant="outlined"
                    sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                      flexShrink: 0,
                    }}
                  />
                </Box>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', mb: 0.5, fontSize: { xs: '0.75rem', sm: '0.8125rem' } }}
                >
                  {isValid(suggestion.suggestedStartTime) ? format(suggestion.suggestedStartTime, 'EEE, MMM d, yyyy') : 'Invalid Date'}
                </Typography>

                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 600,
                    mb: 0.5,
                    color: 'primary.main',
                    fontSize: { xs: '0.813rem', sm: '0.875rem' },
                  }}
                >
                  {isValid(suggestion.suggestedStartTime) ? format(suggestion.suggestedStartTime, 'h:mm a') : '--:--'} -{' '}
                  {isValid(suggestion.suggestedEndTime) ? format(suggestion.suggestedEndTime, 'h:mm a') : '--:--'}
                </Typography>

                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.813rem' } }}
                >
                  {suggestion.reasoning}
                </Typography>
              </ListItem>
            ))}
          </List>
        </>
      )}

      <ScheduleSettings
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        preferences={preferences}
        onSave={setPreferences}
      />
    </Paper>
  );
}
