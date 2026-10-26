
const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

router.get('/', async (req, res) => {
  try {
    const company = await Company.findOne();
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/setup', async (req, res) => {
  try {
    const { companyName, workingHours, adminEmail } = req.body;

    if (
      !companyName?.trim() ||
      !workingHours?.trim() ||
      !adminEmail?.trim()
    ) {
      return res.status(400).json({
        error: 'Company name, working hours and admin email are required.'
      });
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail);

    if (!emailIsValid) {
      return res.status(400).json({ error: 'Enter a valid admin email.' });
    }

    let company = await Company.findOne();

    if (company) {
      company.companyName = companyName.trim();
      company.workingHours = workingHours.trim();
      company.adminEmail = adminEmail.trim().toLowerCase();
      await company.save();
    } else {
      company = await Company.create({
        companyName: companyName.trim(),
        workingHours: workingHours.trim(),
        adminEmail: adminEmail.trim().toLowerCase()
      });
    }

    res.json({
      message: 'Company setup successful!',
      company
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
