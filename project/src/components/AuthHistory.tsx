import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getAuthHistory } from '../lib/auth-history';
import type { AuthHistoryEntry } from '../lib/types';
import { Clock } from 'lucide-react';

export function AuthHistory() {
  const { user } = useAuth();
  const [history, setHistory] = useState<AuthHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    try {
      const data = await getAuthHistory(user!.id);
      setHistory(data);
    } catch (error) {
      console.error('Failed to load auth history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading history...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Login History</h2>
      </div>
      <div className="divide-y">
        {history.map((entry) => (
          <div key={entry.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium capitalize">{entry.event_type}</p>
                <p className="text-sm text-gray-500">
                  {new Date(entry.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
        {history.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No login history available
          </div>
        )}
      </div>
    </div>
  );
}