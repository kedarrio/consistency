import React from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth } from 'date-fns';
import HeatMapCell from './HeatMapCell';

const CalendarGrid = ({ currentMonth, selectedDate, onDateClick, getDayConsistency }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="bg-bg-surface p-4 rounded-card border border-border-divider shadow-card">
      <div className="grid grid-cols-7 gap-1.5 mb-2">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(day => (
          <div key={day} className="text-center text-[12px] text-text-secondary font-body py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {calendarDays.map((day, idx) => (
          <HeatMapCell
            key={idx}
            date={day}
            percentage={getDayConsistency(day)}
            isSelected={selectedDate && day.getTime() === selectedDate.getTime()}
            isCurrentMonth={isSameMonth(day, monthStart)}
            onClick={onDateClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
