import React from 'react';
import WheelPicker from './WheelPicker';
import BottomSheet from '../navigation/BottomSheet';
import Button from '../buttons/Button';

const TimePicker = ({ isOpen, onClose, value, onChange }) => {
  const hours = Array.from({ length: 24 }, (_, i) => ({
    label: i.toString().padStart(2, '0'),
    value: i
  }));

  const minutes = Array.from({ length: 60 }, (_, i) => ({
    label: i.toString().padStart(2, '0'),
    value: i
  }));

  const handleHourChange = (hour) => {
    const newDate = new Date(value);
    newDate.setHours(hour);
    onChange(newDate);
  };

  const handleMinuteChange = (minute) => {
    const newDate = new Date(value);
    newDate.setMinutes(minute);
    onChange(newDate);
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Select Time">
      <div className="flex gap-4 mb-8 justify-center">
        <div className="w-24">
          <p className="text-center text-caption text-text-secondary mb-2">Hour</p>
          <WheelPicker 
            options={hours} 
            value={value.getHours()} 
            onChange={handleHourChange} 
          />
        </div>
        <div className="w-24">
          <p className="text-center text-caption text-text-secondary mb-2">Min</p>
          <WheelPicker 
            options={minutes} 
            value={value.getMinutes()} 
            onChange={handleMinuteChange} 
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Button onClick={onClose} variant="primary">Done</Button>
        <Button onClick={onClose} variant="secondary">Cancel</Button>
      </div>
    </BottomSheet>
  );
};

export default TimePicker;
