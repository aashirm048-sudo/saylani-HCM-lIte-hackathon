const express = require('express');
const router = express.Router();
const Company = require('../models/company');

router.get('/', async (req, res) => {
  try {
    const company = await Company.findOne();
    res.json(company || { message: "No company set up yet" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/setup', async (req, res) => {
  try {
    const { companyName, workingHours, adminEmail } = req.body;
    let company = await Company.findOne();
    
    if (company) {
      company.companyName = companyName;
      company.workingHours = workingHours;
      company.adminEmail = adminEmail;
      await company.save();
    } else {
      company = new Company({ companyName, workingHours, adminEmail });
      await company.save();
    }
    
    res.json({ message: "Company setup successful!", company });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
