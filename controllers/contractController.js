const { trusted } = require('mongoose');
const { ContractTable } = require('../models/Contract');

// Controller function to get all contract from ContractTable
exports.getAllContracts = async (req, res) => {
    try {
      const contractRecords = await ContractTable.find();
      res.render('views/dashboard/contracts', { contractRecords });
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
        res.json(newContract)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller function to update a contract entry in ContractTable by ID
exports.updateContract = async (req, res) => {
    try {
        const updatedContract = await ContractTable.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedContract) {
            return res.status(404).json({ error: 'Contract entry not found' });
        }
        res.json(updatedContract);
    } catch (error){
        console.error(error);
        res.json(500).json({error: "Server error"});
    }
};

// Controller function to delete a contract entry in ContractTable by ID
exports.deleteContract = async (req, res) => {
    try {
        const deletedContract = await ContractTable.findByIdAndDelete(req.params.id);

        if (!deletedContract) {
            return res.status(404).json({error: 'Contract entry not found'});
        }
        res.json({message: 'Contract entry deleted sunccessfully'});
    } catch (error){
        console.error(error);
        res.status(500).json({error: 'Server error'})
    }
};