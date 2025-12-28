import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Briefcase, Sparkles, FileText } from 'lucide-react';

const MobileNav: React.FC = () => {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/notes", icon: BookOpen, label: "Notes" },
    { to: "/jobs", icon: Briefcase, label: "Jobs" },
    { to: "/pyqs", icon: FileText, label: "Papers" },
    { to: "/aibuddy", icon: Sparkles, label: "AI Buddy" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50 md:hidden pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'animate-pulse-once' : ''} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;