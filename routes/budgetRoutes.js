const express = require('express');
const { addBudget, getBudgets, updateBudget, deleteBudget } = require('../controllers/budgetController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware.authenticate, addBudget);
router.get('/', authMiddleware.authenticate, getBudgets);
router.put('/:id', authMiddleware.authenticate, updateBudget);
router.delete('/:id', authMiddleware.authenticate, deleteBudget);

module.exports = router;