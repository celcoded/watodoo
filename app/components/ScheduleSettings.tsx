'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  IconButton,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Close as CloseIcon,
  Loop as LoopIcon,
} from '@mui/icons-material';
import { RestingPeriod, SchedulePreferences, SpecialDay } from '../types/task';
import { generateId } from '../utils/taskScheduler';

interface ScheduleSettingsProps {
  open: boolean;
  onClose: () => void;
  preferences: SchedulePreferences;
  onSave: (preferences: SchedulePreferences) => void;
}

const timeToHour = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours + (minutes || 0) / 60;
};

const hourToTime = (hour: number): string => {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

const formatTimeDisplay = (hour: number): string => {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${displayH}:${m.toString().padStart(2, '0')} ${period}`;
};

const SpecialDayForm = React.memo(({ onAdd, isMobile }: { onAdd: (day: SpecialDay) => void; isMobile: boolean }) => {
  const [newSpecialDate, setNewSpecialDate] = useState('');
  const [newSpecialLabel, setNewSpecialLabel] = useState('');
  const [newSpecialIsWork, setNewSpecialIsWork] = useState(false);
  const [newSpecialIsRecurring, setNewSpecialIsRecurring] = useState(false);

  const handleAdd = () => {
    if (!newSpecialDate) return;
    
    onAdd({
      date: newSpecialDate,
      isWorkDay: newSpecialIsWork,
      isRecurring: newSpecialIsRecurring,
      label: newSpecialLabel.trim() || 'Special Day',
      isActive: true,
    });

    setNewSpecialDate('');
    setNewSpecialLabel('');
    setNewSpecialIsWork(false);
    setNewSpecialIsRecurring(false);
  };

  return (
    <Box sx={{ mb: 2, bgcolor: 'background.default', borderRadius: 1 }}>
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          <TextField
            label="Label"
            value={newSpecialLabel}
            onChange={(e) => setNewSpecialLabel(e.target.value)}
            size="small"
            fullWidth
          />
          <TextField
            label="Date"
            type="date"
            value={newSpecialDate}
            onChange={(e) => setNewSpecialDate(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'column' }, justifyContent: { xs: 'flex-start', sm: 'center' }, gap: { xs: 2, sm: 0.5 } }}>
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={newSpecialIsWork}
                onChange={(e) => setNewSpecialIsWork(e.target.checked)}
              />
            }
            label={<Typography variant="caption">{newSpecialIsWork ? 'Work Day' : 'Rest Day'}</Typography>}
            sx={{ mr: 0 }}
          />
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={newSpecialIsRecurring}
                onChange={(e) => setNewSpecialIsRecurring(e.target.checked)}
              />
            }
            label={<Typography variant="caption">Every Year</Typography>}
            sx={{ mr: 0 }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-end', sm: 'center' } }}>
          <IconButton
            onClick={handleAdd}
            color="primary"
            size="small"
            disabled={!newSpecialDate}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
});

const RestingPeriodForm = React.memo(({ onAdd, isMobile }: { onAdd: (period: Omit<RestingPeriod, 'id'>) => void; isMobile: boolean }) => {
  const [newPeriodLabel, setNewPeriodLabel] = useState('');
  const [newPeriodStart, setNewPeriodStart] = useState('12:00');
  const [newPeriodEnd, setNewPeriodEnd] = useState('13:00');

  const handleAdd = () => {
    if (!newPeriodLabel.trim()) return;

    const startHour = timeToHour(newPeriodStart);
    const endHour = timeToHour(newPeriodEnd);

    if (startHour >= endHour) return;

    onAdd({
      startTime: startHour,
      endTime: endHour,
      label: newPeriodLabel.trim(),
      isActive: true,
    });

    setNewPeriodLabel('');
    setNewPeriodStart('12:00');
    setNewPeriodEnd('13:00');
  };

  return (
    <Box sx={{ mb: 2, p: 1.5, bgcolor: 'background.default', borderRadius: 1 }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
        Add breaks and resting times to avoid scheduling during these periods:
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexDirection: { xs: 'column', sm: 'row' } }}>
        <TextField
          label="Label (e.g., Lunch, Break)"
          value={newPeriodLabel}
          onChange={(e) => setNewPeriodLabel(e.target.value)}
          size="small"
          fullWidth={isMobile}
        />
        <TextField
          label="Start Time"
          type="time"
          value={newPeriodStart}
          onChange={(e) => setNewPeriodStart(e.target.value)}
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Time"
          type="time"
          value={newPeriodEnd}
          onChange={(e) => setNewPeriodEnd(e.target.value)}
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <IconButton
          onClick={handleAdd}
          color="primary"
          size="small"
          disabled={!newPeriodLabel.trim() || newPeriodStart >= newPeriodEnd}
          sx={{ alignSelf: { xs: 'flex-end', sm: 'center' } }}
        >
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
});

export default function ScheduleSettings({
  open,
  onClose,
  preferences,
  onSave,
}: ScheduleSettingsProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [workStartHour, setWorkStartHour] = useState(preferences.workStartHour);
  const [workEndHour, setWorkEndHour] = useState(preferences.workEndHour);
  const [restingPeriods, setRestingPeriods] = useState<RestingPeriod[]>(preferences.restingPeriods);
  const [workDays, setWorkDays] = useState<number[]>(preferences.workDays || [1, 2, 3, 4, 5]);
  const [specialDays, setSpecialDays] = useState(preferences.specialDays || []);
  const [showPassedDates, setShowPassedDates] = useState(false);

  const todayStr = useMemo(() => {
    const today = new Date();
    return today.getFullYear() + '-' + 
      String(today.getMonth() + 1).padStart(2, '0') + '-' + 
      String(today.getDate()).padStart(2, '0');
  }, []);

  const displayedSpecialDays = useMemo(() => {
    return specialDays.filter((sd) => {
      if (showPassedDates) return true;
      return sd.isRecurring || sd.date >= todayStr;
    });
  }, [specialDays, showPassedDates, todayStr]);

  useEffect(() => {
    setWorkStartHour(preferences.workStartHour);
    setWorkEndHour(preferences.workEndHour);
    setRestingPeriods((preferences.restingPeriods || []).sort((a, b) => a.startTime - b.startTime));
    setWorkDays(preferences.workDays || [1, 2, 3, 4, 5]);
    
    // Filter out past special days unless they are recurring
    const today = new Date();
    const todayStr = today.getFullYear() + '-' + 
      String(today.getMonth() + 1).padStart(2, '0') + '-' + 
      String(today.getDate()).padStart(2, '0');
    
    const filteredSpecialDays = (preferences.specialDays || []).reduce<SpecialDay[]>((acc, sd) => {
      if (sd.isRecurring) {
        const currentYear = today.getFullYear();
        const [_, month, day] = sd.date.split('-');
        
        const dateInCurrentYear = new Date(currentYear, parseInt(month) - 1, parseInt(day));
        const todayZero = new Date(today);
        todayZero.setHours(0, 0, 0, 0);
        
        const targetYear = dateInCurrentYear < todayZero ? currentYear + 1 : currentYear;
        acc.push({ ...sd, date: `${targetYear}-${month}-${day}` });
      } else {
        acc.push(sd);
      }
      return acc;
    }, []).sort((a, b) => a.date.localeCompare(b.date));
    setSpecialDays(filteredSpecialDays);
  }, [preferences, open]);

  const handleAddRestingPeriod = useCallback((period: Omit<RestingPeriod, 'id'>) => {
    const newPeriod: RestingPeriod = {
      id: generateId(),
      ...period
    };
    setRestingPeriods(prev => [...prev, newPeriod].sort((a, b) => a.startTime - b.startTime));
  }, []);

  const handleDeleteRestingPeriod = useCallback((id: string) => {
    setRestingPeriods(prev => prev.filter(p => p.id !== id));
  }, []);

  const handleToggleRestingPeriod = useCallback((id: string) => {
    setRestingPeriods(prev =>
      prev.map(p =>
        p.id === id ? { ...p, isActive: !p.isActive } : p
      )
    );
  }, []);

  const handleToggleWorkDay = useCallback((day: number) => {
    setWorkDays(prev => {
      if (prev.includes(day)) {
        return prev.filter(d => d !== day);
      } else {
        return [...prev, day].sort((a, b) => a - b);
      }
    });
  }, []);

  const handleAddSpecialDay = useCallback((day: SpecialDay) => {
    setSpecialDays(prev => [...prev, day].sort((a, b) => a.date.localeCompare(b.date)));
  }, []);

  const handleDeleteSpecialDay = useCallback((date: string) => {
    setSpecialDays(prev => prev.filter(sd => sd.date !== date));
  }, []);

  const handleToggleSpecialDay = useCallback((date: string) => {
    setSpecialDays(prev =>
      prev.map(sd =>
        sd.date === date ? { ...sd, isActive: sd.isActive === false ? true : false } : sd
      )
    );
  }, []);

  const handleSave = () => {
    onSave({
      workStartHour,
      workEndHour,
      restingPeriods,
      workDays,
      specialDays,
    });
    onClose();
  };

  const specialDaysList = useMemo(() => (
    specialDays.length > 0 && (
      <List sx={{ bgcolor: 'background.default', borderRadius: 1, maxHeight: 150, overflow: 'auto' }}>
        {displayedSpecialDays.map((sd) => {
          const isPassed = !sd.isRecurring && sd.date < todayStr;

          return (
          <ListItem
            key={sd.date}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 1,
              px: 1.5,
              borderBottom: '1px solid',
              borderColor: 'divider',
              '&:last-child': { borderBottom: 'none' },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={!isPassed && sd.isActive !== false}
                    disabled={isPassed}
                    onChange={() => handleToggleSpecialDay(sd.date)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {sd.label || 'Special Day'}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                      <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {new Date(sd.date).toLocaleDateString()}
                      </Typography>
                      <Chip
                        label={sd.isWorkDay ? 'Work Day' : 'Rest Day'}
                        size="small"
                        color={sd.isWorkDay ? 'primary' : 'default'}
                        sx={{ height: 20, '& .MuiChip-label': { px: 1, fontSize: '0.7rem' } }}
                      />
                      {sd.isRecurring && (
                        <Chip 
                          icon={<LoopIcon sx={{ fontSize: '1rem !important' }} />} 
                          label="Yearly" 
                          size="small" 
                          variant="outlined" 
                          sx={{ height: 20, '& .MuiChip-label': { px: 1, fontSize: '0.7rem' } }} 
                        />
                      )}
                      {isPassed && (
                        <Chip 
                          label="Passed" 
                          size="small" 
                          variant="outlined" 
                          sx={{ height: 20, '& .MuiChip-label': { px: 1, fontSize: '0.7rem' }, color: 'text.secondary', borderColor: 'text.disabled' }} 
                        />
                      )}
                    </Box>
                  </Box>
                }
              />
            </Box>
            <IconButton
              size="small"
              onClick={() => handleDeleteSpecialDay(sd.date)}
              color="error"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ListItem>
          );
        })}
      </List>
    )
  ), [displayedSpecialDays, specialDays.length, todayStr, handleToggleSpecialDay, handleDeleteSpecialDay]);

  const restingPeriodsList = useMemo(() => (
    restingPeriods.length > 0 && (
      <List sx={{ bgcolor: 'background.default', borderRadius: 1, maxHeight: 300, overflow: 'auto' }}>
        {restingPeriods.map((period) => (
          <ListItem
            key={period.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 1,
              px: 1.5,
              borderBottom: '1px solid',
              borderColor: 'divider',
              '&:last-child': { borderBottom: 'none' },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={period.isActive}
                    onChange={() => handleToggleRestingPeriod(period.id)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {period.label}
                    </Typography>
                    <Chip
                      label={`${formatTimeDisplay(period.startTime)} - ${formatTimeDisplay(period.endTime)}`}
                      size="small"
                      variant="outlined"
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                }
              />
            </Box>
            <IconButton
              size="small"
              onClick={() => handleDeleteRestingPeriod(period.id)}
              color="error"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ListItem>
        ))}
      </List>
    )
  ), [restingPeriods, handleToggleRestingPeriod, handleDeleteRestingPeriod]);

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Schedule Settings
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
            Work Days
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {dayNames.map((day, index) => (
              <Chip
                key={index}
                label={day}
                onClick={() => handleToggleWorkDay(index)}
                color={workDays.includes(index) ? 'primary' : 'default'}
                variant={workDays.includes(index) ? 'filled' : 'outlined'}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
            Work Hours
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              label="Start Time"
              type="time"
              value={hourToTime(workStartHour)}
              onChange={(e) => setWorkStartHour(timeToHour(e.target.value))}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <Typography>to</Typography>
            <TextField
              label="End Time"
              type="time"
              value={hourToTime(workEndHour)}
              onChange={(e) => setWorkEndHour(timeToHour(e.target.value))}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
            Special Days
          </Typography>
          <Box sx={{ mb: 2, p: 1.5, bgcolor: 'background.default', borderRadius: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
              <Typography variant="caption" color="text.secondary">
                Override specific dates:
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    checked={showPassedDates}
                    onChange={(e) => setShowPassedDates(e.target.checked)}
                  />
                }
                label={<Typography variant="caption">Show Passed</Typography>}
                sx={{ mr: 0 }}
              />
            </Box>
            <SpecialDayForm onAdd={handleAddSpecialDay} isMobile={isMobile} />
          </Box>
          {specialDaysList}
        </Box>

        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
          Resting Periods
        </Typography>

        <RestingPeriodForm onAdd={handleAddRestingPeriod} isMobile={isMobile} />

        {restingPeriodsList}

        {restingPeriods.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
            No resting periods configured
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save Preferences
        </Button>
      </DialogActions>
    </Dialog>
  );
}
