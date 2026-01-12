import { TiringLevel, Urgency } from '../types/task';

export const TIRING_LEVELS: { value: TiringLevel; label: string; color: string }[] = [
  { value: 'low', label: 'Low Energy', color: '#2d6738' },        // Medium Green
  { value: 'medium', label: 'Moderate', color: '#5a8266' },       // Forest Green
  { value: 'high', label: 'High Energy', color: '#D97028' },      // Warm Orange
  { value: 'very-high', label: 'Very Intense', color: '#C75A2C' }, // Strong Orange-Red
];

export const URGENCY_LEVELS: { value: Urgency; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: '#2d6738' },       // Medium Green
  { value: 'medium', label: 'Medium', color: '#5a8266' }, // Forest Green
  { value: 'high', label: 'High', color: '#D97028' },     // Warm Orange
  { value: 'critical', label: 'Critical', color: '#C75A2C' }, // Strong Orange-Red
];

export const DEFAULT_WORK_HOURS = {
  start: 9, // 9 AM
  end: 18, // 6 PM
};

export const DEFAULT_BREAK_DURATION = 15; // minutes

export const ENERGY_RECOVERY_TIME = {
  low: 10,
  'low-medium': 15,
  medium: 20,
  'medium-high': 25,
  high: 30,
  'very-high': 45,
}; // minutes needed to recover after task
