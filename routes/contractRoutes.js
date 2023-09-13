// routes/contractRoutes.js
const express = require('express');
const router = express.Router();
const Contract = require('../models/Contract');

// Get all contracts
router.get('/', async (req, res) => {
  try {
    const contracts = await Contract.find();
    res.json(contracts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new contract
router.post('/', async (req, res) => {
  const { itemNumber, description, unit, quantity, unitPrice } = req.body;

  try {
    const newContract = new Contract({ itemNumber, description, unit, quantity, unitPrice });

    // Save the new contract to the database
    await newContract.save();

    res.status(201).json(newContract);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT: Update a contract by ID
router.put('/:id', async (req, res) => {
  try { 
    const { itemNumber, description, unit, quantity, unitPrice } = req.body;
    const updatedContract = await Contract.findByIdAndUpdate(
      req.params.id,
      { itemNumber, description, unit, quantity, unitPrice },
      { new: true }
    );
    
    if (!updatedContract) {
      return res.status(404).json({ error: 'Contract not found' });
    }
    res.json(updatedContract);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE: Delete a contract by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedContract = await Contract.findByIdAndRemove(req.params.id);

    //  If the updatedContract is falsy (meaning it couldn't find a contract with the provided ID), it returns a 404 status code with a JSON response indicating that the contract was not found.
    if (!deletedContract) {
      return res.status(404).json({ error: 'Contract not found' });
    }
    res.json(deletedContract);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
