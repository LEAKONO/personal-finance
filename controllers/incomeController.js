const Income = require('../models/Income');

const addIncome = async (req, res) => {
  const { amount, source, date, description } = req.body;
  try {
    const income = new Income({ amount, source, date, description, user: req.userId });
    await income.save();
    res.status(201).json({ message: 'Income added successfully', income });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.userId }).sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update Income
const updateIncome = async (req, res) => {
  const { id } = req.params;
  const { amount, source, date, description } = req.body;
  try {
    const income = await Income.findOneAndUpdate(
      { _id: id, user: req.userId },
      { amount, source, date, description },
      { new: true, runValidators: true }
    );
    if (!income) return res.status(404).json({ message: 'Income not found' });
    res.status(200).json({ message: 'Income updated successfully', income });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await Income.findOneAndDelete({ _id: id, user: req.userId });
    if (!income) return res.status(404).json({ message: 'Income not found' });
    res.status(200).json({ message: 'Income deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { addIncome, getIncomes, updateIncome, deleteIncome };