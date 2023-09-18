const WorkDone = require('../models/WorkDone'); 

// Controller function to create a new work record
exports.createWorkRecord = async (req, res) => {
  try {
    // Extract data from the request body
    const { itemNumber, unit, unitPrice, measurement } = req.body;

    // Create a new work record
    const newWorkRecord = new WorkDone({
      itemNumber,
      unit,
      unitPrice,
      measurement,
    });

    // Save the work record to the database
    const savedWorkRecord = await newWorkRecord.save();

    res.status(201).json(savedWorkRecord); // Respond with the saved record
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' }); // Handle errors gracefully
  }
};
