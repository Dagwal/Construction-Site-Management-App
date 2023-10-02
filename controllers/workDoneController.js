const WorkDone = require('../models/WorkDone'); 

// Controller function to create a new work record
exports.createWorkRecord = async (req, res) => {
  try {
    // Extract data from the request body
    const { itemNumber, buildingComponent, itemName, unit, quantity, unitPrice} = req.body;

    // Create a new work record
    const newWorkRecord = new WorkDone({
      itemNumber,
      buildingComponent,
      itemName,
      unit,
      quantity,
      unitPrice,
    });

    // Save the work record to the database
    const savedWorkRecord = await newWorkRecord.save();

    res.redirect('/works/addWorks'); // Respond with the saved record
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' }); // Handle errors gracefully
  }
};
