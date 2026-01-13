import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, ChevronRight, Star } from 'lucide-react';
import { units } from '../../data/units';
import useStore from '../../store/useStore';

const UnitCard = ({ unit, progress, onClick, index }) => {
  const isLocked = !unit.isUnlocked;
  const isCompleted = progress?.is_completed;
  const stars = progress?.stars_earned || 0;
  
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileTap={{ scale: isLocked ? 1 : 0.98 }}
      onClick={() => !isLocked && onClick()}
      disabled={isLocked}
      className={`w-full bg-white rounded-2xl p-4 shadow-sm border transition-all text-left ${
        isLocked 
          ? 'opacity-60 border-gray-200' 
          : isCompleted 
            ? 'border-green-200 bg-green-50/30' 
            : 'border-gray-100 hover:border-indigo-200 hover:shadow-md'
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Unit Icon */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${unit.color} flex items-center justify-center shadow-lg ${isLocked ? 'grayscale' : ''}`}>
          <span className="text-2xl">{unit.icon}</span>
        </div>
        
        {/* Unit Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-gray-400">UNIT {unit.unitNumber}</span>
            {isCompleted && <CheckCircle size={14} className="text-green-500" />}
          </div>
          <h3 className={`font-bold truncate ${isLocked ? 'text-gray-400' : 'text-gray-800'}`}>
            {unit.title}
          </h3>
          <p className={`text-sm truncate ${isLocked ? 'text-gray-300' : 'text-gray-500'}`}>
            {unit.description}
          </p>
          
          {/* Stars */}
          {!isLocked && (
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3].map((star) => (
                <Star
                  key={star}
                  size={14}
                  className={star <= stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}
                />
              ))}
              {progress?.completion_percentage > 0 && (
                <span className="text-xs text-gray-400 ml-2">
                  {Math.round(progress.completion_percentage)}% complete
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* Arrow/Lock */}
        <div className="flex-shrink-0">
          {isLocked ? (
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Lock size={18} className="text-gray-400" />
            </div>
          ) : (
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <ChevronRight size={18} className="text-indigo-600" />
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
};

export default function UnitListScreen() {
  const navigate = useNavigate();
  const { stats } = useStore();

  return (
    <div className="p-4 max-w-lg mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Course Units</h1>
        <p className="text-gray-500">Spanish II Curriculum</p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-4 mb-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm">Overall Progress</p>
            <p className="text-2xl font-bold">
              {units.filter(u => u.isUnlocked).length} / {units.length} Units
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-sm">Level</p>
            <p className="text-2xl font-bold">{stats?.currentLevel || 1}</p>
          </div>
        </div>
        <div className="mt-3 bg-white/20 rounded-full h-2">
          <div 
            className="bg-white rounded-full h-2 transition-all"
            style={{ width: `${(units.filter(u => u.isUnlocked).length / units.length) * 100}%` }}
          />
        </div>
      </motion.div>

      {/* Units List */}
      <div className="space-y-3">
        {units.map((unit, index) => (
          <UnitCard
            key={unit.id}
            unit={unit}
            progress={null}
            onClick={() => navigate(`/unit/${unit.id}`)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
