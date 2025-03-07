const express = require('express');
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware.authenticate, transactionController.getAllTransactions);

router.get('/recent-transactions', authMiddleware.authenticate, transactionController.getRecentTransactions);

module.exports = router;