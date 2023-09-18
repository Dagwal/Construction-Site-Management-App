const express = require('express');
const router = express.Router();
const workController = require('../controllers/workController');

// Create a new work record
router.post('/', workController.createWorkRecord);

module.exports = router;
