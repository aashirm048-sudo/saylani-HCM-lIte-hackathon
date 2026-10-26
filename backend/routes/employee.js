
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, department, role, salary } = req.body;

    if (
      !name?.trim() ||
      !email?.trim() ||
      !department?.trim() ||
      !role?.trim() ||
      salary === undefined ||
      salary === ''
    ) {
      return res.status(400).json({
        error: 'All employee fields are required.'
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Enter a valid email.' });
    }

    const parsedSalary = Number(salary);

    if (!Number.isFinite(parsedSalary) || parsedSalary < 0) {
      return res.status(400).json({
        error: 'Salary must be a valid non-negative number.'
      });
    }

    const existingEmployee = await Employee.findOne({
      email: email.trim().toLowerCase()
    });

    if (existingEmployee) {
      return res.status(409).json({
        error: 'An employee with this email already exists.'
      });
    }

    const newEmployee = await Employee.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      department: department.trim(),
      role: role.trim(),
      salary: parsedSalary
    });

    res.status(201).json({
      message: 'Employee registered successfully!',
      employee: newEmployee
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'An employee with this email already exists.'
      });
    }

    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
