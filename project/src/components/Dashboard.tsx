import React from 'react';
import { TicketList } from './TicketList';
import { QuickStats } from './QuickStats';
import { FAQSection } from './FAQSection';
import { AuthHistory } from './AuthHistory';

export function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <QuickStats />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <TicketList />
        </div>
        <div className="space-y-8">
          <AuthHistory />
          <FAQSection />
        </div>
      </div>
    </div>
  );
}