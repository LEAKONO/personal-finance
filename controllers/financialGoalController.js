const FinancialGoal = require('../models/FinancialGoal');

// Add Financial Goal
exports.addFinancialGoal = async (req, res) => {
  const { goalName, targetAmount, currentAmount, targetDate } = req.body;

  try {
    const financialGoal = new FinancialGoal({ goalName, targetAmount, currentAmount, targetDate, user: req.userId });
    await financialGoal.save();
    res.status(201).json({ message: 'Financial goal added successfully', financialGoal });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get All Financial Goals
exports.getFinancialGoals = async (req, res) => {
  try {
    const financialGoals = await FinancialGoal.find({ user: req.userId }).sort({ targetDate: 1 });
    res.status(200).json(financialGoals);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update Financial Goal
exports.updateFinancialGoal = async (req, res) => {
  const { id } = req.params;
  const { goalName, targetAmount, currentAmount, targetDate } = req.body;

  try {
    const financialGoal = await FinancialGoal.findOneAndUpdate(
      { _id: id, user: req.userId },
      { goalName, targetAmount, currentAmount, targetDate },
      { new: true, runValidators: true }
    );

    if (!financialGoal) {
      return res.status(404).json({ message: 'Financial goal not found' });
    }

    res.status(200).json({ message: 'Financial goal updated successfully', financialGoal });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete Financial Goal
exports.deleteFinancialGoal = async (req, res) => {
  const { id } = req.params;

  try {
    const financialGoal = await FinancialGoal.findOneAndDelete({ _id: id, user: req.userId });

    if (!financialGoal) {
      return res.status(404).json({ message: 'Financial goal not found' });
    }

    res.status(200).json({ message: 'Financial goal deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};