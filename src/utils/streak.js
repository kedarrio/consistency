import { differenceInCalendarDays, parseISO, format } from 'date-fns';

export const updateStreaks = (habits) => {
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');

  return habits.map(habit => {
    if (habit.type !== 'streak') return habit;

    if (!habit.streakStartDate) {
      return {
        ...habit,
        streakStartDate: todayStr,
        currentStreak: 0
      };
    }

    const startDate = parseISO(habit.streakStartDate);
    const daysElapsed = differenceInCalendarDays(today, startDate);
    
    // The current streak is the number of days elapsed since the start date
    // provided no resets have happened (resets would have updated streakStartDate)
    const newStreak = Math.max(0, daysElapsed);

    return {
      ...habit,
      currentStreak: newStreak,
      longestStreak: Math.max(habit.longestStreak || 0, newStreak)
    };
  });
};
