'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Slider,
  useMediaQuery,
  useTheme,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Task, TaskFormData, TiringLevel, Urgency } from '../types/task';
import { TIRING_LEVELS, URGENCY_LEVELS } from '../constants';
import { generateId } from '../utils/taskScheduler';
import { tiringLevelColors } from '../theme/colors';

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  editTask?: Task;
}

export default function TaskDialog({ open, onClose, onSave, editTask }: TaskDialogProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [formData, setFormData] = useState<TaskFormData>({
    title: editTask?.title || '',
    description: editTask?.description || '',
    estimatedDuration: editTask?.estimatedDuration || 30,
    deadline: editTask?.deadline || new Date(),
    tiringLevel: editTask?.tiringLevel || 'medium',
    urgency: editTask?.urgency || 'medium',
  });
  
  const [isOngoing, setIsOngoing] = useState(editTask?.isOngoing || false);
  const [hasStartDateTime, setHasStartDateTime] = useState(!!(editTask?.startDate || editTask?.startTime));
  const [startDateTime, setStartDateTime] = useState<Date | null>(editTask?.startDate || editTask?.startTime || null);

  const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({});

  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title,
        description: editTask.description,
        estimatedDuration: editTask.estimatedDuration,
        deadline: editTask.deadline,
        tiringLevel: editTask.tiringLevel,
        urgency: editTask.urgency,
      });
      setIsOngoing(editTask.isOngoing || false);
      setHasStartDateTime(!!(editTask.startDate || editTask.startTime));
      setStartDateTime(editTask.startDate || editTask.startTime || null);
    }
  }, [editTask]);

  const handleSubmit = () => {
    // Validate
    const newErrors: Partial<Record<keyof TaskFormData, string>> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (formData.estimatedDuration <= 0) newErrors.estimatedDuration = 'Duration must be positive';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const task: Task = {
      id: editTask?.id || generateId(),
      title: formData.title,
      description: formData.description,
      estimatedDuration: formData.estimatedDuration,
      deadline: formData.deadline,
      tiringLevel: formData.tiringLevel,
      urgency: formData.urgency,
      isCompleted: editTask?.isCompleted || false,
      isOngoing: isOngoing,
      createdAt: editTask?.createdAt || new Date(),
      startDate: hasStartDateTime ? startDateTime || undefined : undefined,
      startTime: hasStartDateTime ? startDateTime || undefined : undefined,
      scheduledDate: editTask?.scheduledDate,
      scheduledTime: editTask?.scheduledTime,
    };

    onSave(task);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      estimatedDuration: 30,
      deadline: new Date(),
      tiringLevel: 'medium',
      urgency: 'medium',
    });
    setIsOngoing(false);
    setHasStartDateTime(false);
    setStartDateTime(null);
    setErrors({});
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
      fullScreen={isMobile}
    >
      <DialogTitle sx={{ 
        fontWeight: 700,
        fontSize: { xs: '1.25rem', sm: '1.5rem' },
      }}>
        {editTask ? 'Edit Task' : 'Add New Task'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 2.5 }, pt: 2 }}>
          <TextField
            label="Task Title"
            fullWidth
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            error={!!errors.title}
            helperText={errors.title}
            autoFocus={!isMobile}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <Box>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1,
            }}>
              <Typography variant="body2" fontWeight={600}>
                Estimated Duration
              </Typography>
              <Typography variant="body2" color="primary" fontWeight={700}>
                {formData.estimatedDuration} minutes
              </Typography>
            </Box>
            <Slider
              value={formData.estimatedDuration}
              onChange={(_, value) =>
                setFormData({ ...formData, estimatedDuration: value as number })
              }
              min={5}
              max={480}
              step={5}
              marks={[
                { value: 30, label: '30m' },
                { value: 60, label: '1h' },
                { value: 120, label: '2h' },
                { value: 240, label: '4h' },
              ]}
              sx={{
                '& .MuiSlider-markLabel': {
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                },
              }}
            />
          </Box>

            <DateTimePicker
              label="Deadline"
              value={formData.deadline}
              onChange={(newValue) =>
                setFormData({ ...formData, deadline: newValue || new Date() })
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: isMobile ? 'medium' : 'medium',
                },
              }}
            />

          <FormControl fullWidth>
            <InputLabel>Energy Level Required</InputLabel>
            <Select
              value={formData.tiringLevel}
              label="Energy Level Required"
              onChange={(e) =>
                setFormData({ ...formData, tiringLevel: e.target.value as TiringLevel })
              }
            >
              {TIRING_LEVELS.map((level) => {
                const colors = isDarkMode ? tiringLevelColors.dark : tiringLevelColors.light;
                return (
                  <MenuItem key={level.value} value={level.value}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          bgcolor: colors[level.value],
                        }}
                      />
                      {level.label}
                    </Box>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Urgency</InputLabel>
            <Select
              value={formData.urgency}
              label="Urgency"
              onChange={(e) =>
                setFormData({ ...formData, urgency: e.target.value as Urgency })
              }
            >
              {URGENCY_LEVELS.map((level) => (
                <MenuItem key={level.value} value={level.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        bgcolor: level.color,
                      }}
                    />
                    {level.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={isOngoing}
                onChange={(e) => setIsOngoing(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  Mark as Ongoing
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Ongoing tasks appear at the top of your schedule
                </Typography>
              </Box>
            }
          />

          <FormControlLabel
            control={
              <Switch
                checked={hasStartDateTime}
                onChange={(e) => setHasStartDateTime(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  Set Specific Start Date/Time
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  For meetings or scheduled events
                </Typography>
              </Box>
            }
          />

          {hasStartDateTime && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pl: 2, borderLeft: 2, borderColor: 'primary.main' }}>
              <DateTimePicker
                label="Start Date & Time"
                value={startDateTime}
                onChange={(newValue) => setStartDateTime(newValue)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: isMobile ? 'medium' : 'medium',
                  },
                }}
              />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: { xs: 2, sm: 3 }, pt: { xs: 1, sm: 2 } }}>
        <Button onClick={handleClose} size={isMobile ? 'medium' : 'large'}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          size={isMobile ? 'medium' : 'large'}
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
          {editTask ? 'Update' : 'Add Task'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
