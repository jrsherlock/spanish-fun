import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Trophy, User, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import useStore from '../../store/useStore';

const NavItem = ({ icon: Icon, label, path, isActive, onClick }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all min-w-[60px] ${
      isActive 
        ? 'bg-indigo-100 text-indigo-600' 
        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
    }`}
  >
    <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
    <span className="text-xs font-medium">{label}</span>
  </motion.button>
);

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, stats, logout } = useStore();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: BookOpen, label: 'Learn', path: '/units' },
    { icon: Trophy, label: 'Rankings', path: '/leaderboard' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const handleLogout = async () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇪🇸</span>
            <div>
              <h1 className="font-bold text-gray-800 text-lg leading-tight">Spanish Fun</h1>
              <p className="text-xs text-gray-500">Level {stats?.currentLevel || 1}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* XP Display */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-amber-100 px-3 py-1.5 rounded-full">
              <span className="text-yellow-600 text-sm">⚡</span>
              <span className="font-bold text-amber-700 text-sm">{stats?.totalXp || 0}</span>
            </div>
            
            {/* Streak Display */}
            <div className="flex items-center gap-1 bg-orange-100 px-2.5 py-1.5 rounded-full">
              <span className="text-orange-500 text-sm">🔥</span>
              <span className="font-bold text-orange-600 text-sm">{stats?.currentStreak || 0}</span>
            </div>
            
            {/* Settings */}
            <button 
              onClick={() => navigate('/settings')}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
        <div className="max-w-lg mx-auto flex justify-around items-center">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            />
          ))}
        </div>
      </nav>
    </div>
  );
}
