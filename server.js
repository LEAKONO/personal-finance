const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const financialGoalRoutes = require('./routes/financialGoalRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const balanceRoutes = require('./routes/balanceRoutes');
const summaryRoutes = require('./routes/summaryRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/financial-goals', financialGoalRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api', balanceRoutes);
app.use('/api', summaryRoutes);




// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});