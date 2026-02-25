import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useApp } from '../context/AppContext';
import HabitCard from '../components/cards/HabitCard';
import CircularProgress from '../components/progress/CircularProgress';
import Button from '../components/buttons/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useCelebration } from '../hooks/useCelebration';
import { HabitCardSkeleton } from '../components/progress/Skeleton';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, habits, settings, setSettings, getOverallConsistency } = useApp();
  const { triggerConfetti } = useCelebration();
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [orderedHabits, setOrderedHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated loading state for skeleton demonstration
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Initialize ordered habits based on settings or default habits
  useEffect(() => {
    const activeHabits = habits.filter(h => h.active);
    if (settings.cardOrder && settings.cardOrder.length > 0) {
      const sorted = [...activeHabits].sort((a, b) => {
        const indexA = settings.cardOrder.indexOf(a.id);
        const indexB = settings.cardOrder.indexOf(b.id);
        if (indexA === -1 && indexB === -1) return 0;
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
      });
      setOrderedHabits(sorted);
    } else {
      setOrderedHabits(activeHabits);
    }
  }, [habits, settings.cardOrder]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(orderedHabits);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setOrderedHabits(items);
    
    const newOrder = items.map(h => h.id);
    setSettings({ ...settings, cardOrder: newOrder });
  };

  const handleGoalReached = () => {
    triggerConfetti();
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-primary text-text-primary px-4 py-6 space-y-6 pb-24">
      <header className="flex justify-between items-center pt-2">
        <div className="space-y-1">
          <h1 className="text-h2 font-heading font-semibold">
            {user?.name ? `Welcome back, ${user.name}` : 'Consistency'}
          </h1>
          <p className="text-text-secondary font-body text-sm">
            {user?.promise || "One day at a time"}
          </p>
        </div>
      </header>

      {settings.display?.showConsistencyScoreOnDashboard && (
        <section className="bg-bg-surface p-6 rounded-card border border-border-default flex items-center justify-between shadow-card">
          <div className="space-y-1">
            <h2 className="text-h3 font-heading font-semibold">Overall Consistency</h2>
            <p className="text-text-secondary text-xs font-body uppercase tracking-wider">This Week</p>
          </div>
          <div className="relative">
            <CircularProgress 
              progress={getOverallConsistency()} 
              size={64} 
              strokeWidth={6} 
              color="var(--color-accent-primary)"
            />
            <div className="absolute inset-0 flex items-center justify-center text-sm font-heading font-bold text-accent-primary">
              {getOverallConsistency()}%
            </div>
          </div>
        </section>
      )}

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-h3 font-heading font-semibold">Your Habits</h2>
          <Button 
            variant="icon" 
            onClick={() => setIsReorderMode(!isReorderMode)}
            className={isReorderMode ? 'text-accent-primary' : 'text-text-secondary'}
          >
            {isReorderMode ? 'Done' : <SettingsIcon />}
          </Button>
        </div>

        {loading ? (
          <div className="space-y-3">
            <HabitCardSkeleton />
            <HabitCardSkeleton />
            <HabitCardSkeleton />
          </div>
        ) : orderedHabits.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <p className="text-text-secondary font-body">No habits selected yet.</p>
            <Button variant="primary" onClick={() => navigate('/settings')}>
              Go to Settings
            </Button>
          </div>
        ) : isReorderMode ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="habits">
              {(provided) => (
                <div 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                  className="space-y-3"
                >
                  {orderedHabits.map((habit, index) => (
                    <Draggable key={habit.id} draggableId={habit.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`flex items-center gap-3 p-4 bg-bg-surface rounded-card border transition-all duration-200 ${
                            snapshot.isDragging 
                              ? 'border-accent-primary shadow-modal scale-[1.05] z-[100]' 
                              : 'border-border-default'
                          }`}
                        >
                          <DragIndicatorIcon className="text-text-secondary" />
                          <span className="font-heading text-lg flex-1">{habit.name}</span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {orderedHabits.map(habit => (
              <HabitCard 
                key={habit.id} 
                habit={habit} 
                onGoalReached={handleGoalReached}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
