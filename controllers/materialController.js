const { MaterialTable } = require('../models/Material');

// Controller function to get all materials
exports.getAllMaterials = async (req, res) => {
    try {
        const materialRecords = await MaterialTable.find();
        res.json(materialRecords);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller function to get Material in MaterialTable by id
exports.getMaterialById = async (req, res) => {
    try {
      const material = await MaterialTable.findById(req.params.id);
      if (!material) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.json(material);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };


// Controller function to create a new material entry
exports.createMaterial = async (req, res) => {
    try {
        // Extract the data from the request body
        const { materialName, materialTypeSize } = req.body;

        // Create a new material entry
        const newMaterial = await MaterialTable.create({
            materialName,
            materialTypeSize,
        });
        res.json(newMaterial);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller function to update a material entry by ID
exports.updateMaterialById = async (req, res) => {
    try {
        const updatedMaterial = await MaterialTable.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedMaterial) {
            return res.status(404).json({ error: 'Material entry not found' });
        }
        res.json(updatedMaterial);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller function to delete a material entry by ID
exports.deleteMaterialById = async (req, res) => {
    try {
        const deletedMaterial = await MaterialTable.findByIdAndDelete(req.params.id);

        if (!deletedMaterial) {
            return res.status(404).json({ error: 'Material entry not found' });
        }
        res.json({ message: 'Material entry deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
