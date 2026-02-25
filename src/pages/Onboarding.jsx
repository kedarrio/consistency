import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import OnboardingLayout from './onboarding/OnboardingLayout';
import Button from '../components/buttons/Button';
import TextInput from '../components/inputs/TextInput';
import SegmentedPicker from '../components/inputs/SegmentedPicker';
import Toggle from '../components/inputs/Toggle';
import TimePicker from '../components/inputs/TimePicker';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MeditationIcon from '@mui/icons-material/SelfImprovement';
import WorkIcon from '@mui/icons-material/Work';
import WorkoutIcon from '@mui/icons-material/FitnessCenter';
import JournalIcon from '@mui/icons-material/Edit';
import NoFapIcon from '@mui/icons-material/HeartBroken';
import SleepIcon from '@mui/icons-material/Bedtime';
import ReadingIcon from '@mui/icons-material/MenuBook';
import HydrationIcon from '@mui/icons-material/WaterDrop';

const Onboarding = () => {
  const navigate = useNavigate();
  const { setUser, setSettings, setHabits, habits: defaultHabits, setOnboardingComplete } = useApp();
  const [step, setStep] = useState(1);
  const totalSteps = 8;

  // State for all onboarding data
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Prefer not to say',
    selectedHabits: ['meditation', 'work', 'workout', 'journal', 'noFap', 'sleep', 'reading', 'hydration'],
    bodyTransformation: false,
    height: '',
    weight: '',
    photoFrequency: 'weekly',
    photoDay: 'Monday',
    weekStartDay: 'Monday',
    timeFormat: '12h',
    dayBoundary: 'midnight',
    idealBedtime: new Date(2026, 0, 1, 23, 0),
    idealWakeTime: new Date(2026, 0, 1, 7, 0),
    promise: '',
    consent: false
  });

  const [isTimePickerOpen, setIsTimePickerOpen] = useState({ type: null, open: false });

  const nextStep = () => {
    if (step === 4 && !formData.selectedHabits.includes('workout')) {
      setStep(6);
    } else if (step < totalSteps) {
      setStep(step + 1);
    } else {
      finishOnboarding();
    }
  };

  const prevStep = () => {
    if (step === 6 && !formData.selectedHabits.includes('workout')) {
      setStep(4);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const finishOnboarding = () => {
    const user = {
      name: formData.name,
      age: formData.age,
      gender: formData.gender,
      promise: formData.promise,
      onboardingComplete: true,
      onboardingDate: new Date().toISOString()
    };

    const settings = {
      weekStartDay: formData.weekStartDay,
      timeFormat: formData.timeFormat,
      dayBoundary: formData.dayBoundary,
      idealBedtime: formData.idealBedtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      idealWakeTime: formData.idealWakeTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      hydrationUnitSize: 250,
      theme: "dark",
      cardOrder: formData.selectedHabits,
      notifications: { global: true, sounds: true, perHabit: {} },
      display: { showConsistencyScoreOnDashboard: true, showAreasToImprove: true }
    };

    // Initialize habits based on selection
    const initializedHabits = defaultHabits.map(h => {
      const active = formData.selectedHabits.includes(h.id);
      if (h.id === 'workout' && active && formData.bodyTransformation) {
        return {
          ...h,
          active,
          bodyTransformation: {
            enabled: true,
            height: formData.height,
            heightUnit: "cm",
            photoFrequency: formData.photoFrequency,
            photoDay: formData.photoDay,
            photos: []
          }
        };
      }
      return { ...h, active };
    });

    setUser(user);
    setSettings(settings);
    setHabits(initializedHabits);
    setOnboardingComplete(true);
    
    // Final sequence: navigate to Promise Screen
    navigate('/promise');
  };

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const toggleHabit = (id) => {
    setFormData(prev => ({
      ...prev,
      selectedHabits: prev.selectedHabits.includes(id)
        ? prev.selectedHabits.filter(h => h !== id)
        : [...prev.selectedHabits, id]
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
            <h1 className="text-5xl font-heading font-semibold">Consistency</h1>
            <p className="text-text-secondary font-body">one day at a time</p>
            <div className="flex-1" />
            <Button onClick={nextStep} className="w-full">Continue</Button>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col h-full space-y-8">
            <h2 className="text-2xl font-heading">How it works</h2>
            <div className="space-y-6 overflow-y-auto pr-2">
              {[
                { title: 'Track Your Habits', icon: '📊', desc: 'Log activities using timers, counters, or manual entries' },
                { title: 'Set Your Goals', icon: '🎯', desc: 'Define what consistency means to you—daily, weekly, or custom' },
                { title: 'See Your Progress', icon: '📈', desc: 'Visualize consistency with charts, calendars, and statistics' },
                { title: 'Own Your Data', icon: '🔒', desc: 'Everything stored locally on your device, private and secure' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="space-y-1">
                    <h3 className="font-body font-bold">{item.title}</h3>
                    <p className="text-text-secondary text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-1" />
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.consent} 
                  onChange={e => updateFormData({ consent: e.target.checked })}
                  className="hidden"
                />
                {formData.consent ? <CheckBoxIcon className="text-accent-primary" /> : <CheckBoxOutlineBlankIcon className="text-text-secondary" />}
                <span className="text-sm text-text-secondary">
                  I accept the Privacy Policy and Terms & Conditions
                </span>
              </label>
              <Button onClick={nextStep} disabled={!formData.consent} className="w-full">Get Started</Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col h-full space-y-8">
            <h2 className="text-2xl font-heading">Tell us about yourself</h2>
            <div className="space-y-6">
              <TextInput 
                label="Name" 
                placeholder="Your name" 
                value={formData.name}
                onChange={e => updateFormData({ name: e.target.value })}
              />
              <TextInput 
                label="Age (Optional)" 
                placeholder="Your age" 
                type="number"
                value={formData.age}
                onChange={e => updateFormData({ age: e.target.value })}
              />
              <div className="space-y-2">
                <p className="text-caption text-text-secondary uppercase tracking-wider font-body">Gender (Optional)</p>
                <SegmentedPicker 
                  options={[
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Other', value: 'Other' },
                    { label: 'N/A', value: 'Prefer not to say' }
                  ]}
                  value={formData.gender}
                  onChange={val => updateFormData({ gender: val })}
                />
              </div>
            </div>
            <div className="flex-1" />
            <div className="flex gap-4">
              <Button onClick={prevStep} variant="secondary" className="flex-1">Back</Button>
              <Button onClick={nextStep} disabled={!formData.name} className="flex-1">Next</Button>
            </div>
          </div>
        );
      case 4:
        const habitsList = [
          { id: 'meditation', name: 'Meditation', desc: 'Track mindfulness sessions', icon: MeditationIcon },
          { id: 'work', name: 'Work', desc: 'Log productive time', icon: WorkIcon },
          { id: 'workout', name: 'Workout', desc: 'Monitor exercise and fitness', icon: WorkoutIcon },
          { id: 'journal', name: 'Journal', desc: 'Daily reflections and notes', icon: JournalIcon },
          { id: 'noFap', name: 'No-Fap', desc: 'Build discipline streaks', icon: NoFapIcon },
          { id: 'sleep', name: 'Sleep', desc: 'Track rest and recovery', icon: SleepIcon },
          { id: 'reading', name: 'Reading', desc: 'Log reading time', icon: ReadingIcon },
          { id: 'hydration', name: 'Hydration', desc: 'Count water intake', icon: HydrationIcon },
        ];
        return (
          <div className="flex flex-col h-full space-y-6">
            <div className="space-y-1 text-center">
              <h2 className="text-2xl font-heading">What do you want to track?</h2>
              <p className="text-text-secondary text-sm">You can change this anytime</p>
            </div>
            <div className="grid grid-cols-1 gap-3 overflow-y-auto pr-1 py-2">
              {habitsList.map((habit) => {
                const isSelected = formData.selectedHabits.includes(habit.id);
                return (
                  <div 
                    key={habit.id}
                    onClick={() => toggleHabit(habit.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      isSelected ? 'bg-bg-surface border-accent-primary' : 'bg-bg-primary border-border-default'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isSelected ? 'text-accent-primary' : 'text-text-secondary'}`}>
                      <habit.icon />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-lg">{habit.name}</h3>
                      <p className="text-text-secondary text-xs">{habit.desc}</p>
                    </div>
                    {isSelected ? <CheckBoxIcon className="text-accent-primary" /> : <CheckBoxOutlineBlankIcon className="text-text-secondary" />}
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4">
              <Button onClick={prevStep} variant="secondary" className="flex-1">Back</Button>
              <Button onClick={nextStep} disabled={formData.selectedHabits.length === 0} className="flex-1">Almost Done</Button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col h-full space-y-8">
             <div className="space-y-1">
              <h2 className="text-2xl font-heading text-center">Track your body transformation?</h2>
              <p className="text-text-secondary text-sm text-center">Upload progress photos alongside workouts</p>
            </div>
            <div className="bg-bg-surface p-6 rounded-xl space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-body">Enable Body Transformation</span>
                <Toggle 
                  isOn={formData.bodyTransformation} 
                  onToggle={val => updateFormData({ bodyTransformation: val })} 
                />
              </div>
              {formData.bodyTransformation && (
                <div className="space-y-6 pt-4 border-t border-border-divider">
                  <div className="flex gap-4">
                    <TextInput 
                      label="Height" 
                      placeholder="Height" 
                      unit="cm" 
                      type="number"
                      value={formData.height}
                      onChange={e => updateFormData({ height: e.target.value })}
                    />
                    <TextInput 
                      label="Weight" 
                      placeholder="Weight" 
                      unit="kg" 
                      type="number"
                      value={formData.weight}
                      onChange={e => updateFormData({ weight: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-caption text-text-secondary uppercase tracking-wider font-body">Photo Frequency</p>
                    <SegmentedPicker 
                      options={[
                        { label: 'Daily', value: 'daily' },
                        { label: 'Weekly', value: 'weekly' }
                      ]}
                      value={formData.photoFrequency}
                      onChange={val => updateFormData({ photoFrequency: val })}
                    />
                  </div>
                  {formData.photoFrequency === 'weekly' && (
                    <div className="space-y-2">
                      <p className="text-caption text-text-secondary uppercase tracking-wider font-body">Day selector</p>
                      <select 
                        className="w-full bg-bg-surface border border-border-default rounded-input p-3 font-body text-white"
                        value={formData.photoDay}
                        onChange={e => updateFormData({ photoDay: e.target.value })}
                      >
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex-1" />
            <div className="flex gap-4">
              <Button onClick={prevStep} variant="secondary" className="flex-1">Back</Button>
              <Button onClick={nextStep} className="flex-1">Next</Button>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="flex flex-col h-full space-y-8">
            <h2 className="text-2xl font-heading text-center">Customize your experience</h2>
            <div className="space-y-6 overflow-y-auto pr-1">
              <div className="space-y-2">
                <p className="text-caption text-text-secondary uppercase tracking-wider font-body">Week starts on</p>
                <select 
                  className="w-full bg-bg-surface border border-border-default rounded-input p-3 font-body text-white"
                  value={formData.weekStartDay}
                  onChange={e => updateFormData({ weekStartDay: e.target.value })}
                >
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <p className="text-caption text-text-secondary uppercase tracking-wider font-body">Time format</p>
                <SegmentedPicker 
                  options={[{ label: '12h', value: '12h' }, { label: '24h', value: '24h' }]}
                  value={formData.timeFormat}
                  onChange={val => updateFormData({ timeFormat: val })}
                />
              </div>
              <div className="space-y-2">
                <p className="text-caption text-text-secondary uppercase tracking-wider font-body">Day resets at</p>
                <div className="space-y-3">
                  {[
                    { label: '⏰ Strict midnight (12:00 AM)', value: 'midnight' },
                    { label: '🌙 Sleep schedule (wake time)', value: 'sleep-schedule' },
                    { label: '🌅 Custom (ideal bedtime/wake)', value: 'custom' },
                  ].map(opt => (
                    <label key={opt.value} className="flex items-center gap-3 p-4 bg-bg-surface rounded-xl cursor-pointer">
                      <input 
                        type="radio" 
                        name="dayBoundary" 
                        className="hidden" 
                        value={opt.value}
                        checked={formData.dayBoundary === opt.value}
                        onChange={e => updateFormData({ dayBoundary: e.target.value })}
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.dayBoundary === opt.value ? 'border-accent-primary' : 'border-border-default'}`}>
                        {formData.dayBoundary === opt.value && <div className="w-2.5 h-2.5 rounded-full bg-accent-primary" />}
                      </div>
                      <span className="font-body text-sm">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              {formData.dayBoundary !== 'midnight' && (
                <div className="flex gap-4 pt-2">
                  <div className="flex-1 space-y-1">
                    <p className="text-caption text-text-secondary font-body">Ideal Bedtime</p>
                    <div 
                      onClick={() => setIsTimePickerOpen({ type: 'bedtime', open: true })}
                      className="bg-bg-surface p-3 rounded-input border border-border-default text-center cursor-pointer"
                    >
                      {formData.idealBedtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-caption text-text-secondary font-body">Ideal Wake Time</p>
                    <div 
                      onClick={() => setIsTimePickerOpen({ type: 'waketime', open: true })}
                      className="bg-bg-surface p-3 rounded-input border border-border-default text-center cursor-pointer"
                    >
                      {formData.idealWakeTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex-1" />
            <div className="flex gap-4">
              <Button onClick={prevStep} variant="secondary" className="flex-1">Back</Button>
              <Button onClick={nextStep} className="flex-1">Next</Button>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="flex flex-col h-full space-y-8">
            <h2 className="text-2xl font-heading text-center">Make a promise</h2>
            <div className="space-y-4">
              <p className="text-text-secondary text-sm text-center">Write a short commitment to yourself (max 10 words)</p>
              <textarea 
                className="w-full bg-bg-surface border border-border-default rounded-card p-6 font-body text-xl text-center italic text-white placeholder-text-placeholder min-h-[160px] outline-none focus:border-accent-primary"
                placeholder='"I will stay disciplined..."'
                value={formData.promise}
                onChange={e => updateFormData({ promise: e.target.value })}
              />
              <p className="text-right text-caption text-text-secondary">
                {formData.promise.split(/\s+/).filter(Boolean).length} / 10 words
              </p>
            </div>
            <div className="flex-1" />
            <div className="flex gap-4">
              <Button onClick={prevStep} variant="secondary" className="flex-1">Back</Button>
              <Button 
                onClick={nextStep} 
                disabled={!formData.promise || formData.promise.split(/\s+/).filter(Boolean).length > 10} 
                className="flex-1"
              >
                Almost There
              </Button>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="flex flex-col h-full space-y-8">
            <h2 className="text-2xl font-heading text-center">Tracker Types</h2>
            <div className="space-y-4 overflow-y-auto pr-1">
              {[
                { title: 'Session', desc: 'Real-time timers for deep focus activities', icon: '⏱️' },
                { title: 'Incremental', desc: 'Counter for things like hydration', icon: '💧' },
                { title: 'Streak', desc: 'Days since last reset for habits like No-Fap', icon: '🔥' },
                { title: 'Manual', desc: 'Quick check-ins and reflection logs', icon: '✏️' },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-bg-surface rounded-xl flex gap-4 items-center">
                  <span className="text-3xl">{item.icon}</span>
                  <div className="space-y-1">
                    <h3 className="font-heading font-semibold">{item.title}</h3>
                    <p className="text-text-secondary text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-1" />
            <div className="flex gap-4">
              <Button onClick={prevStep} variant="secondary" className="flex-1">Back</Button>
              <Button onClick={nextStep} className="flex-1">Good Luck!</Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <OnboardingLayout step={step} totalSteps={totalSteps}>
        {renderStep()}
      </OnboardingLayout>

      <TimePicker 
        isOpen={isTimePickerOpen.open}
        onClose={() => setIsTimePickerOpen({ ...isTimePickerOpen, open: false })}
        value={isTimePickerOpen.type === 'bedtime' ? formData.idealBedtime : formData.idealWakeTime}
        onChange={(val) => {
          if (isTimePickerOpen.type === 'bedtime') updateFormData({ idealBedtime: val });
          else updateFormData({ idealWakeTime: val });
        }}
      />
    </>
  );
};

export default Onboarding;
