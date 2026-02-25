import { 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format, 
  isWithinInterval, 
  startOfMonth, 
  endOfMonth,
  differenceInCalendarDays
} from 'date-fns';

/**
 * Calculate consistency for session-based habits
 * Goal: Minutes per week
 */
export const calculateSessionConsistency = (habit, interval) => {
  const { entries, goal } = habit;
  const totalMinutes = entries
    .filter(e => isWithinInterval(new Date(e.timestamp), interval))
    .reduce((acc, e) => acc + (e.duration || 0), 0);

  const weeklyGoal = goal.target;
  const daysInInterval = differenceInCalendarDays(interval.end, interval.start) + 1;
  const adjustedGoal = (weeklyGoal / 7) * daysInInterval;

  return Math.min(100, Math.round((totalMinutes / adjustedGoal) * 100));
};

/**
 * Calculate consistency for incremental habits (Hydration)
 * Goal: Count per day
 */
export const calculateIncrementalConsistency = (habit, interval) => {
  const { entries, goal } = habit;
  const days = eachDayOfInterval(interval);
  
  const dailyPercentages = days.map(day => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const entry = entries.find(e => e.date === dateStr);
    const count = entry ? entry.count : 0;
    return Math.min(100, (count / goal.target) * 100);
  });

  const sum = dailyPercentages.reduce((acc, p) => acc + p, 0);
  return Math.round(sum / days.length);
};

/**
 * Calculate consistency for manual entry habits (Journal)
 * Goal: Frequency-based (distinct days)
 */
export const calculateManualConsistency = (habit, interval) => {
  const { entries, goal } = habit;
  const daysInInterval = differenceInCalendarDays(interval.end, interval.start) + 1;
  const weeklyGoal = goal.target;
  const adjustedGoal = (weeklyGoal / 7) * daysInInterval;

  const distinctDays = new Set(
    entries
      .filter(e => isWithinInterval(new Date(e.timestamp), interval))
      .map(e => e.date)
  ).size;

  return Math.min(100, Math.round((distinctDays / adjustedGoal) * 100));
};

/**
 * Generic dispatcher for habit consistency
 */
export const calculateHabitConsistency = (habit, intervalType = 'weekly') => {
  const now = new Date();
  let interval;

  if (intervalType === 'weekly') {
    interval = { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) };
  } else if (intervalType === 'monthly') {
    interval = { start: startOfMonth(now), end: endOfMonth(now) };
  } else {
    // Default to last 7 days
    interval = { start: subDays(now, 6), end: now };
  }

  if (habit.type === 'session') return calculateSessionConsistency(habit, interval);
  if (habit.type === 'incremental') return calculateIncrementalConsistency(habit, interval);
  if (habit.type === 'manual') return calculateManualConsistency(habit, interval);
  return 0; // Streak habits don't have consistency %
};

/**
 * Overall consistency score
 */
export const calculateOverallConsistency = (habits, intervalType = 'weekly') => {
  const scoreableHabits = habits.filter(h => h.active && h.type !== 'streak');
  if (scoreableHabits.length === 0) return 0;

  const scores = scoreableHabits.map(h => calculateHabitConsistency(h, intervalType));
  const sum = scores.reduce((acc, s) => acc + s, 0);
  return Math.round(sum / scoreableHabits.length);
};

/**
 * Get color for heatmap based on percentage
 */
export const getHeatMapColor = (percentage) => {
  if (percentage === 0) return 'var(--color-bg-surface)';

  // Interpolation logic
  const interpolate = (start, end, t) => {
    return Math.round(start + (end - start) * t);
  };

  const r = { r: 239, g: 68, b: 68 };   // #EF4444 (red)
  const y = { r: 251, g: 191, b: 36 };  // #FBBF24 (yellow)
  const g = { r: 74, g: 222, b: 128 };  // #4ADE80 (green)

  let color;
  if (percentage <= 50) {
    const t = percentage / 50;
    color = {
      r: interpolate(r.r, y.r, t),
      g: interpolate(r.g, y.g, t),
      b: interpolate(r.b, y.b, t)
    };
  } else {
    const t = (percentage - 50) / 50;
    color = {
      r: interpolate(y.r, g.r, t),
      g: interpolate(y.g, g.g, t),
      b: interpolate(y.b, g.b, t)
    };
  }

  return `rgb(${color.r}, ${color.g}, ${color.b})`;
};
