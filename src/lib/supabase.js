import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://evzwtkgajizutecyawdu.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signUp = async (email, password, displayName) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
      },
    },
  });
  return { data, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Profile helpers
export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const updateProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  return { data, error };
};

// Player stats helpers
export const getPlayerStats = async (userId) => {
  const { data, error } = await supabase
    .from('player_stats')
    .select('*')
    .eq('user_id', userId)
    .single();
  return { data, error };
};

// Unit progress helpers
export const getUnitProgress = async (userId) => {
  const { data, error } = await supabase
    .from('unit_progress')
    .select('*, units(*)')
    .eq('user_id', userId);
  return { data, error };
};

// Game session helpers
export const saveGameSession = async (session) => {
  const { data, error } = await supabase
    .from('game_sessions')
    .insert(session)
    .select()
    .single();
  return { data, error };
};

// Leaderboard helpers
export const getLeaderboard = async (period = 'weekly', limit = 10) => {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*')
    .eq('period', period)
    .order('total_xp', { ascending: false })
    .limit(limit);
  return { data, error };
};

// Units helpers
export const getUnits = async () => {
  const { data, error } = await supabase
    .from('units')
    .select('*')
    .eq('is_active', true)
    .order('unit_number');
  return { data, error };
};

// Questions helpers
export const getQuestionsByUnit = async (unitId, limit = 20) => {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('unit_id', unitId)
    .limit(limit);
  return { data, error };
};
