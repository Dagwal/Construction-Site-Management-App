const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');

// Define routes for creating, reading, updating, and deleting materials
router.post('/', materialController.createMaterial);
router.get('/', materialController.getAllMaterials);
router.get('/:id', materialController.getMaterialById);
router.put('/:id', materialController.updateMaterialById);
router.delete('/:id', materialController.deleteMaterialById);

module.exports = router;
