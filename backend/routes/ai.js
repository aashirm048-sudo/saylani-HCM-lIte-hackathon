const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const Activity = require('../models/Activity');
const Company = require('./models/Company');

router.post('/query', async (req, res) => {
  try {
    const { question } = req.body;
    const lowerQ = question.toLowerCase();

    // Real database queries based on user action numbers
    if (lowerQ.includes('how many employees') || lowerQ.includes('total employees')) {
      const count = await Employee.countDocuments();
      return res.json({ answer: `There are currently ${count} registered employees in the system.` });
    }

    if (lowerQ.includes('company') || lowerQ.includes('setup')) {
      const company = await Company.findOne();
      if (!company) return res.json({ answer: "No company has been set up yet. Admin needs to initialize it." });
      return res.json({ answer: `The company is registered as ${company.companyName} with working hours: ${company.workingHours}.` });
    }

    res.json({ answer: "I am connected to the live HCM database, but I couldn't match your query to a live data metric." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;