import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Layout from './components/Layout/Layout';
import AuthScreen from './components/Auth/AuthScreen';
import HomeScreen from './components/Home/HomeScreen';
import UnitListScreen from './components/Units/UnitListScreen';
import UnitDetailScreen from './components/Units/UnitDetailScreen';

// Store
import useStore from './store/useStore';

// Supabase
import { supabase, getCurrentUser, getProfile, getPlayerStats } from './lib/supabase';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useStore();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🇪🇸</div>
          <div className="text-white text-xl font-bold">Loading...</div>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

export default function App() {
  const { 
    setUser, 
    setProfile, 
    setStats, 
    setLoading, 
    isAuthenticated,
    user 
  } = useStore();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Check for existing session
    const initAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          
          // Load profile and stats
          const [profileResult, statsResult] = await Promise.all([
            getProfile(currentUser.id),
            getPlayerStats(currentUser.id),
          ]);
          
          if (profileResult.data) {
            setProfile(profileResult.data);
          }
          if (statsResult.data) {
            setStats({
              totalXp: statsResult.data.total_xp,
              currentLevel: statsResult.data.current_level,
              currentStreak: statsResult.data.current_streak,
              bestStreak: statsResult.data.best_streak,
              totalGamesPlayed: statsResult.data.total_games_played,
              totalCorrectAnswers: statsResult.data.total_correct_answers,
              totalQuestionsAnswered: statsResult.data.total_questions_answered,
            });
          }
        }
      } catch (error) {
        console.error('Auth init error:', error);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const handleAuthSuccess = () => {
    // Refresh the page to reinitialize with the new user
    window.location.href = '/';
  };

  if (!initialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🇪🇸</div>
          <div className="text-white text-xl font-bold">Spanish Fun</div>
          <div className="text-white/70 mt-2">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter basename="/spanish-fun">
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/auth" 
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <AuthScreen onAuthSuccess={handleAuthSuccess} />
              )
            } 
          />
          
          {/* Protected Routes with Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomeScreen />} />
            <Route path="units" element={<UnitListScreen />} />
            <Route path="unit/:unitId" element={<UnitDetailScreen />} />
            <Route path="leaderboard" element={<div className="p-4 text-center text-gray-500">Leaderboard coming soon!</div>} />
            <Route path="profile" element={<div className="p-4 text-center text-gray-500">Profile coming soon!</div>} />
            <Route path="settings" element={<div className="p-4 text-center text-gray-500">Settings coming soon!</div>} />
            <Route path="quick-quiz" element={<div className="p-4 text-center text-gray-500">Quick Quiz coming soon!</div>} />
            <Route path="journey" element={<div className="p-4 text-center text-gray-500">Journey Mode coming soon!</div>} />
            <Route path="flashcards" element={<div className="p-4 text-center text-gray-500">Flashcards coming soon!</div>} />
            <Route path="ai-chat" element={<div className="p-4 text-center text-gray-500">AI Chat coming soon!</div>} />
            <Route path="study-guide/:unitId" element={<div className="p-4 text-center text-gray-500">Study Guide coming soon!</div>} />
            <Route path="play/:unitId/:gameId" element={<div className="p-4 text-center text-gray-500">Game loading...</div>} />
          </Route>
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}
