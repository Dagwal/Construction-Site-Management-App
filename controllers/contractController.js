const { trusted } = require('mongoose');
const { ContractTable } = require('../models/Contract');

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
        unitPrice
      });
      res.redirect('/contracts');
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

