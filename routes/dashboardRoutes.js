const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Get overall progress
router.get('/overall', dashboardController.getOverallProgress);

// Get progress by each item
router.get('/by-item', dashboardController.getProgressByItem);

module.exports = router;
