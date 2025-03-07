const express = require('express');
const { addExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expenseController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware.authenticate, addExpense);
router.get('/', authMiddleware.authenticate, getExpenses);
router.put('/:id', authMiddleware.authenticate, updateExpense);
router.delete('/:id', authMiddleware.authenticate, deleteExpense);

module.exports = router;