import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import TopNav from '../components/navigation/TopNav';
import SegmentedPicker from '../components/inputs/SegmentedPicker';
import Button from '../components/buttons/Button';
import Modal from '../components/navigation/Modal';
import BottomSheet from '../components/navigation/BottomSheet';
import DatePicker from '../components/inputs/DatePicker';
import ManualEntryForm from '../components/habits/ManualEntryForm';
import { format, isWithinInterval, subDays, startOfWeek, startOfMonth, endOfDay, startOfDay, parseISO } from 'date-fns';

// Icons
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import HistoryIcon from '@mui/icons-material/History';

const Logs = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { habits, setHabits } = useApp();
  
  const habit = habits.find(h => h.id === id);
  
  const [filter, setFilter] = useState('All Time');
  const [customRange, setCustomRange] = useState({
    from: subDays(new Date(), 7),
    to: new Date()
  });
  const [isFromPickerOpen, setIsFromPickerOpen] = useState(false);
  const [isToPickerOpen, setIsToPickerOpen] = useState(false);

  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [editingEntry, setEditingEntry] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const longPressTimer = useRef(null);

  if (!habit) return <div className="p-10 text-center">Habit not found</div>;

  const entries = habit.entries || [];
  const resets = habit.resets || [];

  const getFilteredEntries = () => {
    const now = new Date();
    let filtered = habit.type === 'streak' ? [...resets] : [...entries];

    switch (filter) {
      case 'Last 7 Days':
        filtered = filtered.filter(e => isWithinInterval(new Date(e.timestamp), { start: startOfDay(subDays(now, 7)), end: endOfDay(now) }));
        break;
      case 'Last 30 Days':
        filtered = filtered.filter(e => isWithinInterval(new Date(e.timestamp), { start: startOfDay(subDays(now, 30)), end: endOfDay(now) }));
        break;
      case 'This Week':
        filtered = filtered.filter(e => isWithinInterval(new Date(e.timestamp), { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfDay(now) }));
        break;
      case 'This Month':
        filtered = filtered.filter(e => isWithinInterval(new Date(e.timestamp), { start: startOfMonth(now), end: endOfDay(now) }));
        break;
      case 'Custom':
        filtered = filtered.filter(e => isWithinInterval(new Date(e.timestamp), { 
          start: startOfDay(customRange.from), 
          end: endOfDay(customRange.to) 
        }));
        break;
      default:
        break;
    }

    return filtered.sort((a, b) => b.timestamp - a.timestamp);
  };

  const filteredEntries = getFilteredEntries();

  const handleTouchStart = (entryId) => {
    longPressTimer.current = setTimeout(() => {
      setSelectMode(true);
      setSelectedIds([entryId]);
    }, 600);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const toggleSelect = (entryId) => {
    if (selectedIds.includes(entryId)) {
      const next = selectedIds.filter(id => id !== entryId);
      setSelectedIds(next);
      if (next.length === 0) setSelectMode(false);
    } else {
      setSelectedIds(prev => [...prev, entryId]);
    }
  };

  const handleEntryClick = (entry) => {
    if (selectMode) {
      toggleSelect(entry.id);
    } else if (habit.type !== 'streak') {
      setEditingEntry(entry);
      setIsEditModalOpen(true);
    }
  };

  const handleDelete = () => {
    const updatedHabits = habits.map(h => {
      if (h.id === id) {
        if (h.type === 'streak') {
          return { ...h, resets: h.resets.filter(r => !selectedIds.includes(r.id)) };
        }
        return { ...h, entries: h.entries.filter(e => !selectedIds.includes(e.id)) };
      }
      return h;
    });
    setHabits(updatedHabits);
    setSelectedIds([]);
    setSelectMode(false);
    setIsDeleteModalOpen(false);
  };

  const handleUpdateEntry = (updatedEntry) => {
    const updatedHabits = habits.map(h => {
      if (h.id === id) {
        return {
          ...h,
          entries: h.entries.map(e => e.id === updatedEntry.id ? updatedEntry : e)
        };
      }
      return h;
    });
    setHabits(updatedHabits);
    setIsEditModalOpen(false);
    setEditingEntry(null);
  };

  return (
    <div className="bg-bg-primary min-h-screen text-text-primary pb-24">
      {selectMode ? (
        <header className="sticky top-0 h-[56px] bg-bg-surface border-b border-border-divider flex items-center justify-between px-4 z-[95]">
          <div className="flex items-center gap-4">
            <button onClick={() => { setSelectMode(false); setSelectedIds([]); }}>
              <CloseIcon />
            </button>
            <span className="font-body text-sm">{selectedIds.length} selected</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSelectedIds(filteredEntries.map(e => e.id))}
              className="text-xs font-body text-accent-primary px-2"
            >
              Select All
            </button>
            <button 
              onClick={() => setIsDeleteModalOpen(true)}
              disabled={selectedIds.length === 0}
              className="p-2 text-status-error disabled:opacity-50"
            >
              <DeleteIcon />
            </button>
          </div>
        </header>
      ) : (
        <TopNav title={`${habit.name} Logs`} showBack onMenuClick={() => {}} />
      )}

      <main className="px-6 py-4 space-y-6">
        <div className="overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
          <SegmentedPicker 
            options={[
              { label: 'All', value: 'All Time' },
              { label: '7D', value: 'Last 7 Days' },
              { label: '30D', value: 'Last 30 Days' },
              { label: 'Week', value: 'This Week' },
              { label: 'Month', value: 'This Month' },
              { label: 'Custom', value: 'Custom' }
            ]}
            value={filter}
            onChange={setFilter}
            className="min-w-[450px]"
          />
        </div>

        {filter === 'Custom' && (
          <div className="flex gap-4 bg-bg-surface p-4 rounded-xl border border-border-divider">
            <div className="flex-1 space-y-1">
              <label className="text-[10px] text-text-secondary uppercase font-body">From</label>
              <button 
                onClick={() => setIsFromPickerOpen(true)}
                className="w-full text-left font-body text-sm py-2 border-b border-border-default"
              >
                {format(customRange.from, 'MMM d, yyyy')}
              </button>
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-[10px] text-text-secondary uppercase font-body">To</label>
              <button 
                onClick={() => setIsToPickerOpen(true)}
                className="w-full text-left font-body text-sm py-2 border-b border-border-default"
              >
                {format(customRange.to, 'MMM d, yyyy')}
              </button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {filteredEntries.length === 0 ? (
            <div className="py-20 flex flex-col items-center text-center space-y-4">
              <HistoryIcon sx={{ fontSize: 64, color: 'var(--color-text-placeholder)' }} />
              <h3 className="text-h3 font-heading">No entries yet</h3>
              <p className="text-text-secondary font-body text-sm">Start tracking to see your history here</p>
              <Button onClick={() => navigate(`/habit/${id}`)}>Add Entry</Button>
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <div 
                key={entry.id}
                onMouseDown={() => handleTouchStart(entry.id)}
                onMouseUp={handleTouchEnd}
                onTouchStart={() => handleTouchStart(entry.id)}
                onTouchEnd={handleTouchEnd}
                onClick={() => handleEntryClick(entry)}
                className={`group relative bg-bg-surface p-4 rounded-[12px] border transition-all active:scale-[0.98] ${
                  selectedIds.includes(entry.id) 
                    ? 'border-accent-primary' 
                    : habit.type === 'streak' 
                      ? 'border-status-error/30 bg-status-error/5' 
                      : 'border-border-divider'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1 flex-1">
                    <div className="text-text-secondary font-body text-[14px]">
                      {format(new Date(entry.timestamp), 'MMM d, yyyy • p')}
                    </div>
                    
                    <div className="text-[18px] font-body text-white font-medium">
                      {habit.type === 'session' ? `${entry.duration} minutes` : 
                       habit.type === 'incremental' ? `${entry.count} ${habit.goal.unit}` :
                       habit.type === 'streak' ? `Reset — ${entry.streakBroken}-day streak broken` :
                       habit.type === 'manual' ? (entry.type || 'Entry').toUpperCase() : 'Entry'}
                    </div>

                    <div className="text-text-secondary font-body text-[14px]">
                      {habit.type === 'session' ? `${entry.startTime} - ${entry.endTime}` : 
                       habit.type === 'streak' ? `Started: ${entry.date}` : 
                       habit.type === 'incremental' ? 'Daily Total' : ''}
                    </div>

                    {entry.notes && (
                      <div className="text-text-placeholder font-body text-[12px] mt-1 line-clamp-2 italic">
                        {entry.notes}
                      </div>
                    )}
                  </div>

                  {selectMode && (
                    <div className="ml-4 pt-1">
                      {selectedIds.includes(entry.id) ? 
                        <CheckCircleIcon className="text-accent-primary" /> : 
                        <RadioButtonUncheckedIcon className="text-text-secondary" />
                      }
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Date Pickers for Custom Range */}
      <DatePicker 
        isOpen={isFromPickerOpen} 
        onClose={() => setIsFromPickerOpen(false)} 
        value={customRange.from} 
        onChange={(date) => setCustomRange(prev => ({ ...prev, from: date }))} 
      />
      <DatePicker 
        isOpen={isToPickerOpen} 
        onClose={() => setIsToPickerOpen(false)} 
        value={customRange.to} 
        onChange={(date) => setCustomRange(prev => ({ ...prev, to: date }))} 
      />

      {/* Edit Entry Modal */}
      <BottomSheet
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Entry"
      >
        {editingEntry && (
          <ManualEntryForm 
            habit={habit} 
            initialData={editingEntry}
            onSave={handleUpdateEntry}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </BottomSheet>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        title={`Delete ${selectedIds.length} entries?`}
      >
        <div className="space-y-6">
          <p className="text-text-secondary font-body">This action cannot be undone. Are you sure you want to delete these logs?</p>
          <div className="flex flex-col gap-3">
            <Button variant="danger" onClick={handleDelete}>Delete Permanently</Button>
            <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Logs;
