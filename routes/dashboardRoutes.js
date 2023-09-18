const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Define routes for getting dashboard statistics
router.get('/overall-progress', dashboardController.getOverallProgress);
router.get('/progress-by-item', dashboardController.getProgressByItem);

module.exports = router;
