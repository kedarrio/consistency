import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import TopNav from '../components/navigation/TopNav';
import SegmentedPicker from '../components/inputs/SegmentedPicker';
import CircularProgress from '../components/progress/CircularProgress';
import HabitCard from '../components/cards/HabitCard';
import BarChart from '../components/charts/BarChart';
import { useNavigate } from 'react-router-dom';
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

const Stats = () => {
  const navigate = useNavigate();
  const { habits, settings } = useApp();
  const [timeRange, setTimeRange] = useState('Weekly');

  const activeHabits = habits.filter(h => h.active);
  const scoreableHabits = activeHabits.filter(h => h.type !== 'streak');

  // Placeholder calculations - in a real app these would use utility functions from specs/calculations.md
  const overallScore = 74; 
  
  const getWeeklyStats = (habit) => {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
    
    return days.map(day => {
      const dateStr = format(day, 'yyyy-MM-dd');
      let value = 0;
      if (habit.type === 'session') {
        value = habit.entries
          .filter(e => e.date === dateStr)
          .reduce((acc, e) => acc + (e.duration || 0), 0);
      } else if (habit.type === 'incremental') {
        value = habit.entries.find(e => e.date === dateStr)?.count || 0;
      } else if (habit.type === 'manual') {
        value = habit.entries.some(e => e.date === dateStr) ? 1 : 0;
      }
      return { name: format(day, 'eeeeee')[0], value };
    });
  };

  return (
    <div className="bg-bg-primary min-h-screen text-text-primary pb-24">
      <TopNav title="Statistics" />

      <main className="px-6 py-6 space-y-8">
        <SegmentedPicker 
          options={[
            { label: 'Daily', value: 'Daily' },
            { label: 'Weekly', value: 'Weekly' },
            { label: 'Monthly', value: 'Monthly' },
            { label: 'Yearly', value: 'Yearly' },
            { label: 'All-Time', value: 'All-Time' }
          ]}
          value={timeRange}
          onChange={setTimeRange}
        />

        {/* Overall Consistency Score Card */}
        <section className="bg-bg-surface rounded-card p-8 flex flex-col items-center justify-center shadow-card border border-border-divider">
          <CircularProgress progress={overallScore} size={160} strokeWidth={12}>
            <div className="text-center">
              <div className="text-[64px] font-heading font-semibold text-accent-primary leading-none">{overallScore}%</div>
            </div>
          </CircularProgress>
          <div className="text-center mt-4">
            <div className="text-base text-text-secondary font-body">Overall consistency</div>
            <div className="text-sm text-text-placeholder font-body uppercase tracking-wider">{timeRange.toLowerCase()}</div>
          </div>
        </section>

        {/* Per-Habit Breakdown */}
        <section className="space-y-4">
          <h3 className="text-h3 font-heading font-semibold">Habit Breakdown</h3>
          <div className="space-y-4">
            {activeHabits.map(habit => (
              <div 
                key={habit.id}
                onClick={() => navigate(`/habit/${habit.id}`)}
                className="bg-bg-surface p-5 rounded-xl border border-border-divider space-y-4 cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" style={{ color: `var(--color-habit-${habit.color})` }}>
                      {habit.id === 'meditation' ? '🧘' : habit.id === 'work' ? '💼' : habit.id === 'workout' ? '💪' : habit.id === 'journal' ? '📓' : habit.id === 'noFap' ? '💔' : habit.id === 'sleep' ? '😴' : habit.id === 'reading' ? '📚' : '💧'}
                    </span>
                    <span className="text-xl font-heading font-semibold">{habit.name}</span>
                  </div>
                  <div className="text-2xl font-heading font-semibold" style={{ color: `var(--color-habit-${habit.color})` }}>
                    {habit.type === 'streak' ? `${habit.currentStreak}d` : '86%'}
                  </div>
                </div>

                {habit.type !== 'streak' && (
                  <>
                    <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: '86%', backgroundColor: `var(--color-habit-${habit.color})` }} />
                    </div>
                    <div className="flex justify-between text-xs text-text-secondary font-body">
                      <span>{habit.type === 'streak' ? 'Current streak' : 'Consistency'}</span>
                      <span>{habit.type === 'streak' ? `${habit.currentStreak} days` : 'Last 7 days'}</span>
                    </div>
                    <div className="h-[80px]">
                      <BarChart data={getWeeklyStats(habit)} color={`var(--color-habit-${habit.color})`} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        {settings.display.showAreasToImprove && (
          <section className="space-y-4">
            <h3 className="text-h3 font-heading font-semibold">Areas to Improve</h3>
            <div className="bg-bg-surface p-5 rounded-xl border border-border-divider space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-heading">Reading</span>
                  <span className="text-status-warning font-body text-sm">29%</span>
                </div>
                <p className="text-sm text-text-secondary font-body">3 more sessions needed this week to reach goal</p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Stats;
