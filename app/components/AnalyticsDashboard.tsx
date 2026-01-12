'use client';

import React, { useState, useMemo } from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  LinearProgress,
  Chip,
  useTheme,
  TextField,
  Button,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckIcon,
  Lightbulb as LightbulbIcon,
} from '@mui/icons-material';
import { Task } from '../types/task';
import { formatDuration } from '../utils/taskScheduler';

interface AnalyticsDashboardProps {
  tasks: Task[];
}

export default function AnalyticsDashboard({ tasks }: AnalyticsDashboardProps) {
  const theme = useTheme();
  const [dateFilter, setDateFilter] = useState({ startDate: '', endDate: '' });

  const filteredTasks = useMemo(() => {
    if (!dateFilter.startDate && !dateFilter.endDate) {
      return tasks;
    }

    return tasks.filter((task) => {
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
  }, [tasks, dateFilter]);

  const completedTasks = filteredTasks.filter((t) => t.isCompleted);
  const incompleteTasks = filteredTasks.filter((t) => !t.isCompleted);
  
  const completionRate = tasks.length > 0 
    ? Math.round((completedTasks.length / tasks.length) * 100)
    : 0;

  const totalEstimatedTime = filteredTasks.reduce((sum, t) => sum + t.estimatedDuration, 0);
  const completedTime = completedTasks.reduce((sum, t) => sum + t.estimatedDuration, 0);
  const remainingTime = totalEstimatedTime - completedTime;

  const tiringLevelStats = {
    low: filteredTasks.filter((t) => t.tiringLevel === 'low').length,
    medium: filteredTasks.filter((t) => t.tiringLevel === 'medium').length,
    high: filteredTasks.filter((t) => t.tiringLevel === 'high').length,
    'very-high': filteredTasks.filter((t) => t.tiringLevel === 'very-high').length,
  };

  const mostCommonLevel = Object.entries(tiringLevelStats)
    .sort(([, a], [, b]) => b - a)[0]?.[0] || 'medium';

  const stats = [
    {
      title: 'Completion Rate',
      value: `${completionRate}%`,
      icon: <CheckIcon />,
      color: 'success' as const,
      subtitle: `${completedTasks.length} of ${filteredTasks.length} tasks`,
    },
    {
      title: 'Time Completed',
      value: formatDuration(completedTime),
      icon: <ScheduleIcon />,
      color: 'info' as const,
      subtitle: `${formatDuration(remainingTime)} remaining`,
    },
    {
      title: 'Productivity Trend',
      value: completionRate >= 70 ? '↗ High' : completionRate >= 40 ? '→ Medium' : '↘ Low',
      icon: <TrendingUpIcon />,
      color: completionRate >= 70 ? 'success' : completionRate >= 40 ? 'warning' : 'error',
      subtitle: 'Based on completion rate',
    },
    {
      title: 'Energy Balance',
      value: mostCommonLevel.replace('-', ' '),
      icon: <LightbulbIcon />,
      color: 'secondary' as const,
      subtitle: 'Most common task level',
    },
  ];

  return (
    <Paper 
      sx={{ 
        p: { xs: 2, sm: 3 },
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            fontWeight: 600,
          }}
        >
          📊 Analytics Overview
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            alignItems: { xs: 'stretch', sm: 'center' },
            mt: 2,
          }}
        >
          <TextField
            label="Start Date"
            type="date"
            value={dateFilter.startDate}
            onChange={(e) => setDateFilter({ ...dateFilter, startDate: e.target.value })}
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1 }}
          />
          <TextField
            label="End Date"
            type="date"
            value={dateFilter.endDate}
            onChange={(e) => setDateFilter({ ...dateFilter, endDate: e.target.value })}
            size="small"
            InputLabelProps={{ shrink: true }}
            sx={{ flex: 1 }}
          />
          {(dateFilter.startDate || dateFilter.endDate) && (
            <Button
              size="small"
              onClick={() => setDateFilter({ startDate: '', endDate: '' })}
              sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
            >
              Clear Dates
            </Button>
          )}
        </Box>
      </Box>

      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 3,
                  transform: 'translateY(-2px)',
                },
                background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(107, 150, 119, 0.08) 0%, rgba(201, 150, 95, 0.08) 100%)'
                : 'linear-gradient(135deg, rgba(45, 103, 56, 0.04) 0%, rgba(217, 112, 40, 0.04) 100%)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" sx={{ my: 1, fontWeight: 700, color: `${stat.color}.main` }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {stat.subtitle}
                  </Typography>
                </Box>
                <Chip
                  icon={stat.icon}
                  label=""
                  variant="filled"
                  color={stat.color as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& .MuiChip-icon': {
                      margin: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{
          p: { xs: 2, sm: 3 },
          mt: 3,
          background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, rgba(107, 150, 119, 0.08) 0%, rgba(201, 150, 95, 0.08) 100%)'
          : 'linear-gradient(135deg, rgba(45, 103, 56, 0.04) 0%, rgba(217, 112, 40, 0.04) 100%)'
        }}>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
          Task Distribution by Energy Level
        </Typography>
        <Box sx={{ mt: 2 }}>
          {Object.entries(tiringLevelStats).map(([level, count]) => (
            <Box key={level} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                  {level.replace('-', ' ')}
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {count} tasks
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={filteredTasks.length > 0 ? (count / filteredTasks.length) * 100 : 0}
                sx={{
                  height: 8,
                  borderRadius: 1,
                  bgcolor: 'background.paper',
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
