const express = require('express');
const summaryController = require('../controllers/summaryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/monthly-summary', authMiddleware.authenticate, summaryController.getMonthlySummary);

module.exports = router;