
const express = require('express');
const router = express.Router();

const Employee = require('../models/Employee');
const Company = require('../models/company');

router.post('/query', async (req, res) => {
  try {
    const { question } = req.body;

    if (typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({
        error: 'Please enter a question.'
      });
    }

    const q = question.toLowerCase().trim();
    if (
      q.includes('company') ||
      q.includes('working hours') ||
      q.includes('admin email')
    ) {
      const company = await Company.findOne();

      if (!company) {
        return res.json({
          answer: 'No company has been set up yet. Admin needs to set it up.'
        });
      }

      if (q.includes('working hours')) {
        return res.json({
          answer: `Company working hours are ${company.workingHours}.`
        });
      }

      if (q.includes('admin email')) {
        return res.json({
          answer: `The registered admin email is ${company.adminEmail}.`
        });
      }

      return res.json({
        answer: `The registered company is ${company.companyName}. Working hours: ${company.workingHours}.`
      });
    }
    if (q.includes('department')) {
      const departments = await Employee.aggregate([
        {
          $group: {
            _id: '$department',
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]);

      if (!departments.length) {
        return res.json({
          answer: 'No employees are registered yet, so there are no department records.'
        });
      }

      const summary = departments
        .map(item => `${item._id}: ${item.count}`)
        .join(', ');

      return res.json({
        answer: `Employees by department: ${summary}.`,
        data: departments
      });
    }
    if (q.includes('active employee')) {
      const count = await Employee.countDocuments({ status: 'Active' });

      return res.json({
        answer: `There are currently ${count} active employees.`
      });
    }
    if (
      q.includes('employee') ||
      q.includes('staff') ||
      q.includes('headcount')
    ) {
      const count = await Employee.countDocuments();

      return res.json({
        answer: `There are currently ${count} registered employees in the system.`
      });
    }

    return res.json({
      answer: "I can answer questions about company details, working hours, total employees, active employees, and department-wise employee counts. Please try one of these topics."
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
