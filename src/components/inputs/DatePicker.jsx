import React from 'react';
import WheelPicker from './WheelPicker';
import BottomSheet from '../navigation/BottomSheet';
import Button from '../buttons/Button';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, eachMonthOfInterval, startOfYear, endOfYear, getYear } from 'date-fns';

const DatePicker = ({ isOpen, onClose, value, onChange }) => {
  const years = Array.from({ length: 10 }, (_, i) => ({
    label: (getYear(new Date()) - 5 + i).toString(),
    value: getYear(new Date()) - 5 + i
  }));

  const months = Array.from({ length: 12 }, (_, i) => ({
    label: format(new Date(2026, i, 1), 'MMM'),
    value: i
  }));

  const days = Array.from({ length: 31 }, (_, i) => ({
    label: (i + 1).toString(),
    value: i + 1
  }));

  const handleYearChange = (year) => {
    const newDate = new Date(value);
    newDate.setFullYear(year);
    onChange(newDate);
  };

  const handleMonthChange = (month) => {
    const newDate = new Date(value);
    newDate.setMonth(month);
    onChange(newDate);
  };

  const handleDayChange = (day) => {
    const newDate = new Date(value);
    newDate.setDate(day);
    onChange(newDate);
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Select Date">
      <div className="flex gap-4 mb-8">
        <div className="flex-1">
          <p className="text-center text-caption text-text-secondary mb-2">Day</p>
          <WheelPicker 
            options={days} 
            value={value.getDate()} 
            onChange={handleDayChange} 
          />
        </div>
        <div className="flex-1">
          <p className="text-center text-caption text-text-secondary mb-2">Month</p>
          <WheelPicker 
            options={months} 
            value={value.getMonth()} 
            onChange={handleMonthChange} 
          />
        </div>
        <div className="flex-1">
          <p className="text-center text-caption text-text-secondary mb-2">Year</p>
          <WheelPicker 
            options={years} 
            value={value.getFullYear()} 
            onChange={handleYearChange} 
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

export default DatePicker;
