export interface AuthHistoryEntry {
  id: string;
  user_id: string;
  event_type: 'login' | 'signup';
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}