const { trusted } = require('mongoose');
const { WorkDone, WorkDoneArchiveTable } = require('../models/WorkDone'); 
// Controller function to create a new work record
exports.createWorkRecord = async (req, res) => {
  try {
    // Extract the data from the request body
    const { itemNumber, buildingComponent, itemName, unit, quantity, unitPrice } = req.body;

    // Create a new contract entry in ContractTable
    const newWorkDone = await WorkDone.create({
      itemNumber,
      buildingComponent,
      itemName,
      unit,
      quantity,
      unitPrice,
    });

    const newWorkArchive = new WorkDoneArchiveTable({
      itemNumber: newWorkDone.itemNumber,
      buildingComponent: newWorkDone.buildingComponent,
      itemName: newWorkDone.itemName,
      unit: newWorkDone.unit,
      quantity: newWorkDone.quantity,
      unitPrice: newWorkDone.unitPrice,
    });

    // Update the quantity of the existing contract archive schema object, or create a new one if it does not exist.
    await WorkDoneArchiveTable.findOneAndUpdate(
      { itemNumber: newContractArchive.itemNumber, buildingComponent: newContractArchive.buildingComponent, itemName: newContractArchive.itemName,
        unit: newContractArchive.unit, unitPrice: newContractArchive.unitPrice},
      { $inc: { quantity: newContractArchive.quantity } },
      { upsert: true, new: true },
    );


    res.redirect('/works/addWorks'); // Respond with the saved record
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' }); // Handle errors gracefully
  }
};
