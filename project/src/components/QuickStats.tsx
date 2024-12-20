import React from 'react';
import { Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function QuickStats() {
  const stats = [
    { label: 'Active Users', value: '2,451', icon: Users, color: 'bg-blue-500' },
    { label: 'Pending Tickets', value: '13', icon: Clock, color: 'bg-yellow-500' },
    { label: 'Resolved Today', value: '47', icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Critical Issues', value: '2', icon: AlertCircle, color: 'bg-red-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
            <div className={`${stat.color} p-3 rounded-full`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}