const express = require('express');
const { addFinancialGoal, getFinancialGoals, updateFinancialGoal, deleteFinancialGoal } = require('../controllers/financialGoalController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware.authenticate, addFinancialGoal);
router.get('/', authMiddleware.authenticate, getFinancialGoals);
router.put('/:id', authMiddleware.authenticate, updateFinancialGoal);
router.delete('/:id', authMiddleware.authenticate, deleteFinancialGoal);

module.exports = router;