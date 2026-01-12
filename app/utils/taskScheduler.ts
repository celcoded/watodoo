import { Task, ScheduleSuggestion, TiringLevel, RestingPeriod, SchedulePreferences, SpecialDay } from '../types/task';
import { DEFAULT_WORK_HOURS, ENERGY_RECOVERY_TIME } from '../constants';

/**
 * Calculates optimal schedule for tasks based on deadlines, duration, energy levels, and resting periods
 */
export class TaskScheduler {
  private tasks: Task[];
  private workStartHour: number;
  private workEndHour: number;
  private restingPeriods: RestingPeriod[];
  private workDays: number[];
  private specialDays: SpecialDay[];
  private specialScheduledTasks: Map<string, { originalDate: Date; originalTime: Date; scheduledDate: Date; scheduledTime: Date; reason: string }>;

  constructor(tasks: Task[], preferences?: SchedulePreferences | { start: number; end: number }) {
    this.tasks = tasks;
    this.specialScheduledTasks = new Map();
    
    if (preferences && 'workStartHour' in preferences) {
      this.workStartHour = preferences.workStartHour;
      this.workEndHour = preferences.workEndHour;
      this.restingPeriods = preferences.restingPeriods;
      this.workDays = preferences.workDays || [1, 2, 3, 4, 5];
      this.specialDays = preferences.specialDays || [];
      
      // Load special scheduled tasks if available
      if (preferences.specialScheduledTasks) {
        preferences.specialScheduledTasks.forEach(task => {
          this.specialScheduledTasks.set(task.taskId, {
            originalDate: task.originalDate,
            originalTime: task.originalTime,
            scheduledDate: task.scheduledDate,
            scheduledTime: task.scheduledTime,
            reason: task.reason
          });
        });
      }
    } else if (preferences) {
      this.workStartHour = preferences.start;
      this.workEndHour = preferences.end;
      this.restingPeriods = [];
      this.workDays = [1, 2, 3, 4, 5];
      this.specialDays = [];
    } else {
      this.workStartHour = DEFAULT_WORK_HOURS.start;
      this.workEndHour = DEFAULT_WORK_HOURS.end;
      this.restingPeriods = [];
      this.workDays = [1, 2, 3, 4, 5];
      this.specialDays = [];
    }
  }

  /**
   * Check if a given date is a work day
   */
  private isWorkDay(date: Date): boolean {
    if (!date || isNaN(date.getTime())) {
      return false; // Invalid dates are not considered work days.
    }
    const dayOfWeek = date.getDay();
    const dateStr = date.toISOString().split('T')[0];
    
    // Check special days first
    const specialDay = this.specialDays.find(sd => {
      if (sd.isActive === false) return false;
      if (sd.isRecurring) {
        // Compare MM-DD
        return sd.date.slice(5) === dateStr.slice(5);
      }
      return sd.date === dateStr;
    });
    if (specialDay) {
      return specialDay.isWorkDay;
    }
    
    // Check regular work days
    return this.workDays.includes(dayOfWeek);
  }

  /**
   * Check if a time falls within resting periods
   */
  private isRestingTime(date: Date): boolean {
    const currentDecimal = date.getHours() + date.getMinutes() / 60;
    return this.restingPeriods.some(period => 
      period.isActive && 
      (period.startTime < period.endTime 
        ? currentDecimal >= period.startTime && currentDecimal < period.endTime
        : currentDecimal >= period.startTime || currentDecimal < period.endTime)
    );
  }

  /**
   * Check if a time falls within resting periods or overlaps with fixed tasks
   */
  private isBlocked(date: Date, excludeTaskId?: string): boolean {
    if (this.isRestingTime(date)) return true;

    const time = date.getTime();
    return this.tasks.some(task => {
      if (task.id === excludeTaskId) return false;
      if (task.isCompleted || !this.hasSpecificSchedule(task)) return false;
      
      const startRaw = task.scheduledTime || task.startTime;
      if (!startRaw) return false;
      
      const start = new Date(startRaw);
      const end = start.getTime() + task.estimatedDuration * 60000;
      return time >= start.getTime() && time < end;
    });
  }

  /**
   * Get next available time slot after a given time, considering resting periods, work hours, and work days
   */
  private getNextAvailableTime(time: Date, excludeTaskId?: string): Date {
    let current = new Date(time);
    const maxIterations = 24 * 60; // Prevent infinite loops

    for (let i = 0; i < maxIterations; i++) {
      const currentDecimal = current.getHours() + current.getMinutes() / 60;

      // Check if not a work day
      if (!this.isWorkDay(current)) {
        current.setDate(current.getDate() + 1);
        this.setHoursFromDecimal(current, this.workStartHour);
        continue;
      }

      // Check if before work start hour
      if (currentDecimal < this.workStartHour) {
        this.setHoursFromDecimal(current, this.workStartHour);
        continue;
      }

      // Check if at or after work end hour
      if (currentDecimal >= this.workEndHour) {
        current.setDate(current.getDate() + 1);
        this.setHoursFromDecimal(current, this.workStartHour);
        continue;
      }

      // Check if in resting period or blocked by fixed task
      if (this.isBlocked(current, excludeTaskId)) {
        current.setMinutes(current.getMinutes() + 15);
        continue;
      }

      return current;
    }

    return current;
  }

  private setHoursFromDecimal(date: Date, decimalHour: number) {
    const hour = Math.floor(decimalHour);
    const minute = Math.round((decimalHour - hour) * 60);
    date.setHours(hour, minute, 0, 0);
  }

  /**
   * Check if a task should be scheduled at a specific time (has startDate/startTime)
   */
  private hasSpecificSchedule(task: Task): boolean {
    // Check if task has a valid startDate or startTime
    if (task.startDate) {
      const startDate = new Date(task.startDate);
      if (!isNaN(startDate.getTime())) return true;
    }
    if (task.startTime) {
      const startTime = new Date(task.startTime);
      if (!isNaN(startTime.getTime())) return true;
    }
    return false;
  }

  /**
   * Schedule a task with specific start date/time, handling conflicts with rest periods
   */
  private scheduleSpecificTask(task: Task): void {
    if (!this.hasSpecificSchedule(task)) return;

    let requestedDateTime: Date;

    // Priority 1: Use startTime if available (most specific)
    if (task.startTime) {
      requestedDateTime = new Date(task.startTime);
    }
    // Priority 2: Use startDate, combine with startTime if available
    else if (task.startDate) {
      const startDate = new Date(task.startDate);
      requestedDateTime = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        startDate.getHours(),
        startDate.getMinutes()
      );
      
      // If the startDate doesn't have time info (00:00:00), use work start hour
      if (requestedDateTime.getHours() === 0 && requestedDateTime.getMinutes() === 0) {
        this.setHoursFromDecimal(requestedDateTime, this.workStartHour);
      }
    } else {
      return; // Should not happen due to hasSpecificSchedule check
    }

    const now = new Date();
    const isPast = requestedDateTime < now;

    // Check if the requested time conflicts with rest periods or non-work days
    const isConflict = 
      isPast ||
      !this.isWorkDay(requestedDateTime) || 
      this.isRestingTime(requestedDateTime);

    if (isConflict) {
      // Find next available slot
      const startSearchTime = isPast ? now : requestedDateTime;
      const newDateTime = this.getNextAvailableTime(startSearchTime, task.id);
      
      let reason = '';
      if (isPast) {
        reason = 'Original start time has passed';
      } else if (!this.isWorkDay(requestedDateTime)) {
        reason = 'Requested time falls on a rest day';
      } else if (this.isRestingTime(requestedDateTime)) {
        reason = 'Requested time falls within a resting period';
      }
      
      // Store the rescheduled information
      this.specialScheduledTasks.set(task.id, {
        originalDate: task.startDate || requestedDateTime,
        originalTime: task.startTime || requestedDateTime,
        scheduledDate: newDateTime,
        scheduledTime: newDateTime,
        reason
      });

      // Update task's scheduled date/time to the new time
      task.scheduledDate = newDateTime;
      task.scheduledTime = newDateTime;
    } else {
      // No conflict, use requested time exactly as specified
      task.scheduledDate = requestedDateTime;
      task.scheduledTime = requestedDateTime;
    }
  }

  /**
   * Remove special schedule when task is completed or removed
   */
  removeSpecialSchedule(taskId: string): void {
    this.specialScheduledTasks.delete(taskId);
  }

  /**
   * Get special schedule information for a task
   */
  getSpecialSchedule(taskId: string) {
    return this.specialScheduledTasks.get(taskId);
  }

  /**
   * Get all special scheduled tasks
   */
  getSpecialScheduledTasks() {
    return Array.from(this.specialScheduledTasks.entries()).map(([taskId, schedule]) => ({
      taskId,
      ...schedule
    }));
  }

  /**
   * Generate schedule suggestions for all tasks, considering current time
   */
  generateSchedule(): ScheduleSuggestion[] {
    const sortedTasks = this.sortTasksByPriority();
    const suggestions: ScheduleSuggestion[] = [];
    let now = new Date();
    now.setSeconds(0, 0);
    let currentTime = this.getNextAvailableTime(now);

    // First, handle tasks with specific start times (meetings, events)
    const tasksWithSpecificTimes: Task[] = [];
    const regularTasks: Task[] = [];

    for (const task of sortedTasks) {
      if (task.isCompleted) continue;
      
      if (this.hasSpecificSchedule(task)) {
        // Schedule the task, handling conflicts
        this.scheduleSpecificTask(task);
        tasksWithSpecificTimes.push(task);
        
        // Use the scheduled time (which may have been adjusted)
        const startTime = task.scheduledTime ? new Date(task.scheduledTime) : new Date(task.startTime || task.startDate!);
        const endTime = new Date(startTime.getTime() + task.estimatedDuration * 60000);
        
        // Build reasoning
        let reasoning = `Fixed schedule at ${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        
        const scheduleInfo = this.getSpecialSchedule(task.id);
        if (scheduleInfo) {
          const originalTime = new Date(scheduleInfo.originalTime);
          reasoning = `Rescheduled from ${originalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} to ${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (${scheduleInfo.reason})`;
        }
        
        if (task.isOngoing) {
          reasoning += ` - Ongoing task`;
        }
        
        suggestions.push({
          task,
          suggestedStartTime: startTime,
          suggestedEndTime: endTime,
          reasoning
        });
      } else {
        regularTasks.push(task);
      }
    }

    // Then handle regular tasks (without specific start times)
    for (const task of regularTasks) {
      if (task.isCompleted) continue;

      let remaining = task.estimatedDuration;
      const recoveryTime = ENERGY_RECOVERY_TIME[task.tiringLevel];

      // Keep scheduling chunks until task fully scheduled
      while (remaining > 0) {
        // Ensure currentTime is within working hours and not in resting
        currentTime = this.getNextAvailableTime(currentTime);

        // Minutes available until next resting period or end of work day
        let availableMinutes = this.getAvailableMinutesUntilNextBlock(currentTime);

        // If no time available now, jump to next workday start
        if (availableMinutes <= 0) {
          currentTime = new Date(currentTime);
          currentTime.setDate(currentTime.getDate() + 1);
          this.setHoursFromDecimal(currentTime, this.workStartHour);
          currentTime = this.getNextAvailableTime(currentTime);
          availableMinutes = this.getAvailableMinutesUntilNextBlock(currentTime);
        }

        const chunkDuration = Math.min(remaining, availableMinutes);

        // If chunkDuration is zero (shouldn't happen), break to avoid infinite loop
        if (chunkDuration <= 0) break;

        const suggestion = this.scheduleTaskChunk(task, currentTime, chunkDuration, remaining - chunkDuration > 0);
        suggestions.push(suggestion);

        // Advance current time by chunk + recovery and move to next available (skipping resting)
        currentTime = new Date(suggestion.suggestedEndTime.getTime() + recoveryTime * 60000);
        currentTime = this.getNextAvailableTime(currentTime);

        remaining -= chunkDuration;

        // If there is remaining time, continue from the next available slot (could be after resting or next day)
        if (remaining > 0) {
          // loop will call getNextAvailableTime/getAvailableMinutesUntilNextBlock again
        }
      }
    }

    // Sort suggestions by start time
    return suggestions.sort((a, b) => a.suggestedStartTime.getTime() - b.suggestedStartTime.getTime());
  }

  /**
   * Get contiguous available minutes from a given time until the next resting period start or work end.
   */
  private getAvailableMinutesUntilNextBlock(time: Date): number {
    const activePeriods = this.restingPeriods.filter(p => p.isActive);
    const hour = time.getHours();
    const minute = time.getMinutes();
    const currentMinutes = hour * 60 + minute;
    const endOfDay = this.workEndHour * 60;

    let nextBlockStart = endOfDay; // default: work end

    for (const period of activePeriods) {
      const periodStart = Math.floor(period.startTime * 60);
      const periodEnd = Math.floor(period.endTime * 60);

      if (periodStart === periodEnd) continue;

      if (periodStart < periodEnd) {
        // normal period within same day
        if (periodStart > currentMinutes) {
          nextBlockStart = Math.min(nextBlockStart, periodStart);
        }
      } else {
        // period wraps past midnight (e.g., 22 -> 2)
        if (periodStart > currentMinutes) {
          nextBlockStart = Math.min(nextBlockStart, periodStart);
        }
        // if currentMinutes < periodEnd, we're inside resting; getNextAvailableTime should avoid this
      }
    }

    // Check fixed tasks for today
    const fixedTasksToday = this.tasks.filter(t => 
      !t.isCompleted && 
      this.hasSpecificSchedule(t)
    );
    
    for (const task of fixedTasksToday) {
      const startRaw = task.scheduledTime || task.startTime;
      const start = startRaw ? new Date(startRaw) : null;
      if (!start) continue;

      if (start.toDateString() === time.toDateString()) {
        const startMinutes = start.getHours() * 60 + start.getMinutes();
        if (startMinutes > currentMinutes) {
          nextBlockStart = Math.min(nextBlockStart, startMinutes);
        }
      }
    }

    return Math.max(0, nextBlockStart - currentMinutes);
  }

  /**
   * Calculate minutes remaining until end of work day
   */
  private getMinutesUntilEndOfDay(time: Date): number {
    const currentHour = time.getHours();
    const currentMinute = time.getMinutes();
    const minutesIntoDay = currentHour * 60 + currentMinute;
    const endOfDayMinutes = this.workEndHour * 60;
    
    // Account for resting periods
    let availableTime = endOfDayMinutes - minutesIntoDay;
    const activePeriods = this.restingPeriods.filter(p => p.isActive);
    
    for (const period of activePeriods) {
      const periodStart = period.startTime * 60;
      const periodEnd = period.endTime * 60;
      
      // If resting period is within remaining time, subtract it
      if (periodStart >= minutesIntoDay && periodStart < endOfDayMinutes) {
        const restDuration = Math.min(periodEnd, endOfDayMinutes) - periodStart;
        availableTime -= restDuration;
      }
    }
    
    return Math.max(0, availableTime);
  }

  /**
   * Sort tasks by priority (urgency and tiring level), with ongoing tasks at the top
   */
  private sortTasksByPriority(): Task[] {
    return [...this.tasks].sort((a, b) => {
      // Prioritize tasks with specific start times first (meetings/events)
      const aHasSpecific = this.hasSpecificSchedule(a);
      const bHasSpecific = this.hasSpecificSchedule(b);
      if (aHasSpecific !== bHasSpecific) {
        return aHasSpecific ? -1 : 1;
      }

      // If both have specific times, sort by start time
      if (aHasSpecific && bHasSpecific) {
        const aStart = a.startTime ? new Date(a.startTime) : (a.startDate ? new Date(a.startDate) : new Date(0));
        const bStart = b.startTime ? new Date(b.startTime) : (b.startDate ? new Date(b.startDate) : new Date(0));
        const timeDiff = aStart.getTime() - bStart.getTime();
        if (timeDiff !== 0) return timeDiff;
      }

      // Prioritize ongoing tasks
      if (a.isOngoing !== b.isOngoing) {
        return a.isOngoing ? -1 : 1;
      }

      // Prioritize overdue tasks
      const now = new Date();
      const aOverdue = !a.isCompleted && now > new Date(a.deadline);
      const bOverdue = !b.isCompleted && now > new Date(b.deadline);
      if (aOverdue !== bOverdue) return aOverdue ? -1 : 1;

      // First, sort by urgency (critical > high > medium > low)
      const urgencyOrder: Record<string, number> = {
        'critical': 0,
        'high': 1,
        'medium': 2,
        'low': 3,
      };
      const urgencyDiff = urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
      if (urgencyDiff !== 0) return urgencyDiff;

      // Then, sort by deadline (earlier deadlines first)
      const deadlineDiff = new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      if (deadlineDiff !== 0) return deadlineDiff;

      // Finally by tiring level (do harder tasks first when energy is high)
      const tiringOrder: Record<TiringLevel, number> = {
        'very-high': 0,
        'high': 1,
        'medium-high': 2,
        'medium': 3,
        'low-medium': 4,
        'low': 5,
      };
      return tiringOrder[a.tiringLevel] - tiringOrder[b.tiringLevel];
    });
  }

  /**
   * Schedule a chunk of a task for a given duration (minutes).
   * If the task is being split, set `isPartial` to true so reasoning reflects it.
   */
  private scheduleTaskChunk(task: Task, startTime: Date, durationMinutes: number, isPartial = false): ScheduleSuggestion {
    const suggestedStartTime = new Date(startTime);
    const suggestedEndTime = new Date(
      startTime.getTime() + durationMinutes * 60000
    );

    // Generate reasoning with partial info
    const reasoning = this.generateReasoning(task, suggestedStartTime, isPartial, durationMinutes);

    return {
      task,
      suggestedStartTime,
      suggestedEndTime,
      reasoning,
    };
  }

  /**
   * Generate human-readable reasoning for the schedule
   */
  private generateReasoning(task: Task, startTime: Date, isPartial = false, chunkDurationMinutes?: number): string {
    const now = new Date();
    const hoursUntilDeadline = Math.floor(
      (new Date(task.deadline).getTime() - now.getTime()) / (1000 * 60 * 60)
    );

    let reasoning = `Scheduled for ${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} `;

    // Overdue tasks get explicit reasoning
    if (!task.isCompleted && now > task.deadline) {
      reasoning += `because this task is overdue. `;
    } else if (hoursUntilDeadline < 24) {
      reasoning += `due to urgent deadline. `;
    } else if (hoursUntilDeadline < 72) {
      reasoning += `to meet upcoming deadline. `;
    }

    if (task.tiringLevel === 'very-high' || task.tiringLevel === 'high') {
      reasoning += `Placed when energy levels are highest. `;
    } else if (task.tiringLevel === 'low' || task.tiringLevel === 'low-medium') {
      reasoning += `Good for maintaining productivity flow. `;
    }

    if (isPartial && typeof chunkDurationMinutes === 'number') {
      const remaining = Math.max(0, task.estimatedDuration - chunkDurationMinutes);
      const hrs = Math.floor(chunkDurationMinutes / 60);
      const mins = chunkDurationMinutes % 60;
      const partStr = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
      reasoning += `This schedules ${partStr} now and continues later.`;
    }

    return reasoning.trim();
  }

  /**
   * Calculate total free time in a day
   */
  static calculateFreeTime(tasks: Task[]): number {
    const totalWorkMinutes = (DEFAULT_WORK_HOURS.end - DEFAULT_WORK_HOURS.start) * 60;
    const totalTaskMinutes = tasks
      .filter(t => !t.isCompleted)
      .reduce((sum, task) => {
        const recoveryTime = ENERGY_RECOVERY_TIME[task.tiringLevel];
        return sum + task.estimatedDuration + recoveryTime;
      }, 0);

    return Math.max(0, totalWorkMinutes - totalTaskMinutes);
  }
}

/**
 * Format duration in minutes to readable string
 */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

/**
 * Get color for tiring level
 */
export function getTiringLevelColor(level: TiringLevel): string {
  const colors: Record<TiringLevel, string> = {
    'low': '#4caf50',
    'low-medium': '#66bb6a',
    'medium': '#ff9800',
    'medium-high': '#ef5350',
    'high': '#f44336',
    'very-high': '#9c27b0',
  };
  return colors[level];
}

/**
 * Check if task is overdue
 */
export function isTaskOverdue(task: Task): boolean {
  return !task.isCompleted && new Date() > new Date(task.deadline);
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
