const mongoose = require('mongoose');
const activitySchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  type: { type: String, enum: ['Check-In', 'Leave Request', 'Task Update'], required: true },
  description: { type: String },
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Activity', activitySchema);