import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import TopNav from '../components/navigation/TopNav';
import Toggle from '../components/inputs/Toggle';
import SegmentedPicker from '../components/inputs/SegmentedPicker';
import Modal from '../components/navigation/Modal';
import Button from '../components/buttons/Button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNotifications } from '../hooks/useNotifications';

const Settings = () => {
  const { settings, setSettings, habits } = useApp();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const { requestPermission } = useNotifications();

  const updateSettings = (updates) => {
    setSettings({ ...settings, ...updates });
  };

  const handleToggleNotifications = async (val) => {
    if (val) {
      const granted = await requestPermission();
      if (!granted) {
        alert('Notification permission denied. Please enable it in your browser settings.');
        return;
      }
    }
    updateSettings({ notifications: { ...settings.notifications, global: val } });
  };

  const handleClearData = () => {
    if (deleteConfirm === 'DELETE') {
      localStorage.clear();
      window.location.reload();
    }
  };

  const SectionHeader = ({ title }) => (
    <h3 className="text-h3 font-heading font-semibold mt-10 mb-4 px-6">{title}</h3>
  );

  const SettingRow = ({ label, children, onClick }) => (
    <div 
      onClick={onClick}
      className={`flex items-center justify-between px-6 py-4 border-b border-border-divider bg-bg-primary ${onClick ? 'cursor-pointer hover:bg-bg-surface' : ''}`}
    >
      <span className="font-body text-white">{label}</span>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="bg-bg-primary min-h-screen text-text-primary pb-32">
      <TopNav title="Settings" />

      <main>
        {/* Section 1: Preferences */}
        <SectionHeader title="Preferences" />
        <div className="border-t border-border-divider">
          <SettingRow label="Week starts on">
            <select 
              className="bg-transparent text-accent-primary font-body text-sm outline-none text-right"
              value={settings.weekStartDay}
              onChange={e => updateSettings({ weekStartDay: e.target.value })}
            >
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </SettingRow>
          <SettingRow label="Time format">
            <SegmentedPicker 
              options={[{ label: '12h', value: '12h' }, { label: '24h', value: '24h' }]}
              value={settings.timeFormat}
              onChange={val => updateSettings({ timeFormat: val })}
              className="w-32"
            />
          </SettingRow>
          <SettingRow label="Day resets at">
            <span className="text-accent-primary font-body text-sm">{settings.dayBoundary}</span>
          </SettingRow>
          <SettingRow label="Hydration glass size">
            <div className="flex items-center gap-2">
              <input 
                type="number"
                className="bg-transparent text-accent-primary font-body text-sm outline-none text-right w-12"
                value={settings.hydrationUnitSize}
                onChange={e => updateSettings({ hydrationUnitSize: parseInt(e.target.value) })}
              />
              <span className="text-text-secondary text-sm">ml</span>
            </div>
          </SettingRow>
        </div>

        {/* Section 2: Active Habits */}
        <SectionHeader title="Active Habits" />
        <div className="border-t border-border-divider">
          {habits.map(habit => (
            <SettingRow key={habit.id} label={habit.name}>
              <Toggle 
                isOn={habit.active} 
                onToggle={() => {
                  const activeCount = habits.filter(h => h.active).length;
                  if (habit.active && activeCount <= 1) {
                    alert('At least 1 habit must be active');
                    return;
                  }
                  // Actual update logic would be in AppContext
                }} 
              />
            </SettingRow>
          ))}
        </div>

        {/* Section 3: Notifications */}
        <SectionHeader title="Notifications" />
        <div className="border-t border-border-divider">
          <SettingRow label="Enable notifications">
            <Toggle 
              isOn={settings.notifications.global} 
              onToggle={handleToggleNotifications} 
            />
          </SettingRow>
          <SettingRow label="Enable sounds">
            <Toggle 
              isOn={settings.notifications.sounds} 
              onToggle={val => updateSettings({ notifications: { ...settings.notifications, sounds: val } })} 
            />
          </SettingRow>
        </div>

        {/* Section 4: Display */}
        <SectionHeader title="Display" />
        <div className="border-t border-border-divider">
          <SettingRow label="Show dashboard score">
            <Toggle 
              isOn={settings.display.showConsistencyScoreOnDashboard} 
              onToggle={val => updateSettings({ display: { ...settings.display, showConsistencyScoreOnDashboard: val } })} 
            />
          </SettingRow>
          <SettingRow label="Show areas to improve">
            <Toggle 
              isOn={settings.display.showAreasToImprove} 
              onToggle={val => updateSettings({ display: { ...settings.display, showAreasToImprove: val } })} 
            />
          </SettingRow>
        </div>

        {/* Section 5: Data Management */}
        <SectionHeader title="Data Management" />
        <div className="border-t border-border-divider">
          <SettingRow label="Export Data" onClick={() => {
            const data = {
              user: localStorage.getItem('consistency_user'),
              settings: localStorage.getItem('consistency_settings'),
              habits: localStorage.getItem('consistency_habits')
            };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `consistency_backup_${new Date().toISOString().split('T')[0]}.json`;
            a.click();
          }} />
          <SettingRow label="Clear All Data" onClick={() => setIsDeleteModalOpen(true)}>
            <span className="text-status-error font-body text-sm">Action</span>
          </SettingRow>
        </div>

        <div className="p-10 text-center space-y-2">
          <p className="text-text-placeholder font-body text-xs">Consistency v1.0.0</p>
          <p className="text-text-placeholder font-body text-[10px]">Built for discipline.</p>
        </div>
      </main>

      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete all data?"
      >
        <div className="space-y-6">
          <div className="bg-status-error/10 p-4 rounded-lg border border-status-error/20 text-status-error text-sm font-body">
            This will permanently delete ALL entries, settings, and photos. This cannot be undone.
          </div>
          <div className="space-y-2">
            <p className="text-sm text-text-secondary font-body">Type "DELETE" to confirm</p>
            <input 
              type="text" 
              className="w-full bg-bg-surface border border-border-default rounded-input p-3 text-white font-body"
              value={deleteConfirm}
              onChange={e => setDeleteConfirm(e.target.value)}
              placeholder="DELETE"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Button 
              variant="danger" 
              onClick={handleClearData}
              disabled={deleteConfirm !== 'DELETE'}
            >
              Delete Everything
            </Button>
            <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
