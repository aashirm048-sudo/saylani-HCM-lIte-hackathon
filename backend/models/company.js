const mongoose = require('mongoose');
const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  workingHours: { type: String, required: true },
  adminEmail: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Company', companySchema);