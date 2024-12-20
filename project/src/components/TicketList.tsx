import React from 'react';
import { MessageSquare, AlertCircle, Clock } from 'lucide-react';

export function TicketList() {
  const tickets = [
    {
      id: 1,
      title: 'Cannot access game server',
      priority: 'High',
      status: 'Open',
      time: '2h ago',
      user: 'John Doe',
    },
    {
      id: 2,
      title: 'Payment not processed',
      priority: 'Medium',
      status: 'In Progress',
      time: '4h ago',
      user: 'Jane Smith',
    },
    {
      id: 3,
      title: 'Character stuck in tutorial',
      priority: 'Low',
      status: 'Open',
      time: '6h ago',
      user: 'Mike Johnson',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Recent Tickets</h2>
      </div>
      <div className="divide-y">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">{ticket.title}</p>
                  <p className="text-sm text-gray-500">Reported by {ticket.user}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
                  ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {ticket.priority}
                </span>
                <span className="text-sm text-gray-500 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {ticket.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}