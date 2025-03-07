const Income = require('../models/Income');
const Expense = require('../models/Expense');

exports.getMonthlySummary = async (req, res) => {
  try {
    const userId = req.userId;
    const { year, month } = req.query;

    // Validate month and year
    if (month < 1 || month > 12) {
      return res.status(400).json({ message: 'Invalid month. Must be between 1 and 12.' });
    }
    if (year < 1900 || year > new Date().getFullYear()) {
      return res.status(400).json({ message: 'Invalid year.' });
    }

    // Calculate start and end of the month
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);

    // Fetch incomes and expenses for the month
    const incomes = await Income.find({
      user: userId,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

    const expenses = await Expense.find({
      user: userId,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    res.status(200).json({
      total_income: totalIncome, // Use snake_case for consistency
      total_expenses: totalExpenses, // Use snake_case for consistency
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message }); // Include error message
  }
};