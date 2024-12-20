import React, { useState, useEffect } from 'react';
import { getTickets } from '../../lib/api/tickets';
import type { Ticket } from '../../lib/types/tickets';
import { MessageSquare, AlertCircle, Clock } from 'lucide-react';

export function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const data = await getTickets();
      setTickets(data);
    } catch (error) {
      console.error('Failed to load tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading tickets...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Your Support Tickets</h2>
      </div>
      <div className="divide-y">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">{ticket.title}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(ticket.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  ticket.priority === 'high' ? 'bg-red-100 text-red-800' :
                  ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {ticket.priority}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  ticket.status === 'open' ? 'bg-blue-100 text-blue-800' :
                  ticket.status === 'in_progress' ? 'bg-purple-100 text-purple-800' :
                  ticket.status === 'resolved' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {ticket.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>
        ))}
        {tickets.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No tickets found
          </div>
        )}
      </div>
    </div>
  );
}