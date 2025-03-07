const mongoose = require('mongoose');

const FinancialGoalSchema = new mongoose.Schema({
  goalName: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  targetDate: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('FinancialGoal', FinancialGoalSchema);