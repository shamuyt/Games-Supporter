import React from 'react';
import { HelpCircle } from 'lucide-react';

export function FAQSection() {
  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'You can reset your password by clicking the "Forgot Password" link on the login page.',
    },
    {
      question: 'Where can I find my game ID?',
      answer: 'Your game ID can be found in the profile section after logging into your account.',
    },
    {
      question: 'How do I report a bug?',
      answer: 'Use the "Submit Ticket" button and select "Bug Report" from the category dropdown.',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Frequently Asked Questions</h2>
      </div>
      <div className="divide-y">
        {faqs.map((faq, index) => (
          <div key={index} className="p-4">
            <div className="flex items-start space-x-3">
              <HelpCircle className="h-5 w-5 text-indigo-500 mt-0.5" />
              <div>
                <h3 className="font-medium">{faq.question}</h3>
                <p className="text-sm text-gray-600 mt-1">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}