// controllers/balanceController.js
const Income = require('../models/Income');
const Expense = require('../models/Expense');

exports.getBalance = async (req, res) => {
  try {
    const userId = req.userId;

    // Calculate total income
    const incomes = await Income.find({ user: userId });
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

    // Calculate total expenses
    const expenses = await Expense.find({ user: userId });
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Calculate balance
    const balance = totalIncome - totalExpenses;

    res.status(200).json({ balance });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};