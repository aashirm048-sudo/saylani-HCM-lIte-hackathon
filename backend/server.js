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
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  async function startServer() {
    try {
      await mongoose.connect(
        process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hcm-lite'
      );
      console.log('MongoDB Connected Successfully');

      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Server startup failed:', error.message);
      process.exit(1);
    }
  }
  startServer();
}
