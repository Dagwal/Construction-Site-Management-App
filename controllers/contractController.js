const { trusted } = require('mongoose');
const { ContractTable, ContractArchiveTable } = require('../models/Contract');


// Controller function to get all contract from ContractTable
exports.getAllContracts = async (req, res) => {
  try {
    const contractRecords = await ContractTable.find();
    res.render('dashboard/contracts', { contractRecords });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller function to create a new contract entry in ContractTable
exports.createContract = async (req, res) => {
  try {
    // Extract the data from the request body
    const { itemNumber, buildingComponent, itemName, unit, quantity, unitPrice } = req.body;

    // Create a new contract entry in ContractTable
    const newContract = await ContractTable.create({
      itemNumber,
      buildingComponent,
      itemName,
      unit,
      quantity,
      unitPrice,
    });

    const newContractArchive = new ContractArchiveTable({
      itemNumber: newContract.itemNumber,
      buildingComponent: newContract.buildingComponent,
      itemName: newContract.itemName,
      unit: newContract.unit,
      quantity: newContract.quantity,
      unitPrice: newContract.unitPrice,
    });
      // newContractArchive.save();
    //Update the quantity of the existing contract archive schema object, or create a new one if it does not exist.
    await ContractArchiveTable.findOneAndUpdate(
      { itemNumber: newContractArchive.itemNumber, buildingComponent: newContractArchive.buildingComponent, itemName: newContractArchive.itemName,
        unit: newContractArchive.unit, unitPrice: newContractArchive.unitPrice},
      { $inc: { quantity: newContractArchive.quantity } },
      { upsert: true, new: true },
    );

    res.redirect('/contracts');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to create contract: ${error.message}` });
  }
};
