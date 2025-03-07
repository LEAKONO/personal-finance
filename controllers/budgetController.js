const Budget = require('../models/Budget');

// Add Budget
exports.addBudget = async (req, res) => {
  const { category, limit, year, month } = req.body;

  try {
    const budget = new Budget({ category, limit, year, month, user: req.userId });
    await budget.save();
    res.status(201).json({ message: 'Budget added successfully', budget });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get All Budgets
exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.userId }).sort({ year: -1, month: -1 });
    res.status(200).json(budgets);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update Budget
exports.updateBudget = async (req, res) => {
  const { id } = req.params;
  const { category, limit, year, month } = req.body;

  try {
    const budget = await Budget.findOneAndUpdate(
      { _id: id, user: req.userId },
      { category, limit, year, month },
      { new: true, runValidators: true }
    );

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.status(200).json({ message: 'Budget updated successfully', budget });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete Budget
exports.deleteBudget = async (req, res) => {
  const { id } = req.params;

  try {
    const budget = await Budget.findOneAndDelete({ _id: id, user: req.userId });

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};