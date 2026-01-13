import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Target, Map, Mic, PenTool, MessageCircle, Star, Clock } from 'lucide-react';
import { units, gameTypes } from '../../data/units';

const GameCard = ({ game, unitId, onClick, index }) => {
  const IconMap = {
    flashcards: BookOpen,
    quiz: Target,
    journey: Map,
    speaking: Mic,
    writing: PenTool,
    conversation: MessageCircle,
  };
  const Icon = IconMap[game.id] || Target;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all text-left"
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center`}>
          <Icon size={22} className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800">{game.title}</h3>
          <p className="text-sm text-gray-500">{game.description}</p>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <Clock size={14} />
          <span className="text-xs">5 min</span>
        </div>
      </div>
    </motion.button>
  );
};

export default function UnitDetailScreen() {
  const { unitId } = useParams();
  const navigate = useNavigate();
  
  const unit = units.find(u => u.id === unitId) || units[0];

  const handleGameSelect = (gameId) => {
    navigate(`/play/${unitId}/${gameId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with gradient */}
      <div className={`bg-gradient-to-br ${unit.color} pt-4 pb-24 px-4`}>
        <div className="max-w-lg mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
              <span className="text-3xl">{unit.icon}</span>
            </div>
            <div className="flex-1">
              <span className="text-white/70 text-sm font-medium">UNIT {unit.unitNumber}</span>
              <h1 className="text-2xl font-bold text-white mt-1">{unit.title}</h1>
              <p className="text-white/80 text-sm mt-1">{unit.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Card */}
      <div className="max-w-lg mx-auto px-4 -mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-6"
        >
          {/* Topics */}
          <div className="mb-6">
            <h2 className="font-bold text-gray-800 mb-3">What You'll Learn</h2>
            <div className="space-y-2">
              {unit.topics.map((topic, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span className="text-gray-600">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-6"></div>

          {/* Study Guide Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/study-guide/${unitId}`)}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-4 mb-6 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BookOpen size={24} />
            </div>
            <div className="text-left flex-1">
              <p className="font-bold">Study Guide</p>
              <p className="text-sm text-white/80">Review concepts before playing</p>
            </div>
          </motion.button>

          {/* Games */}
          <h2 className="font-bold text-gray-800 mb-3">Games & Activities</h2>
          <div className="space-y-3">
            {gameTypes.map((game, index) => (
              <GameCard
                key={game.id}
                game={game}
                unitId={unitId}
                onClick={() => handleGameSelect(game.id)}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom padding */}
      <div className="h-8"></div>
    </div>
  );
}
