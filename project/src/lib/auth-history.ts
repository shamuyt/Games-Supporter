import { supabase } from './supabase';
import type { AuthHistoryEntry } from './types';

export const recordAuthEvent = async (
  userId: string,
  eventType: 'login' | 'signup'
) => {
  try {
    const { error } = await supabase
      .from('auth_history')
      .insert({
        user_id: userId,
        event_type: eventType,
        user_agent: navigator.userAgent,
      });

    if (error) throw error;
  } catch (err) {
    console.error('Failed to record auth event:', err);
  }
};

export const getAuthHistory = async (userId: string): Promise<AuthHistoryEntry[]> => {
  const { data, error } = await supabase
    .from('auth_history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};