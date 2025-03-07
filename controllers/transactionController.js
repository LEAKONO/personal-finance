const Income = require('../models/Income');
const Expense = require('../models/Expense');

// Get All Transactions (Incomes and Expenses)
exports.getAllTransactions = async (req, res) => {
  try {
    const userId = req.userId;

    // Fetch all incomes and expenses for the user
    const incomes = await Income.find({ user: userId }).sort({ date: -1 });
    const expenses = await Expense.find({ user: userId }).sort({ date: -1 });

    // Combine incomes and expenses into a single response
    const transactions = {
      incomes,
      expenses,
    };

    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get Recent Transactions (Last 5 Incomes and Expenses)
exports.getRecentTransactions = async (req, res) => {
  try {
    const userId = req.userId;

    // Fetch the 5 most recent incomes and expenses
    const recentIncomes = await Income.find({ user: userId })
      .sort({ date: -1 })
      .limit(5);

    const recentExpenses = await Expense.find({ user: userId })
      .sort({ date: -1 })
      .limit(5);

    // Combine recent incomes and expenses into a single response
    const transactions = {
      recent_incomes: recentIncomes, // Use snake_case for consistency
      recent_expenses: recentExpenses, // Use snake_case for consistency
    };

    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};