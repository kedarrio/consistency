import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import TopNav from '../components/navigation/TopNav';
import Button from '../components/buttons/Button';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  isAfter
} from 'date-fns';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Calendar = () => {
  const { habits } = useApp();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const getDayConsistency = (date) => {
    // Placeholder logic for heatmap color
    // In a real app, calculate consistency % for all active habits on this day
    const dateStr = format(date, 'yyyy-MM-dd');
    const hasData = habits.some(h => h.entries.some(e => e.date === dateStr));
    if (!hasData) return 0;
    return 75; // Placeholder %
  };

  const getHeatMapColor = (percentage) => {
    if (percentage === 0) return 'var(--color-bg-surface)';
    if (percentage < 33) return 'rgba(239, 68, 68, 0.4)'; // Red-ish
    if (percentage < 67) return 'rgba(251, 191, 36, 0.6)'; // Yellow-ish
    return 'rgba(74, 222, 128, 0.8)'; // Green-ish
  };

  const selectedDayEntries = habits.flatMap(h => 
    h.entries.filter(e => e.date === format(selectedDate, 'yyyy-MM-dd')).map(e => ({ ...e, habitName: h.name, habitColor: h.color }))
  );

  return (
    <div className="bg-bg-primary min-h-screen text-text-primary pb-24">
      <TopNav title="Calendar" />

      <main className="px-6 py-6 space-y-8">
        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <button onClick={prevMonth} className="p-2 text-text-secondary">
            <ChevronLeftIcon />
          </button>
          <h2 className="text-2xl font-heading font-semibold">
            {format(currentMonth, 'MMMM yyyy')}
          </h2>
          <button onClick={nextMonth} className="p-2 text-text-secondary">
            <ChevronRightIcon />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="bg-bg-surface p-4 rounded-card border border-border-divider shadow-card">
          <div className="grid grid-cols-7 gap-1.5 mb-2">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(day => (
              <div key={day} className="text-center text-[12px] text-text-secondary font-body py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {calendarDays.map((day, idx) => {
              const percentage = getDayConsistency(day);
              const isToday = isSameDay(day, new Date());
              const isSelected = isSameDay(day, selectedDate);
              const isCurrentMonth = isSameMonth(day, monthStart);
              const isFuture = isAfter(day, new Date());

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedDate(day)}
                  className={`relative aspect-square rounded-md flex items-center justify-center cursor-pointer transition-all ${
                    !isCurrentMonth ? 'opacity-20' : ''
                  } ${isFuture ? 'opacity-40 cursor-default' : ''}`}
                  style={{ 
                    backgroundColor: getHeatMapColor(percentage),
                    border: isSelected ? '2px solid var(--color-accent-primary)' : isToday ? '2px solid white' : 'none'
                  }}
                >
                  <span className={`text-[13px] font-body ${isCurrentMonth ? 'text-white' : 'text-text-placeholder'}`}>
                    {format(day, 'd')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Day Highlights Card */}
        <section className="bg-bg-surface p-6 rounded-card border border-border-divider space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-heading font-semibold">{format(selectedDate, 'eeee, MMMM d')}</h3>
              <p className="text-sm text-text-secondary font-body mt-1">{selectedDayEntries.length} habits tracked</p>
            </div>
            <div className="text-[48px] font-heading font-semibold text-status-success leading-none">75%</div>
          </div>

          <div className="space-y-3 pt-4 border-t border-border-divider">
            {selectedDayEntries.length > 0 ? (
              selectedDayEntries.map((entry, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `var(--color-habit-${entry.habitColor})` }} />
                  <span className="font-body text-sm text-text-primary">{entry.habitName}:</span>
                  <span className="font-body text-sm text-text-secondary">
                    {entry.duration ? `${entry.duration} min` : entry.count ? `${entry.count} units` : 'Logged'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-text-placeholder italic font-body">No activity logged for this day.</p>
            )}
          </div>
          
          <Button variant="secondary" className="w-full mt-2" onClick={() => navigate(`/day/${format(selectedDate, 'yyyy-MM-dd')}`)}>
            View More →
          </Button>
        </section>
      </main>
    </div>
  );
};

export default Calendar;
