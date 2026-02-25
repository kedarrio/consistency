import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import Button from '../buttons/Button';

const TopNav = ({ title, showBack, onMenuClick, rightAction }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 h-[56px] bg-bg-primary border-b border-bg-surface flex items-center justify-between px-4 z-[90]">
      <div className="flex items-center">
        {showBack ? (
          <button 
            onClick={() => navigate(-1)}
            className="w-11 h-11 flex items-center justify-start text-white"
          >
            <ArrowBackIcon />
          </button>
        ) : (
          <div className="w-11" />
        )}
      </div>

      <h1 className="text-[24px] font-heading font-semibold text-white">
        {title}
      </h1>

      <div className="flex items-center justify-end">
        {rightAction === 'edit' ? (
          <button className="w-11 h-11 flex items-center justify-end text-white">
            <EditIcon />
          </button>
        ) : onMenuClick ? (
          <button 
            onClick={onMenuClick}
            className="w-11 h-11 flex items-center justify-end text-white"
          >
            <MenuIcon />
          </button>
        ) : (
          <div className="w-11" />
        )}
      </div>
    </header>
  );
};

export default TopNav;
