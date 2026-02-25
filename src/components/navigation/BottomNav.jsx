import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const BottomNav = () => {
  const navItems = [
    { label: 'Dashboard', icon: HomeOutlinedIcon, activeIcon: HomeIcon, path: '/' },
    { label: 'Stats', icon: BarChartIcon, activeIcon: BarChartIcon, path: '/stats' },
    { label: 'Calendar', icon: CalendarMonthOutlinedIcon, activeIcon: CalendarMonthIcon, path: '/calendar' },
    { label: 'Settings', icon: SettingsOutlinedIcon, activeIcon: SettingsIcon, path: '/settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[60px] bg-bg-surface border-t border-border-divider flex justify-around items-center z-[100] px-2">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => 
            `flex flex-col items-center justify-center min-w-[44px] min-h-[44px] transition-colors duration-200 ${
              isActive ? 'text-accent-primary' : 'text-text-secondary'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? <item.activeIcon /> : <item.icon />}
              <span className="text-[10px] font-body mt-0.5">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
