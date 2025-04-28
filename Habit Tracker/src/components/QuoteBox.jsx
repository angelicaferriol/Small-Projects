import React from 'react';
import { Quote } from 'lucide-react';

const quotes = [
  "Small daily improvements lead to stunning results over time.",
  "Motivation gets you started. Habit keeps you going.",
  "Your habits shape your identity, and your identity shapes your habits.",
  "The quality of your life depends on the quality of your habits.",
  "Success is the product of daily habits—not once-in-a-lifetime transformations."
];

function QuoteBox({ quote, setQuote }) {
  const refreshQuote = () => {
    let newQuote;
    do {
      newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (newQuote === quote);
    setQuote(newQuote);
  };

  return (
    <div className="p-4 bg-indigo-50 rounded-lg shadow-sm">
      <div className="flex items-center mb-2">
        <Quote size={20} className="text-indigo-600 mr-2" />
        <h3 className="font-medium text-indigo-800">Daily Motivation</h3>
      </div>
      <p className="text-gray-700 italic">{quote}</p>
      <button 
        onClick={refreshQuote} 
        className="mt-2 text-indigo-600 text-sm hover:text-indigo-800"
      >
        New Quote
      </button>
    </div>
  );
}

export default QuoteBox;