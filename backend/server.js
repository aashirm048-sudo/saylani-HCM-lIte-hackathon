const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

const companyRoutes = require('./routes/company');
const employeeRoutes = require('./routes/employee');
const aiRoutes = require('./routes/ai');

app.get('/', (req, res) => {
  res.json({ message: 'HCM Lite API is running' });
});

app.use('/api/company', companyRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/ai', aiRoutes);

module.exports = app;
