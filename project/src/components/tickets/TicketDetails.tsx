import React, { useState, useEffect } from 'react';
import { getTicketResponses, addTicketResponse } from '../../lib/api/tickets';
import type { Ticket, TicketResponse } from '../../lib/types/tickets';
import { Send } from 'lucide-react';

interface Props {
  ticket: Ticket;
  onClose: () => void;
}

export function TicketDetails({ ticket, onClose }: Props) {
  const [responses, setResponses] = useState<TicketResponse[]>([]);
  const [newResponse, setNewResponse] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadResponses();
  }, [ticket.id]);

  const loadResponses = async () => {
    try {
      const data = await getTicketResponses(ticket.id);
      setResponses(data);
    } catch (error) {
      console.error('Failed to load responses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResponse.trim()) return;

    setSending(true);
    try {
      const response = await addTicketResponse(ticket.id, newResponse);
      setResponses([...responses, response]);
      setNewResponse('');
    } catch (error) {
      console.error('Failed to add response:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{ticket.title}</h2>
        <p className="text-gray-600">{ticket.description}</p>
      </div>

      <div className="space-y-4 mb-6">
        {responses.map((response) => (
          <div
            key={response.id}
            className={`p-4 rounded-lg ${
              response.is_staff_response
                ? 'bg-blue-50 ml-4'
                : 'bg-gray-50 mr-4'
            }`}
          >
            <p className="mb-2">{response.message}</p>
            <p className="text-sm text-gray-500">
              {new Date(response.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newResponse}
            onChange={(e) => setNewResponse(e.target.value)}
            placeholder="Type your response..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            disabled={sending}
          />
          <button
            type="submit"
            disabled={sending || !newResponse.trim()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </button>
        </div>
      </form>
    </div>
  );
}