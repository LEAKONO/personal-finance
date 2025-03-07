const Expense = require('../models/Expense');

// Add Expense
exports.addExpense = async (req, res) => {
  const { amount, category, date, description } = req.body;

  try {
    const expense = new Expense({ amount, category, date, description, user: req.userId });
    await expense.save();
    res.status(201).json({ message: 'Expense added successfully', expense });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get All Expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update Expense
exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const { amount, category, date, description } = req.body;

  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: id, user: req.userId },
      { amount, category, date, description },
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense updated successfully', expense });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findOneAndDelete({ _id: id, user: req.userId });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};