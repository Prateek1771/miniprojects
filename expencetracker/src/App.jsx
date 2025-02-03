import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  PlusCircle, 
  Edit2, 
  Trash2 
} from 'lucide-react';

// Expense Item Component
const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  const getColorForCategory = (category) => {
    const categoryColors = {
      'Food': 'bg-red-900/20 border-red-700',
      'Transport': 'bg-blue-900/20 border-blue-700',
      'Entertainment': 'bg-green-900/20 border-green-700',
      'Utilities': 'bg-yellow-900/20 border-yellow-700',
      'Shopping': 'bg-purple-900/20 border-purple-700'
    };
    return categoryColors[category] || 'bg-gray-800 border-gray-700';
  };

  return (
    <div className={`flex justify-between items-center p-4 rounded-lg mb-2 border ${getColorForCategory(expense.category)}`}>
      <div>
        <div className="font-semibold text-gray-200">{expense.description}</div>
        <div className="text-sm text-gray-400">
          {expense.category} | {new Date(expense.date).toLocaleDateString()}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="font-bold text-lg text-gray-100">${expense.amount.toFixed(2)}</span>
        <button 
          onClick={() => onEdit(expense)} 
          className="p-2 hover:bg-gray-700 rounded-full transition"
        >
          <Edit2 className="h-5 w-5 text-gray-400 hover:text-gray-200" />
        </button>
        <button 
          onClick={() => onDelete(expense.id)} 
          className="p-2 hover:bg-red-900/30 rounded-full transition"
        >
          <Trash2 className="h-5 w-5 text-red-500 hover:text-red-400" />
        </button>
      </div>
    </div>
  );
};

// Expense Tracker Main Component
const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [editingExpense, setEditingExpense] = useState(null);
  const [filter, setFilter] = useState({
    category: 'All',
    startDate: '',
    endDate: ''
  });

  // Categories for expense tracking
  const categories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Shopping'];

  // Calculate total expenses
  useEffect(() => {
    const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    setTotalExpenses(total);
  }, [expenses]);

  // Add or update expense
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingExpense) {
      // Update existing expense
      setExpenses(expenses.map(exp => 
        exp.id === editingExpense.id 
          ? { ...newExpense, id: editingExpense.id } 
          : exp
      ));
      setEditingExpense(null);
    } else {
      // Add new expense
      const newExpenseItem = {
        ...newExpense,
        id: Date.now(),
        amount: parseFloat(newExpense.amount)
      };
      setExpenses([...expenses, newExpenseItem]);
    }
    
    // Reset form
    setNewExpense({
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  // Filter expenses
  const filteredExpenses = expenses.filter(expense => {
    const categoryMatch = filter.category === 'All' || expense.category === filter.category;
    const startDateMatch = !filter.startDate || new Date(expense.date) >= new Date(filter.startDate);
    const endDateMatch = !filter.endDate || new Date(expense.date) <= new Date(filter.endDate);
    
    return categoryMatch && startDateMatch && endDateMatch;
  });

  // Categorize expenses for insights
  const categoryBreakdown = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Title Section with Gradient */}
        <div className="mb-12 text-center bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 p-6 rounded-lg shadow-2xl">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
            Expense Tracker Pro
          </h1>
          <p className="text-gray-300 mt-2">Track, Analyze, and Optimize Your Spending</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-400">Total Expenses</h3>
              <Wallet className="h-5 w-5 text-indigo-500" />
            </div>
            <div className="text-2xl font-bold text-gray-100">${totalExpenses.toFixed(2)}</div>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-400">Highest Expense</h3>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-100">
              ${Math.max(...expenses.map(e => e.amount), 0).toFixed(2)}
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-400">Spending Trend</h3>
              <TrendingDown className="h-5 w-5 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-gray-100">
              {expenses.length > 0 ? 'Tracking' : 'No Data'}
            </div>
          </div>
        </div>

        {/* Expense Input Form */}
        <form 
          onSubmit={handleSubmit} 
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 mb-8 border border-gray-700 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Description"
              value={newExpense.description}
              onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
              className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
              min="0"
              step="0.01"
              className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <select
              value={newExpense.category}
              onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
              className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="" className="bg-gray-800">Select Category</option>
              {categories.map(category => (
                <option key={category} value={category} className="bg-gray-800">{category}</option>
              ))}
            </select>
            <input
              type="date"
              value={newExpense.date}
              onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
              className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <button 
              type="submit" 
              className="md:col-span-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-2 rounded-md hover:from-purple-700 hover:to-indigo-700 transition flex items-center justify-center"
            >
              {editingExpense ? 'Update Expense' : 'Add Expense'}
              <PlusCircle className="ml-2 h-5 w-5" />
            </button>
          </div>
        </form>

        {/* Filtering Options */}
        <div className="mb-6 flex flex-wrap gap-4">
          <select
            value={filter.category}
            onChange={(e) => setFilter({...filter, category: e.target.value})}
            className="p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="All">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category} className="bg-gray-800">{category}</option>
            ))}
          </select>
          <input
            type="date"
            placeholder="Start Date"
            value={filter.startDate}
            onChange={(e) => setFilter({...filter, startDate: e.target.value})}
            className="p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="date"
            placeholder="End Date"
            value={filter.endDate}
            onChange={(e) => setFilter({...filter, endDate: e.target.value})}
            className="p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Expense List */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center text-gray-200">
            <PieChart className="mr-2 h-6 w-6 text-purple-500" /> Expense List
          </h2>
          {filteredExpenses.length === 0 ? (
            <div className="text-center text-gray-500">No expenses found</div>
          ) : (
            filteredExpenses.map(expense => (
              <ExpenseItem 
                key={expense.id} 
                expense={expense} 
                onEdit={(exp) => {
                  setEditingExpense(exp);
                  setNewExpense(exp);
                }}
                onDelete={(id) => setExpenses(expenses.filter(e => e.id !== id))}
              />
            ))
          )}
        </div>

        {/* Category Breakdown */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-200">Category Breakdown</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(categoryBreakdown).map(([category, total]) => (
              <div 
                key={category} 
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700 shadow-md"
              >
                <div className="text-sm font-medium text-gray-400 mb-2">{category}</div>
                <div className="text-lg font-bold text-gray-100">${total.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;