import React from 'react';
import Modal from './Modal';
import Button from '../buttons/Button';
import { format } from 'date-fns';

const StaleSessionModal = ({ session, habitName, onSave, onCancel }) => {
  if (!session) return null;

  const startTime = new Date(session.startTime);
  const suggestedEndTime = new Date(startTime.getTime() + 30 * 60000); // Start + 30 mins

  return (
    <Modal isOpen={true} onClose={onCancel} title="Long session detected" showClose={false}>
      <div className="space-y-6">
        <p className="text-text-secondary font-body">
          It looks like you forgot to stop your <span className="text-white font-bold">{habitName}</span> session.
        </p>
        
        <div className="bg-bg-elevated p-4 rounded-xl space-y-2 font-body text-sm">
          <div className="flex justify-between">
            <span className="text-text-placeholder">Started:</span>
            <span>{format(startTime, 'MMM d, p')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-placeholder">Suggested end:</span>
            <span>{format(suggestedEndTime, 'p')}</span>
          </div>
        </div>

        <p className="text-xs text-text-placeholder italic font-body">
          You can save it with a corrected time or discard it entirely.
        </p>

        <div className="flex flex-col gap-3">
          <Button variant="primary" onClick={() => onSave(suggestedEndTime)}>
            Save with Suggested Time
          </Button>
          <Button variant="secondary" onClick={onCancel}>
            Discard Session
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default StaleSessionModal;
