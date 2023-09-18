const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController.js');

// Defining routes for CRUD operations
router.get('/', employeeController.getAllEmployees);
router.post('/', employeeController.createEmployee);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', employeeController.updateEmployeeById);
router.delete('/:id', employeeController.deleteEmployeeById);

module.exports = router;
