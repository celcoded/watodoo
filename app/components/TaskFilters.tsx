'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  useMediaQuery,
  useTheme,
  Button,
} from '@mui/material';
import {
  Search as SearchIcon,
  BatteryChargingFull as EnergyIcon,
  PriorityHigh as UrgencyIcon,
} from '@mui/icons-material';

export type FilterType = 'all' | 'active' | 'completed' | 'overdue';
export type GroupByType = 'energy' | 'urgency';

export interface DateFilter {
  startDate: string;
  endDate: string;
}

interface TaskFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  groupBy: GroupByType;
  onGroupByChange: (groupBy: GroupByType) => void;
  dateFilter: DateFilter;
  onDateFilterChange: (dateFilter: DateFilter) => void;
}

export default function TaskFilters({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
  groupBy,
  onGroupByChange,
  dateFilter,
  onDateFilterChange,
}: TaskFiltersProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (localSearch !== searchQuery) {
        onSearchChange(localSearch);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [localSearch, searchQuery, onSearchChange]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mb: 3,
      }}
    >
      <TextField
        placeholder="Search tasks..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Box 
        sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          justifyContent: 'space-between',
        }}
      >
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(_, value) => value && onFilterChange(value)}
          size="small"
          fullWidth={isMobile}
          sx={{
            '& .MuiToggleButton-root': {
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              px: { xs: 1, sm: 2 },
            },
          }}
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="active">Active</ToggleButton>
          <ToggleButton value="completed">Done</ToggleButton>
          <ToggleButton value="overdue">Overdue</ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup
          value={groupBy}
          exclusive
          onChange={(_, value) => value && onGroupByChange(value)}
          size="small"
          fullWidth={isMobile}
          sx={{
            '& .MuiToggleButton-root': {
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              px: { xs: 1.5, sm: 2.5 },
            },
          }}
        >
          <ToggleButton value="energy">
            <EnergyIcon fontSize="small" sx={{ mr: 0.5 }} />
            {!isMobile && 'Energy'}
          </ToggleButton>
          <ToggleButton value="urgency">
            <UrgencyIcon fontSize="small" sx={{ mr: 0.5 }} />
            {!isMobile && 'Urgency'}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          alignItems: { xs: 'stretch', sm: 'center' },
        }}
      >
        <TextField
          label="Start Date"
          type="date"
          value={dateFilter.startDate}
          onChange={(e) => onDateFilterChange({ ...dateFilter, startDate: e.target.value })}
          size="small"
          InputLabelProps={{ shrink: true }}
          sx={{ flex: 1 }}
        />
        <TextField
          label="End Date"
          type="date"
          value={dateFilter.endDate}
          onChange={(e) => onDateFilterChange({ ...dateFilter, endDate: e.target.value })}
          size="small"
          InputLabelProps={{ shrink: true }}
          sx={{ flex: 1 }}
        />
        {(dateFilter.startDate || dateFilter.endDate) && (
          <Button
            size="small"
            onClick={() => onDateFilterChange({ startDate: '', endDate: '' })}
            sx={{ minWidth: { xs: '100%', sm: 'auto' } }}
          >
            Clear Dates
          </Button>
        )}
      </Box>
    </Box>
  );
}
