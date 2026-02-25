import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import HabitCard from '../components/cards/HabitCard';
import CircularProgress from '../components/progress/CircularProgress';
import { calculateHabitConsistency, calculateOverallConsistency } from '../utils/calculations';
import { format } from 'date-fns';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, habits, activeSessions, startSession, stopSession, addEntry, settings } = useApp();

  const activeHabits = habits.filter(h => h.active);
  const overallScore = calculateOverallConsistency(activeHabits, 'weekly');

  const handleAction = (habitId, actionType) => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    switch (actionType) {
      case 'toggle':
        if (activeSessions[habitId]) {
          stopSession(habitId);
        } else {
          startSession(habitId);
        }
        break;
      case 'increment':
        addEntry(habitId, {
          id: crypto.randomUUID(),
          date: format(new Date(), 'yyyy-MM-dd'),
          count: (habit.entries.find(e => e.date === format(new Date(), 'yyyy-MM-dd'))?.count || 0) + 1,
          timestamp: Date.now()
        });
        break;
      case 'decrement':
        const today = format(new Date(), 'yyyy-MM-dd');
        const currentCount = habit.entries.find(e => e.date === today)?.count || 0;
        if (currentCount > 0) {
          addEntry(habitId, {
            id: crypto.randomUUID(),
            date: today,
            count: currentCount - 1,
            timestamp: Date.now()
          });
        }
        break;
      case 'reset':
        navigate(`/habit/${habitId}`);
        break;
      case 'edit':
        navigate(`/habit/${habitId}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="px-6 py-6 space-y-8 pb-24">
      {/* Header */}
      <section>
        <h2 className="text-text-secondary font-body text-sm uppercase tracking-wider">
          {format(new Date(), 'eeee, MMMM d')}
        </h2>
        <h1 className="text-[32px] font-heading font-semibold mt-1">
          Welcome back, {user?.name || 'User'}
        </h1>
      </section>

      {/* Overall Consistency Score (Optional in Settings) */}
      {settings.display.showConsistencyScoreOnDashboard && (
        <section className="bg-bg-surface rounded-card p-6 flex items-center justify-between shadow-card border border-border-divider">
          <div>
            <h3 className="text-h3 font-heading font-semibold">Overall Score</h3>
            <p className="text-text-secondary text-sm font-body mt-1">Consistency this week</p>
          </div>
          <CircularProgress progress={overallScore} size={80} strokeWidth={8}>
            <span className="text-xl font-heading font-semibold text-accent-primary">
              {overallScore}%
            </span>
          </CircularProgress>
        </section>
      )}

      {/* Habit Cards */}
      <section className="space-y-4">
        <h3 className="text-caption text-text-secondary uppercase tracking-wider font-body">My Habits</h3>
        <div className="flex flex-col">
          {activeHabits.map((habit) => {
            const isActive = !!activeSessions[habit.id];
            const todayStr = format(new Date(), 'yyyy-MM-dd');
            let todayCountDisplay = "0";
            let progress = 0;

            if (habit.type === 'session') {
              const minutes = habit.entries
                .filter(e => e.date === todayStr)
                .reduce((acc, e) => acc + (e.duration || 0), 0);
              const dailyGoal = habit.goal.target / 7;
              todayCountDisplay = `${minutes}/${Math.round(dailyGoal)}m`;
              progress = Math.min(100, (minutes / dailyGoal) * 100);
            } else if (habit.type === 'incremental') {
              const count = habit.entries.find(e => e.date === todayStr)?.count || 0;
              todayCountDisplay = `${count}/${habit.goal.target}`;
              progress = Math.min(100, (count / habit.goal.target) * 100);
            } else if (habit.type === 'streak') {
              todayCountDisplay = `${habit.currentStreak} days 🔥`;
              progress = 0;
            } else if (habit.type === 'manual') {
              const hasEntry = habit.entries.some(e => e.date === todayStr);
              todayCountDisplay = hasEntry ? "Done" : "Pending";
              progress = hasEntry ? 100 : 0;
            }

            const consistency = habit.type === 'streak' ? '—' : `${calculateHabitConsistency(habit, 'weekly')}%`;

            return (
              <HabitCard
                key={habit.id}
                habit={{
                  ...habit,
                  consistency,
                  todayCount: todayCountDisplay,
                  progress
                }}
                isActive={isActive}
                onAction={(action) => handleAction(habit.id, action)}
                onClick={() => navigate(`/habit/${habit.id}`)}
              />
            );
          })}

          {activeHabits.length === 0 && (
            <div className="py-12 text-center space-y-4">
              <p className="text-text-secondary italic">No habits selected.</p>
              <Button variant="secondary" onClick={() => navigate('/settings')}>Go to Settings</Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
