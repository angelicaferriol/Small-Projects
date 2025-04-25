import { useState, useEffect } from 'react';
import { Calendar, Trophy, AlertTriangle } from 'lucide-react';
import HabitCard from './HabitCard';
import QuoteBox from './QuoteBox';

export default function HabitTracker() {
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : [
      { id: 1, name: 'Exercise', icon: '🏃‍♂️', streak: 0, lastCompleted: null, points: 0, completedDates: [] },
      { id: 2, name: 'Reading', icon: '📚', streak: 0, lastCompleted: null, points: 0, completedDates: [] },
      { id: 3, name: 'Meditation', icon: '🧘', streak: 0, lastCompleted: null, points: 0, completedDates: [] }
    ];
  });
  
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitIcon, setNewHabitIcon] = useState('🎯');
  const [totalPoints, setTotalPoints] = useState(0);
  const [quote, setQuote] = useState('');

  const quotes = [
    "Small daily improvements lead to stunning results over time.",
    "Motivation gets you started. Habit keeps you going.",
    "Your habits shape your identity, and your identity shapes your habits.",
    "The quality of your life depends on the quality of your habits.",
    "Success is the product of daily habits—not once-in-a-lifetime transformations."
  ];

  useEffect(() => {
    // Set random quote on load
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    
    // Save habits to localStorage whenever they change
    localStorage.setItem('habits', JSON.stringify(habits));
    
    // Calculate total points
    const points = habits.reduce((sum, habit) => sum + habit.points, 0);
    setTotalPoints(points);
  }, [habits]);

  const markCompleted = (id) => {
    const today = new Date().toISOString().split('T')[0];
    
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        // Check if already completed today
        if (habit.completedDates.includes(today)) {
          return habit;
        }
        
        const lastDate = habit.lastCompleted;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        // Calculate if streak continues or resets
        let newStreak = habit.streak;
        if (!lastDate || lastDate === yesterdayStr) {
          newStreak += 1; // Continue streak
        } else if (lastDate !== today) {
          newStreak = 1; // Reset streak
        }
        
        // Award points (1 for completion, bonus for streaks)
        const streakBonus = Math.floor(newStreak / 5) * 5; // Bonus every 5 days
        const pointsToAdd = 1 + (streakBonus > 0 ? streakBonus : 0);
        
        return {
          ...habit,
          streak: newStreak,
          lastCompleted: today,
          points: habit.points + pointsToAdd,
          completedDates: [...habit.completedDates, today]
        };
      }
      return habit;
    }));
  };

  const addNewHabit = () => {
    if (!newHabitName.trim()) return;
    
    const newHabit = {
      id: Date.now(),
      name: newHabitName,
      icon: newHabitIcon,
      streak: 0,
      lastCompleted: null,
      points: 0,
      completedDates: []
    };
    
    setHabits([...habits, newHabit]);
    setNewHabitName('');
    setNewHabitIcon('🎯');
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  // Get today's date in readable format
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Available icons for selection
  const iconOptions = ['🎯', '🏃‍♂️', '📚', '🧘', '💪', '🎨', '🎸', '🖌️', '🌱', '💧', '🍎', '💤'];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">Habit Tracker</h1>
        <p className="text-gray-600">{today}</p>
        
        <div className="mt-4">
          <QuoteBox quote={quote} setQuote={setQuote} />
        </div>
      </header>
      
      <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <Calendar size={20} className="mr-2 text-indigo-600" />
            My Habits
          </h2>
          <div className="flex items-center">
            <Trophy size={20} className="mr-2 text-yellow-500" />
            <span className="font-medium">{totalPoints} Points</span>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-3">
            <input
              type="text"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              placeholder="New habit name..."
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="relative">
              <select
                value={newHabitIcon}
                onChange={(e) => setNewHabitIcon(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none pr-8"
              >
                {iconOptions.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
            <button
              onClick={addNewHabit}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add Habit
            </button>
          </div>
        </div>
        
        {habits.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <AlertTriangle size={32} className="mx-auto mb-2 text-gray-400" />
            <p>No habits added yet. Add your first habit above!</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {habits.map(habit => (
              <HabitCard 
                key={habit.id} 
                habit={habit} 
                onComplete={markCompleted} 
                onDelete={deleteHabit} 
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
          <Trophy size={20} className="mr-2 text-yellow-500" />
          Rewards System
        </h2>
        
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          <div className="border border-gray-200 rounded-lg p-3">
            <h3 className="font-medium text-gray-700 mb-2">Points System</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• +1 point for each daily completion</li>
              <li>• +5 bonus points for every 5-day streak</li>
              <li>• Streaks reset if you miss a day</li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-3">
            <h3 className="font-medium text-gray-700 mb-2">Milestones</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 30 points: Beginner</li>
              <li>• 100 points: Consistent</li>
              <li>• 250 points: Dedicated</li>
              <li>• 500 points: Habit Master</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="font-medium text-gray-700 mb-2">Your Level</h3>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-indigo-600 h-4 rounded-full" 
              style={{ 
                width: `${Math.min(totalPoints / 5, 100)}%` 
              }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Beginner</span>
            <span>Consistent</span>
            <span>Dedicated</span>
            <span>Master</span>
          </div>
        </div>
      </div>
    </div>
  );
}