import React, { useState } from 'react';
import Button from '../components/buttons/Button';
import HabitCard from '../components/cards/HabitCard';
import Toggle from '../components/inputs/Toggle';
import SegmentedPicker from '../components/inputs/SegmentedPicker';
import TextInput from '../components/inputs/TextInput';
import TextArea from '../components/inputs/TextArea';
import NumberInput from '../components/inputs/NumberInput';
import Slider from '../components/inputs/Slider';
import DatePicker from '../components/inputs/DatePicker';
import TimePicker from '../components/inputs/TimePicker';
import ProgressBar from '../components/progress/ProgressBar';
import CircularProgress from '../components/progress/CircularProgress';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import Modal from '../components/navigation/Modal';
import TopNav from '../components/navigation/TopNav';
import BottomNav from '../components/navigation/BottomNav';
import HamburgerDrawer from '../components/navigation/HamburgerDrawer';
import CalendarGrid from '../components/calendar/CalendarGrid';
import MeditationIcon from '@mui/icons-material/SelfImprovement';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import EditIcon from '@mui/icons-material/Edit';

const DesignSystemTest = () => {
  const [toggle, setToggle] = useState(true);
  const [picker, setPicker] = useState('daily');
  const [slider, setSlider] = useState(7);
  const [date, setDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const barData = [
    { name: 'M', value: 40, color: 'var(--color-habit-meditation)' },
    { name: 'T', value: 30, color: 'var(--color-habit-meditation)' },
    { name: 'W', value: 20, color: 'var(--color-habit-meditation)' },
    { name: 'T', value: 50, color: 'var(--color-habit-meditation)' },
    { name: 'F', value: 45, color: 'var(--color-habit-meditation)' },
    { name: 'S', value: 60, color: 'var(--color-habit-meditation)' },
    { name: 'S', value: 35, color: 'var(--color-habit-meditation)' },
  ];

  const lineData = [
    { name: '1', value: 10 },
    { name: '2', value: 25 },
    { name: '3', value: 15 },
    { name: '4', value: 40 },
    { name: '5', value: 30 },
    { name: '6', value: 55 },
    { name: '7', value: 45 },
  ];

  return (
    <div className="bg-bg-primary min-h-screen text-text-primary">
      <TopNav 
        title="Design System" 
        onMenuClick={() => setIsDrawerOpen(true)}
      />

      <div className="p-8 pb-32 space-y-12 max-w-4xl mx-auto">
        <section>
          <h1 className="text-h1 mb-4 font-heading">Component Library</h1>
          <p className="text-text-secondary font-body">Verification of all components against design specs.</p>
        </section>

        {/* Buttons */}
        <section className="space-y-6">
          <h2 className="text-h2 border-b border-border-divider pb-2 font-heading">Buttons</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger Action</Button>
            <Button variant="primary" loading>Loading</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
        </section>

        {/* Navigation & Overlays */}
        <section className="space-y-6">
          <h2 className="text-h2 border-b border-border-divider pb-2 font-heading">Navigation & Overlays</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>
            <Button variant="secondary" onClick={() => setIsDrawerOpen(true)}>
              Open Hamburger Drawer
            </Button>
          </div>
        </section>

        {/* Habit Cards */}
        <section className="space-y-6">
          <h2 className="text-h2 border-b border-border-divider pb-2 font-heading">Habit Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <HabitCard 
              habit={{
                name: "Meditation",
                icon: MeditationIcon,
                color: "meditation",
                consistency: "78%",
                subLabel: "this week",
                todayCount: "9/10m",
                progress: 90,
                type: "session"
              }}
            />
            <HabitCard 
              habit={{
                name: "Hydration",
                icon: WaterDropIcon,
                color: "hydration",
                consistency: "60%",
                subLabel: "today",
                todayCount: "6/10",
                progress: 60,
                type: "incremental"
              }}
            />
             <HabitCard 
              habit={{
                name: "No-Fap",
                icon: LocalFireDepartmentIcon,
                color: "noFap",
                consistency: "23 days",
                subLabel: "streak preserved",
                todayCount: "23 days 🔥",
                progress: 45,
                type: "streak"
              }}
            />
             <HabitCard 
              habit={{
                name: "Journal",
                icon: EditIcon,
                color: "journal",
                consistency: "3/5",
                subLabel: "entries this week",
                todayCount: "Done",
                progress: 60,
                type: "manual"
              }}
            />
          </div>
        </section>

        {/* Inputs */}
        <section className="space-y-6">
          <h2 className="text-h2 border-b border-border-divider pb-2 font-heading">Inputs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <TextInput label="Text Input" placeholder="Enter text..." />
              <NumberInput label="Number Input" placeholder="0" unit="units" />
              <TextArea label="Text Area" placeholder="Write something..." />
            </div>
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <span className="font-body text-body">Toggle Switch</span>
                <Toggle isOn={toggle} onToggle={setToggle} />
              </div>
              <div className="space-y-2">
                <span className="font-body text-caption text-text-secondary uppercase">Segmented Picker</span>
                <SegmentedPicker 
                  options={[
                    { label: 'Daily', value: 'daily' },
                    { label: 'Weekly', value: 'weekly' },
                    { label: 'Monthly', value: 'monthly' }
                  ]}
                  value={picker}
                  onChange={setPicker}
                />
              </div>
              <Slider 
                label="Slider" 
                value={slider} 
                onChange={setSlider} 
                leftLabel="Min" 
                rightLabel="Max" 
              />
              <div className="flex gap-4">
                <Button variant="secondary" onClick={() => setIsDatePickerOpen(true)} className="flex-1">
                  Date Picker
                </Button>
                <Button variant="secondary" onClick={() => setIsTimePickerOpen(true)} className="flex-1">
                  Time Picker
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Calendar Grid */}
        <section className="space-y-6">
          <h2 className="text-h2 border-b border-border-divider pb-2 font-heading">Calendar Grid</h2>
          <div className="max-w-md mx-auto">
            <CalendarGrid 
              month={new Date()}
              selectedDate={date}
              onDateSelect={setDate}
              getConsistencyForDate={(d) => d.getDate() % 2 === 0 ? 80 : 20}
            />
          </div>
        </section>

        {/* Progress & Charts */}
        <section className="space-y-6">
          <h2 className="text-h2 border-b border-border-divider pb-2 font-heading">Progress & Charts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <ProgressBar progress={75} variant="large" color="var(--color-accent-primary)" />
              <ProgressBar progress={40} variant="mini" color="var(--color-habit-workout)" />
              <div className="flex justify-center">
                <CircularProgress progress={65} size={180}>
                  <div className="text-center">
                    <div className="text-h2 font-heading">15:24</div>
                    <div className="text-caption text-text-secondary">Elapsed</div>
                  </div>
                </CircularProgress>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-bg-surface p-4 rounded-card">
                <h3 className="text-bodySmall text-text-secondary mb-4 uppercase font-body">Bar Chart</h3>
                <BarChart data={barData} color="var(--color-habit-meditation)" />
              </div>
              <div className="bg-bg-surface p-4 rounded-card">
                <h3 className="text-bodySmall text-text-secondary mb-4 uppercase font-body">Line Chart</h3>
                <LineChart data={lineData} />
              </div>
            </div>
          </div>
        </section>
      </div>

      <BottomNav />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Test Modal"
      >
        <p className="mb-6 font-body">This is a centered modal component. It uses the design system tokens for background, border radius, and typography.</p>
        <div className="flex flex-col gap-3">
          <Button variant="primary" onClick={() => setIsModalOpen(false)}>Confirm</Button>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
        </div>
      </Modal>

      <DatePicker 
        isOpen={isDatePickerOpen} 
        onClose={() => setIsDatePickerOpen(false)} 
        value={date} 
        onChange={setDate} 
      />
      
      <TimePicker 
        isOpen={isTimePickerOpen} 
        onClose={() => setIsTimePickerOpen(false)} 
        value={date} 
        onChange={setDate} 
      />

      <HamburgerDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />

      <Button variant="fab" icon={EditIcon} onClick={() => alert('FAB Clicked')} />
    </div>
  );
};

export default DesignSystemTest;
