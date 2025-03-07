const express = require('express');
const { addIncome, getIncomes, updateIncome, deleteIncome } = require('../controllers/incomeController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Use authMiddleware.authenticate for authentication
router.post('/', authMiddleware.authenticate, addIncome); 
router.get('/', authMiddleware.authenticate, getIncomes); 
router.put('/:id', authMiddleware.authenticate, updateIncome); 
router.delete('/:id', authMiddleware.authenticate, deleteIncome);

module.exports = router;