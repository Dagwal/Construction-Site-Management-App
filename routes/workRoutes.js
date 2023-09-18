const express = require('express');
const router = express.Router();
const workDoneController = require('../controllers/workDoneController');

// Define routes for creating work records
router.post('/', workDoneController.createWorkRecord);

module.exports = router;
