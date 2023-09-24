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
        const nameOfMaterial = await MaterialTable.findOne({ materialName: req.body.materialName });
        const typeOrSizeOfMaterial = await MaterialTable.findOne({ materialTypeSize: req.body.materialTypeSize });
        const materialRecords = await MaterialTable.find();
        if (nameOfMaterial || typeOrSizeOfMaterial) {
            return res.render('dashboard/add/addstock', { message: 'Material with that name, size or type already exists', materials: materialRecords})
        }
    
        // if (typeOrSizeOfMaterial) {
        //     return res.render('dashboard/add/addstock', { message: 'Material  size or type already exists' })
        // }
        // Extract the data from the request body
        const {itemNumber, materialName, materialTypeSize } = req.body;

        // Create a new material entry
        const newMaterial = await MaterialTable.create({
            itemNumber,
            materialName,
            materialTypeSize,
        });
        res.redirect('/materialinventory');
    } catch (error) {
        console.error(error);
        return res.render('dashboard/add/addstock', { message: 'Error creating material' }, 500)
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
