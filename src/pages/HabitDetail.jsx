import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import TopNav from '../components/navigation/TopNav';
import Button from '../components/buttons/Button';
import SegmentedPicker from '../components/inputs/SegmentedPicker';
import CircularProgress from '../components/progress/CircularProgress';
import ProgressBar from '../components/progress/ProgressBar';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import BottomSheet from '../components/navigation/BottomSheet';
import TextInput from '../components/inputs/TextInput';
import TextArea from '../components/inputs/TextArea';
import Slider from '../components/inputs/Slider';
import DatePicker from '../components/inputs/DatePicker';
import TimePicker from '../components/inputs/TimePicker';
import { calculateHabitConsistency } from '../utils/calculations';
import { format, subDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';

// Icons
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import RemoveIcon from '@mui/icons-material/Remove';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const HabitDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { habits, activeSessions, startSession, stopSession, addEntry, updateHabit } = useApp();
  
  const habit = habits.find(h => h.id === id);
  const isActive = !!activeSessions[id];
  const activeSession = activeSessions[id];

  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  const [calendarView, setCalendarView] = useState('week');
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [resetNotes, setResetNotes] = useState('');
  
  // Timer logic
  useEffect(() => {
    let interval;
    if (isActive && activeSession) {
      interval = setInterval(() => {
        const now = Date.now();
        const start = activeSession.startTimestamp;
        const diff = now - start;
        const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
        const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
        const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
        setElapsedTime(`${h}:${m}:${s}`);
      }, 1000);
    } else {
      setElapsedTime("00:00:00");
    }
    return () => clearInterval(interval);
  }, [isActive, activeSession]);

  if (!habit) return <div className="p-8 text-center">Habit not found</div>;

  const handleAction = () => {
    if (habit.type === 'session') {
      if (isActive) {
        setIsEntryModalOpen(true);
      } else {
        startSession(id);
      }
    } else if (habit.type === 'streak') {
      setIsResetModalOpen(true);
    }
  };

  const handleIncrement = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const existingEntry = habit.entries.find(e => e.date === today);
    const currentCount = existingEntry ? existingEntry.count : 0;
    addEntry(id, {
      id: existingEntry ? existingEntry.id : crypto.randomUUID(),
      date: today,
      count: currentCount + 1,
      timestamp: Date.now()
    });
  };

  const handleDecrement = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const existingEntry = habit.entries.find(e => e.date === today);
    const currentCount = existingEntry ? existingEntry.count : 0;
    if (currentCount > 0) {
      addEntry(id, {
        id: existingEntry.id,
        date: today,
        count: currentCount - 1,
        timestamp: Date.now()
      });
    }
  };

  const handleResetStreak = () => {
    const currentStreak = habit.currentStreak;
    const longestStreak = Math.max(habit.longestStreak, currentStreak);
    
    updateHabit(id, {
      currentStreak: 0,
      longestStreak,
      streakStartDate: format(new Date(), 'yyyy-MM-dd'),
      resets: [
        ...habit.resets,
        {
          id: crypto.randomUUID(),
          date: format(new Date(), 'yyyy-MM-dd'),
          streakBroken: currentStreak,
          notes: resetNotes,
          timestamp: Date.now()
        }
      ]
    });
    setResetNotes('');
    setIsResetModalOpen(false);
  };

  const handleAddPhoto = (photoData) => {
    const updatedHabit = { ...habit };
    if (!updatedHabit.bodyTransformation.photos) updatedHabit.bodyTransformation.photos = [];
    updatedHabit.bodyTransformation.photos.push(photoData);
    updateHabit(id, updatedHabit);
    setIsPhotoModalOpen(false);
  };

  // Stats calculation
  const getWeeklyStats = () => {
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

  const consistency = habit.type === 'streak' ? '—' : `${calculateHabitConsistency(habit, 'weekly')}%`;
  const monthlyConsistency = habit.type === 'streak' ? '—' : `${calculateHabitConsistency(habit, 'monthly')}%`;

  return (
    <div className="bg-bg-primary min-h-screen text-text-primary pb-24">
      <TopNav title={habit.name} showBack />

      <main className="px-6 space-y-10 py-8">
        {/* Primary Action Section */}
        <section className="flex flex-col items-center">
          {habit.type === 'session' ? (
            isActive ? (
              <div className="flex flex-col items-center space-y-6 w-full">
                <CircularProgress progress={50} size={220} strokeWidth={14} color={`var(--color-habit-${habit.color})`}>
                  <div className="text-center">
                    <div className="text-[32px] font-heading font-semibold">{elapsedTime}</div>
                    <div className="text-sm text-text-secondary font-body">
                      Started: {format(new Date(activeSession.startTime), 'p')}
                    </div>
                  </div>
                </CircularProgress>
                <Button variant="danger" onClick={handleAction} className="w-full" icon={StopIcon}>
                  Stop Session
                </Button>
              </div>
            ) : (
              <Button variant="primary" onClick={handleAction} className="w-full" icon={PlayArrowIcon}>
                Start Session
              </Button>
            )
          ) : habit.type === 'incremental' ? (
            <div className="flex flex-col items-center space-y-6 w-full">
              <div className="text-center">
                <motion.div 
                  key={habit.entries.find(e => e.date === format(new Date(), 'yyyy-MM-dd'))?.count || 0}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-[48px] font-heading font-semibold"
                >
                  {habit.entries.find(e => e.date === format(new Date(), 'yyyy-MM-dd'))?.count || 0} / {habit.goal.target}
                </motion.div>
                <div className="text-lg text-text-secondary font-body uppercase tracking-wider">{habit.goal.unit}</div>
              </div>
              <div className="flex gap-6 w-full max-w-[240px]">
                <Button variant="secondary" onClick={handleDecrement} className="flex-1" icon={RemoveIcon} />
                <Button variant="primary" onClick={handleIncrement} className="flex-1" icon={AddIcon} />
              </div>
              <ProgressBar 
                progress={((habit.entries.find(e => e.date === format(new Date(), 'yyyy-MM-dd'))?.count || 0) / habit.goal.target) * 100} 
                variant="large"
                color={`var(--color-habit-${habit.color})`}
              />
            </div>
          ) : habit.type === 'streak' ? (
            <div className="flex flex-col items-center space-y-8 w-full">
              <div className="text-center">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[48px] font-heading font-semibold text-accent-primary"
                >
                  {habit.currentStreak} days 🔥
                </motion.div>
                <div className="text-lg text-text-secondary font-body">Best: {habit.longestStreak} days</div>
              </div>
              <Button variant="secondary" onClick={handleAction} className="w-full" icon={HeartBrokenIcon}>
                Reset Streak
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-6 w-full">
              <div className="text-center">
                <div className="text-lg text-text-secondary font-body">
                  {new Set(habit.entries.filter(e => {
                    const d = new Date(e.timestamp);
                    return d >= startOfWeek(new Date(), { weekStartsOn: 1 });
                  }).map(e => e.date)).size} / {habit.goal.target} entries this week
                </div>
              </div>
              <ProgressBar 
                progress={(new Set(habit.entries.filter(e => {
                  const d = new Date(e.timestamp);
                  return d >= startOfWeek(new Date(), { weekStartsOn: 1 });
                }).map(e => e.date)).size / habit.goal.target) * 100} 
                variant="large"
                color={`var(--color-habit-${habit.color})`}
              />
            </div>
          )}
        </section>

        {/* Body Transformation Section (Workout only) */}
        {habit.id === 'workout' && habit.bodyTransformation?.enabled && (
          <section className="space-y-4">
            <h3 className="text-h3 font-heading font-semibold">Body Transformation</h3>
            <div className="bg-bg-surface p-6 rounded-card border border-border-divider space-y-4">
              <div className="flex gap-4 overflow-x-auto pb-2">
                {habit.bodyTransformation.photos?.length > 0 ? (
                  habit.bodyTransformation.photos.map((photo, i) => (
                    <div key={i} className="flex-shrink-0 w-24 space-y-1">
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-bg-elevated">
                        <img src={photo.imageData} alt="Progress" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-[10px] font-body text-text-secondary text-center">
                        {format(new Date(photo.timestamp), 'MMM d')} • {photo.weight}{photo.weightUnit}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full py-4 text-center text-sm text-text-placeholder italic">No progress photos yet</div>
                )}
              </div>
              <Button variant="secondary" onClick={() => setIsPhotoModalOpen(true)} className="w-full" icon={CameraAltIcon}>
                Upload Progress Photo
              </Button>
              {habit.bodyTransformation.photos?.length > 1 && (
                <div className="pt-4 border-t border-border-divider">
                  <h4 className="text-caption text-text-secondary uppercase tracking-wider font-body mb-4">Weight Trend</h4>
                  <div className="h-[120px]">
                    <LineChart 
                      data={habit.bodyTransformation.photos.map(p => ({ 
                        name: format(new Date(p.timestamp), 'MM/dd'), 
                        value: p.weight 
                      }))} 
                      color="var(--color-habit-workout)" 
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Consistency Calendar Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-h3 font-heading font-semibold">Consistency</h3>
            <SegmentedPicker 
              options={[{ label: 'Week', value: 'week' }, { label: 'Month', value: 'month' }]}
              value={calendarView}
              onChange={setCalendarView}
              className="w-32"
            />
          </div>
          <div className="bg-bg-surface p-4 rounded-card border border-border-divider">
            <div className="grid grid-cols-7 gap-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => (
                <div key={d} className="text-center text-[10px] text-text-secondary mb-2 font-body">{d}</div>
              ))}
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className={`aspect-square rounded-sm flex items-center justify-center text-xs ${i === 2 ? 'bg-accent-primary/20 border border-accent-primary' : 'bg-border-default'}`}>
                  {i + 23}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="space-y-4">
          <h3 className="text-h3 font-heading font-semibold">Statistics</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'This week', value: consistency },
              { label: 'This month', value: monthlyConsistency },
              { label: habit.type === 'streak' ? 'Longest' : 'Avg / day', value: habit.type === 'streak' ? `${habit.longestStreak}d` : '25m' },
              { label: 'Total entries', value: habit.type === 'streak' ? habit.resets.length : habit.entries.length },
            ].map(stat => (
              <div key={stat.label} className="bg-bg-surface p-4 rounded-card border border-border-divider">
                <div className="text-h2 font-heading font-semibold text-accent-primary">{stat.value}</div>
                <div className="text-xs text-text-secondary font-body uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="bg-bg-surface p-6 rounded-card border border-border-divider">
            <h4 className="text-caption text-text-secondary uppercase tracking-wider font-body mb-4">Last 7 Days</h4>
            <BarChart data={getWeeklyStats()} color={`var(--color-habit-${habit.color})`} />
          </div>
        </section>

        <Button variant="secondary" onClick={() => navigate(`/logs/${id}`)} className="w-full" icon={ListAltIcon}>
          View Logs
        </Button>
      </main>

      {/* FAB - except for No-Fap */}
      {habit.type !== 'streak' && (
        <Button variant="fab" icon={AddIcon} onClick={() => setIsEntryModalOpen(true)} />
      )}

      {/* Photo Upload Modal */}
      <BottomSheet 
        isOpen={isPhotoModalOpen} 
        onClose={() => setIsPhotoModalOpen(false)}
        title="Upload Progress Photo"
      >
        <PhotoUploadForm 
          habit={habit}
          onSave={handleAddPhoto}
          onCancel={() => setIsPhotoModalOpen(false)}
        />
      </BottomSheet>

      {/* Reset Streak Modal */}
      <BottomSheet 
        isOpen={isResetModalOpen} 
        onClose={() => setIsResetModalOpen(false)}
        title="Reset your streak?"
      >
        <div className="space-y-6">
          <motion.div 
            animate={{ x: [-5, 5, -3, 3, 0] }}
            transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 3 }}
            className="text-center space-y-1"
          >
            <div className="text-h2 font-heading font-semibold text-accent-primary">Current: {habit.currentStreak} days</div>
            <div className="text-sm text-text-secondary font-body italic">How are you feeling? What led to this?</div>
          </motion.div>
          <TextArea 
            placeholder="Write something..." 
            value={resetNotes}
            onChange={e => setResetNotes(e.target.value)}
          />
          <div className="flex flex-col gap-3">
            <Button variant="danger" onClick={handleResetStreak}>Reset Streak</Button>
            <Button variant="secondary" onClick={() => setIsResetModalOpen(false)}>Cancel</Button>
          </div>
        </div>
      </BottomSheet>

      {/* Manual Entry Modal / Stop Session Modal */}
      <BottomSheet
        isOpen={isEntryModalOpen}
        onClose={() => setIsEntryModalOpen(false)}
        title={isActive ? "Session Ended" : "Add Entry"}
      >
        <ManualEntryForm 
          habit={habit}
          activeSession={activeSession}
          onSave={(entry) => {
            if (isActive) {
              stopSession(id, entry);
            } else {
              addEntry(id, entry);
            }
            setIsEntryModalOpen(false);
          }}
          onCancel={() => setIsEntryModalOpen(false)}
        />
      </BottomSheet>
    </div>
  );
};

const PhotoUploadForm = ({ habit, onSave, onCancel }) => {
  const [date, setDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [weight, setWeight] = useState('');
  const [imageData, setImageData] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!imageData) return alert("Please select a photo");
    onSave({
      id: crypto.randomUUID(),
      date: format(date, 'yyyy-MM-dd'),
      imageData,
      weight: parseFloat(weight),
      weightUnit: "kg",
      timestamp: date.getTime()
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div onClick={() => setIsDatePickerOpen(true)} className="cursor-pointer">
          <TextInput label="Date" value={format(date, 'PPP')} readOnly />
        </div>
        
        <div className="space-y-2">
          <p className="text-caption text-text-secondary uppercase tracking-wider font-body">Photo</p>
          {imageData ? (
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-bg-elevated">
              <img src={imageData} alt="Preview" className="w-full h-full object-cover" />
              <button 
                onClick={() => setImageData(null)}
                className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full"
              >
                Change
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-border-default rounded-xl cursor-pointer hover:border-accent-primary transition-colors">
              <CameraAltIcon className="text-text-placeholder !text-[48px]" />
              <span className="text-sm text-text-secondary mt-2">Tap to take or choose photo</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
          )}
        </div>

        <TextInput 
          label="Weight" 
          placeholder="Enter current weight" 
          unit="kg" 
          type="number"
          value={weight}
          onChange={e => setWeight(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Button variant="primary" onClick={handleSave} disabled={!imageData || !weight}>Save Photo</Button>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>

      <DatePicker isOpen={isDatePickerOpen} onClose={() => setIsDatePickerOpen(false)} value={date} onChange={setDate} />
    </div>
  );
};

const ManualEntryForm = ({ habit, activeSession, onSave, onCancel }) => {
  const [date, setDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isStartTimeOpen, setIsStartTimeOpen] = useState(false);
  const [isEndTimeOpen, setIsEndTimeOpen] = useState(false);
  
  const [startTime, setStartTime] = useState(activeSession ? new Date(activeSession.startTime) : new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [duration, setDuration] = useState(
    activeSession 
      ? Math.round((new Date() - new Date(activeSession.startTime)) / (1000 * 60))
      : 30
  );
  const [notes, setNotes] = useState('');
  
  // Habit-specific fields
  const [workoutType, setWorkoutType] = useState('');
  const [intensity, setIntensity] = useState('Normal');
  const [quality, setQuality] = useState(7);
  const [workType, setWorkType] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [count, setCount] = useState(1);
  const [journalType, setJournalType] = useState('text');

  useEffect(() => {
    if (!activeSession) {
      const diff = Math.round((endTime - startTime) / (1000 * 60));
      setDuration(diff > 0 ? diff : 0);
    }
  }, [startTime, endTime, activeSession]);

  const handleSave = () => {
    const entry = {
      id: crypto.randomUUID(),
      date: format(date, 'yyyy-MM-dd'),
      timestamp: Date.now(),
      notes,
      ...(habit.type === 'session' && {
        startTime: format(startTime, 'HH:mm'),
        endTime: format(endTime, 'HH:mm'),
        duration: parseInt(duration),
        ...(habit.id === 'workout' && { workoutType, intensity }),
        ...(habit.id === 'sleep' && { quality }),
        ...(habit.id === 'work' && { workType }),
        ...(habit.id === 'reading' && { bookTitle }),
      }),
      ...(habit.type === 'incremental' && { count: parseInt(count) }),
      ...(habit.type === 'manual' && { type: journalType, content: notes })
    };

    onSave(entry);
  };

  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
      <div className="space-y-4">
        <div onClick={() => setIsDatePickerOpen(true)} className="cursor-pointer">
          <TextInput label="Date" value={format(date, 'PPP')} readOnly />
        </div>

        {habit.type === 'session' && (
          <>
            <div className="flex gap-4">
              <div onClick={() => setIsStartTimeOpen(true)} className="flex-1 cursor-pointer">
                <TextInput label="Start Time" value={format(startTime, 'p')} readOnly />
              </div>
              <div onClick={() => setIsEndTimeOpen(true)} className="flex-1 cursor-pointer">
                <TextInput label="End Time" value={format(endTime, 'p')} readOnly />
              </div>
            </div>
            <TextInput 
              label="Duration (minutes)" 
              type="number" 
              value={duration} 
              onChange={e => setDuration(e.target.value)} 
            />

            {habit.id === 'workout' && (
              <>
                <TextInput label="Workout Type" placeholder="Cardio, Strength, etc." value={workoutType} onChange={e => setWorkoutType(e.target.value)} />
                <div className="space-y-2">
                  <p className="text-caption text-text-secondary uppercase tracking-wider font-body">Intensity</p>
                  <SegmentedPicker 
                    options={[
                      { label: 'Light', value: 'Light' },
                      { label: 'Normal', value: 'Normal' },
                      { label: 'Heavy', value: 'Heavy' },
                      { label: 'Extreme', value: 'Extreme' }
                    ]}
                    value={intensity}
                    onChange={setIntensity}
                  />
                </div>
              </>
            )}

            {habit.id === 'sleep' && (
              <Slider 
                label="Quality" 
                min={1} max={10} 
                value={quality} 
                onChange={setQuality} 
                leftLabel="Poor" 
                rightLabel="Excellent" 
              />
            )}

            {habit.id === 'work' && (
              <TextInput label="Work Type" placeholder="Deep work, Meetings, etc." value={workType} onChange={e => setWorkType(e.target.value)} />
            )}

            {habit.id === 'reading' && (
              <TextInput label="Book Title" placeholder="What are you reading?" value={bookTitle} onChange={e => setBookTitle(e.target.value)} />
            )}
          </>
        )}

        {habit.type === 'incremental' && (
          <TextInput 
            label={`Amount (${habit.goal.unit})`} 
            type="number" 
            value={count} 
            onChange={e => setCount(e.target.value)} 
          />
        )}

        {habit.type === 'manual' && (
          <div className="space-y-2">
            <p className="text-caption text-text-secondary uppercase tracking-wider font-body">Entry Type</p>
            <SegmentedPicker 
              options={[{ label: 'Text', value: 'text' }, { label: 'Photo', value: 'photo' }]}
              value={journalType}
              onChange={setJournalType}
            />
          </div>
        )}

        <TextArea 
          label={habit.type === 'manual' ? "Journal Entry" : "Notes (Optional)"} 
          placeholder={habit.type === 'manual' ? "Write anything..." : "How did it go?"}
          value={notes} 
          onChange={e => setNotes(e.target.value)} 
        />
      </div>

      <div className="flex flex-col gap-3 pb-4">
        <Button variant="primary" onClick={handleSave}>{activeSession ? "Save Session" : "Save Entry"}</Button>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>

      <DatePicker isOpen={isDatePickerOpen} onClose={() => setIsDatePickerOpen(false)} value={date} onChange={setDate} />
      <TimePicker isOpen={isStartTimeOpen} onClose={() => setIsStartTimeOpen(false)} value={startTime} onChange={setStartTime} />
      <TimePicker isOpen={isEndTimeOpen} onClose={() => setIsEndTimeOpen(false)} value={endTime} onChange={setEndTime} />
    </div>
  );
};

export default HabitDetail;
