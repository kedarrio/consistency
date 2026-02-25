import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import TextInput from '../inputs/TextInput';
import TextArea from '../inputs/TextArea';
import Button from '../buttons/Button';
import DatePicker from '../inputs/DatePicker';
import TimePicker from '../inputs/TimePicker';

const ManualEntryForm = ({ habit, initialData, onSave, onCancel }) => {
  const [date, setDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isStartTimeOpen, setIsStartTimeOpen] = useState(false);
  const [isEndTimeOpen, setIsEndTimeOpen] = useState(false);
  
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [duration, setDuration] = useState(30);
  const [notes, setNotes] = useState('');
  
  // Incremental specific
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (initialData) {
      if (initialData.date) setDate(new Date(initialData.date + 'T12:00:00')); // Avoid timezone issues
      if (initialData.notes) setNotes(initialData.notes);
      
      if (habit.type === 'session') {
        if (initialData.startTime) {
          const [h, m] = initialData.startTime.split(':');
          const st = new Date();
          st.setHours(parseInt(h), parseInt(m));
          setStartTime(st);
        }
        if (initialData.endTime) {
          const [h, m] = initialData.endTime.split(':');
          const et = new Date();
          et.setHours(parseInt(h), parseInt(m));
          setEndTime(et);
        }
        if (initialData.duration) setDuration(initialData.duration);
      } else if (habit.type === 'incremental') {
        if (initialData.count !== undefined) setCount(initialData.count);
      }
    }
  }, [initialData, habit.type]);

  const handleSave = () => {
    const entry = {
      id: initialData?.id || crypto.randomUUID(),
      date: format(date, 'yyyy-MM-dd'),
      timestamp: initialData?.timestamp || Date.now(),
      notes
    };

    if (habit.type === 'session') {
      entry.startTime = format(startTime, 'HH:mm');
      entry.endTime = format(endTime, 'HH:mm');
      entry.duration = parseInt(duration);
    } else if (habit.type === 'incremental') {
      entry.count = parseInt(count);
    }

    onSave(entry);
  };

  return (
    <div className="space-y-6">
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
          </>
        )}

        {habit.type === 'incremental' && (
          <TextInput 
            label={`I drank __ ${habit.goal.unit}`} 
            type="number" 
            value={count} 
            onChange={e => setCount(e.target.value)} 
          />
        )}

        <TextArea label="Notes (Optional)" value={notes} onChange={e => setNotes(e.target.value)} />
      </div>

      <div className="flex flex-col gap-3">
        <Button variant="primary" onClick={handleSave}>
          {initialData ? 'Update Entry' : 'Save Entry'}
        </Button>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>

      <DatePicker isOpen={isDatePickerOpen} onClose={() => setIsDatePickerOpen(false)} value={date} onChange={setDate} />
      <TimePicker isOpen={isStartTimeOpen} onClose={() => setIsStartTimeOpen(false)} value={startTime} onChange={setStartTime} />
      <TimePicker isOpen={isEndTimeOpen} onClose={() => setIsEndTimeOpen(false)} value={endTime} onChange={setEndTime} />
    </div>
  );
};

export default ManualEntryForm;
