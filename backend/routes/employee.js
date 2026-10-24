const express = require('express');
const router = express.Router();
const Employee = require('./models/employee');
router.get('/', async (req, res) => {
  try {
    const employees = await employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/', async (req, res) => {
  try {
    const { name, email, department, role, salary } = req.body;
    const newEmployee = new employee({ name, email, department, role, salary });
    await newEmployee.save();
    res.status(201).json({ message: "Employee registered successfully!", newEmployee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;