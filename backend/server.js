
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hcm-lite')
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.error('DB Connection Error:', err));
const companyRoutes = require('./backend/routes/company');
const employeeRoutes = require('./routes/employee');
const aiRoutes = require('./routes/ai');
app.use('/api/company', companyRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/ai', aiRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
