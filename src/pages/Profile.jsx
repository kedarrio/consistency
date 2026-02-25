import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import TopNav from '../components/navigation/TopNav';
import Button from '../components/buttons/Button';
import Modal from '../components/navigation/Modal';
import TextInput from '../components/inputs/TextInput';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Profile = () => {
  const { user, setUser } = useApp();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({ name: user?.name || '', promise: user?.promise || '' });

  const handleSave = () => {
    setUser({ ...user, ...editData });
    setIsEditModalOpen(false);
  };

  return (
    <div className="bg-bg-primary min-h-screen text-text-primary pb-24">
      <TopNav 
        title="Profile" 
        showBack 
        rightAction="edit" 
        onMenuClick={() => setIsEditModalOpen(true)} 
      />

      <main className="px-6 py-10 space-y-12">
        {/* Profile Header */}
        <section className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-bg-surface border-2 border-accent-primary flex items-center justify-center overflow-hidden">
              {user?.profilePicture ? (
                <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <PersonIcon className="text-border-default !text-[48px]" />
              )}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-accent-primary rounded-full flex items-center justify-center border-4 border-bg-primary">
              <EditIcon className="text-white !text-[16px]" />
            </button>
          </div>
          <div className="space-y-1">
            <h2 className="text-[28px] font-heading font-semibold">{user?.name || 'Anonymous'}</h2>
            <p className="text-text-secondary font-body text-sm">
              {user?.age ? `${user.age} • ` : ''}{user?.gender || 'Prefer not to say'}
            </p>
          </div>
        </section>

        {/* Promise Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-h3 font-heading font-semibold">Your Promise</h3>
            <button onClick={() => setIsEditModalOpen(true)}>
              <EditIcon className="text-text-secondary !text-[20px]" />
            </button>
          </div>
          <div className="bg-bg-surface p-8 rounded-card border border-border-divider text-center italic">
            <p className="text-2xl font-heading text-accent-primary">
              "{user?.promise || 'Make a promise to yourself'}"
            </p>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="space-y-4">
          <h3 className="text-h3 font-heading font-semibold">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Days tracked', value: '45' },
              { label: 'Overall score', value: '78%' },
              { label: 'Current streak', value: '23d' },
              { label: 'Total entries', value: '342' },
            ].map((stat, i) => (
              <div key={i} className="bg-bg-surface p-4 rounded-xl border border-border-divider">
                <div className="text-xl font-body font-bold">{stat.value}</div>
                <div className="text-xs text-text-secondary font-body uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy & Legal */}
        <section className="space-y-4">
          <h3 className="text-h3 font-heading font-semibold">Privacy & Legal</h3>
          <div className="bg-bg-surface rounded-xl border border-border-divider overflow-hidden">
            {[
              'Privacy Policy',
              'Terms & Conditions',
              'Data Management'
            ].map((item, i) => (
              <button 
                key={i}
                className={`w-full flex items-center justify-between px-5 py-4 text-left font-body hover:bg-bg-elevated transition-colors ${
                  i < 2 ? 'border-b border-border-divider' : ''
                }`}
              >
                <span>{item}</span>
                <ChevronRightIcon className="text-text-secondary" />
              </button>
            ))}
          </div>
        </section>
      </main>

      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Profile"
      >
        <div className="space-y-6">
          <TextInput 
            label="Name" 
            value={editData.name} 
            onChange={e => setEditData({ ...editData, name: e.target.value })} 
          />
          <div className="space-y-2">
             <p className="text-caption text-text-secondary uppercase tracking-wider font-body">Your Promise (max 10 words)</p>
             <textarea 
                className="w-full bg-bg-surface border border-border-default rounded-input p-4 font-body text-white italic"
                rows={3}
                value={editData.promise}
                onChange={e => setEditData({ ...editData, promise: e.target.value })}
              />
          </div>
          <div className="flex flex-col gap-3">
            <Button variant="primary" onClick={handleSave}>Save Changes</Button>
            <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
