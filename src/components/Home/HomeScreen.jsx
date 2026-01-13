import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, BookOpen, Trophy, Zap, Target, TrendingUp } from 'lucide-react';
import useStore from '../../store/useStore';
import { units } from '../../data/units';

const StatCard = ({ icon: Icon, label, value, color, bgColor }) => (
  <div className={`${bgColor} rounded-2xl p-4 flex items-center gap-3`}>
    <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center`}>
      <Icon size={20} className="text-white" />
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  </div>
);

const QuickPlayCard = ({ title, subtitle, icon, gradient, onClick }) => (
  <motion.button
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`w-full bg-gradient-to-r ${gradient} rounded-2xl p-5 text-left text-white shadow-lg`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-lg font-bold mb-1">{title}</p>
        <p className="text-sm text-white/80">{subtitle}</p>
      </div>
      <span className="text-4xl">{icon}</span>
    </div>
  </motion.button>
);

export default function HomeScreen() {
  const navigate = useNavigate();
  const { stats, profile } = useStore();
  
  // Get the current/next unit to continue
  const currentUnit = units.find(u => u.isUnlocked) || units[0];

  return (
    <div className="p-4 max-w-lg mx-auto">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          ¡Hola{profile?.display_name ? `, ${profile.display_name}` : ''}! 👋
        </h1>
        <p className="text-gray-500">Ready to continue learning Spanish?</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-3 mb-6"
      >
        <StatCard 
          icon={Zap} 
          label="Total XP" 
          value={stats?.totalXp || 0}
          color="bg-yellow-500"
          bgColor="bg-yellow-50"
        />
        <StatCard 
          icon={Target} 
          label="Accuracy" 
          value={`${stats?.totalQuestionsAnswered > 0 
            ? Math.round((stats?.totalCorrectAnswers / stats?.totalQuestionsAnswered) * 100) 
            : 0}%`}
          color="bg-green-500"
          bgColor="bg-green-50"
        />
        <StatCard 
          icon={TrendingUp} 
          label="Best Streak" 
          value={stats?.bestStreak || 0}
          color="bg-orange-500"
          bgColor="bg-orange-50"
        />
        <StatCard 
          icon={Trophy} 
          label="Games Played" 
          value={stats?.totalGamesPlayed || 0}
          color="bg-purple-500"
          bgColor="bg-purple-50"
        />
      </motion.div>

      {/* Continue Learning */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <h2 className="text-lg font-bold text-gray-800 mb-3">Continue Learning</h2>
        <QuickPlayCard
          title={currentUnit.title}
          subtitle={`Unit ${currentUnit.unitNumber} • ${currentUnit.topics.length} topics`}
          icon={currentUnit.icon}
          gradient={currentUnit.color}
          onClick={() => navigate(`/unit/${currentUnit.id}`)}
        />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-lg font-bold text-gray-800 mb-3">Quick Play</h2>
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/quick-quiz')}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Target className="text-indigo-600" size={24} />
            </div>
            <span className="font-medium text-gray-800">Quick Quiz</span>
            <span className="text-xs text-gray-500">5 minutes</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/journey')}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🗺️</span>
            </div>
            <span className="font-medium text-gray-800">Journey</span>
            <span className="text-xs text-gray-500">Race to finish</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/flashcards')}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <BookOpen className="text-blue-600" size={24} />
            </div>
            <span className="font-medium text-gray-800">Flashcards</span>
            <span className="text-xs text-gray-500">Study vocab</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/ai-chat')}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🤖</span>
            </div>
            <span className="font-medium text-gray-800">AI Tutor</span>
            <span className="text-xs text-gray-500">Practice chat</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Daily Challenge Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
            <span className="text-3xl">🎯</span>
          </div>
          <div className="flex-1">
            <p className="font-bold text-white">Daily Challenge</p>
            <p className="text-sm text-white/80">Complete 3 games today for bonus XP!</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-white text-lg">0/3</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
