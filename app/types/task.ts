export type TiringLevel = 'low' | 'low-medium' | 'medium' | 'medium-high' | 'high' | 'very-high';
export type Urgency = 'low' | 'medium' | 'high' | 'critical';

export interface RestingPeriod {
  id: string;
  startTime: number; // hours 0-24
  endTime: number; // hours 0-24
  label: string;
  isActive: boolean;
}

export interface SpecialDay {
  date: string; // YYYY-MM-DD format
  isWorkDay: boolean;
  isRecurring?: boolean;
  label?: string;
  isActive?: boolean;
}

export interface SpecialScheduledTask {
  taskId: string;
  originalDate: Date;
  originalTime: Date;
  scheduledDate: Date;
  scheduledTime: Date;
  reason: string; // Why it was rescheduled
}

export interface SchedulePreferences {
  restingPeriods: RestingPeriod[];
  workStartHour: number;
  workEndHour: number;
  workDays: number[]; // 0-6, where 0 is Sunday
  specialDays: SpecialDay[];
  specialScheduledTasks?: SpecialScheduledTask[]; // Tasks rescheduled due to conflicts
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  estimatedDuration: number; // in minutes
  deadline: Date;
  tiringLevel: TiringLevel;
  urgency: Urgency;
  isCompleted: boolean;
  isOngoing: boolean; // New field for ongoing/in-progress tasks
  createdAt: Date;
  suggestedStartTime?: Date;
  startDate?: Date; // When the task should start (e.g., meeting date)
  startTime?: Date; // Specific time the task should start
  priority?: number; // Priority level (1-10, where 1 is highest)
  scheduledDate?: Date; // Actual scheduled date (may differ from startDate)
  scheduledTime?: Date; // Actual scheduled time (may differ from startTime)
}

export interface TaskFormData {
  title: string;
  description?: string;
  estimatedDuration: number;
  deadline: Date;
  tiringLevel: TiringLevel;
  urgency: Urgency;
}

export interface DaySchedule {
  date: Date;
  tasks: Task[];
  availableTimeSlots: TimeSlot[];
}

export interface TimeSlot {
  startTime: Date;
  endTime: Date;
  isAvailable: boolean;
}

export interface ScheduleSuggestion {
  task: Task;
  suggestedStartTime: Date;
  suggestedEndTime: Date;
  reasoning: string;
}
