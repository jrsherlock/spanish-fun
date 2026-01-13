import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Main app store using Zustand
export const useStore = create(
  persist(
    (set, get) => ({
      // Auth state
      user: null,
      profile: null,
      isAuthenticated: false,
      isLoading: true,
      
      // Player stats
      stats: {
        totalXp: 0,
        currentLevel: 1,
        currentStreak: 0,
        bestStreak: 0,
        totalGamesPlayed: 0,
        totalCorrectAnswers: 0,
        totalQuestionsAnswered: 0,
      },
      
      // Current game state
      currentUnit: null,
      currentGame: null,
      gameScore: 0,
      gameStreak: 0,
      
      // UI state
      theme: 'light',
      soundEnabled: true,
      musicEnabled: true,
      
      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setProfile: (profile) => set({ profile }),
      setLoading: (isLoading) => set({ isLoading }),
      setStats: (stats) => set({ stats: { ...get().stats, ...stats } }),
      
      setCurrentUnit: (unit) => set({ currentUnit: unit }),
      setCurrentGame: (game) => set({ currentGame: game }),
      
      updateGameScore: (points) => set((state) => ({ 
        gameScore: state.gameScore + points 
      })),
      incrementStreak: () => set((state) => ({ 
        gameStreak: state.gameStreak + 1,
        stats: {
          ...state.stats,
          bestStreak: Math.max(state.stats.bestStreak, state.gameStreak + 1)
        }
      })),
      resetStreak: () => set({ gameStreak: 0 }),
      resetGameState: () => set({ gameScore: 0, gameStreak: 0 }),
      
      addXp: (amount) => set((state) => {
        const newXp = state.stats.totalXp + amount;
        const newLevel = Math.floor(Math.sqrt(newXp / 100)) + 1;
        return {
          stats: {
            ...state.stats,
            totalXp: newXp,
            currentLevel: newLevel,
          }
        };
      }),
      
      toggleTheme: () => set((state) => ({ 
        theme: state.theme === 'light' ? 'dark' : 'light' 
      })),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleMusic: () => set((state) => ({ musicEnabled: !state.musicEnabled })),
      
      logout: () => set({
        user: null,
        profile: null,
        isAuthenticated: false,
        currentUnit: null,
        currentGame: null,
        gameScore: 0,
        gameStreak: 0,
      }),
    }),
    {
      name: 'spanish-fun-storage',
      partialize: (state) => ({
        theme: state.theme,
        soundEnabled: state.soundEnabled,
        musicEnabled: state.musicEnabled,
        stats: state.stats,
      }),
    }
  )
);

export default useStore;
