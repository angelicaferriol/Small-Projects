import React from 'react';
import { Check } from 'lucide-react';

function HabitCard({ habit, onComplete, onDelete }) {
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completedDates.includes(today);
  
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <span className="text-2xl mr-2">{habit.icon}</span>
          <h3 className="font-medium text-gray-800">{habit.name}</h3>
        </div>
        <button 
          onClick={() => onDelete(habit.id)}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Remove
        </button>
      </div>
      
      <div className="flex justify-between items-center mt-3">
        <div>
          <div className="text-sm text-gray-500 mb-1">
            <span className="font-medium text-indigo-600">{habit.streak}</span> day streak
          </div>
          <div className="text-sm text-gray-500">
            <span className="font-medium text-indigo-600">{habit.points}</span> points earned
          </div>
        </div>
        
        <button
          onClick={() => onComplete(habit.id)}
          disabled={isCompletedToday}
          className={`flex items-center px-3 py-2 rounded-md ${
            isCompletedToday 
              ? 'bg-green-100 text-green-700 cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          <Check size={16} className="mr-1" />
          {isCompletedToday ? 'Completed' : 'Complete'}
        </button>
      </div>
    </div>
  );
}

export default HabitCard;