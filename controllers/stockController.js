const { trusted } = require('mongoose');
const { StockTable1, StockTable2 } = require('../models/Stock'); // Import your Stock models

// Controller function to get all stocks from Table 1
exports.getAllStocks = async (req, res) => {
    try {
        const stockTable1Records = await StockTable1.find(); // Retrieve all records from Table 1
        res.json(stockTable1Records);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller function to create a new stock entry in Table 1
exports.createStock = async (req, res) => {
    try {
        // Extract data from the request body
        const {itemNumber, materialName, materialTypeSize, quantity} = req.body

        // Create a new stock entry in Table 1
        const newStock = await StockTable1.create({
            itemNumber,
            materialName,
            materialTypeSize,
            quantity,
        });
        res.json(newStock);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Server error"})
    }
}

// Controller function to update a stock entry in Table 1 by ID
exports.updateStock = async (req, res) => {
  try {
    const updatedStock = await StockTable1.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedStock) {
      return res.status(404).json({ error: 'Stock entry not found' });
    }

    res.json(updatedStock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller function to delete a stock entry in Tavle 1 by ID
exports.deleteStock = async (req, res) => {
    try{
        const deletedStock = await StockTable1.findByIdAndDelete(req.params.id)

        if (!deletedStock) {
            return res.status(404).json({error: "Stock entry not found"})
        }
        res.json({message: 'Stock entry deleted successfully'})
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Server error"})
    }
}

// Controller function to get data from Table2
exports.getTable2Data = async (req, res) => {
    try {
        const stockTable2Records= await StockTable2.find();
        res.json(stockTable2Records)
    } catch (error){
        console.error(error)
        res.status(500).json({error: "Server error"})
    }
}

// Controller function to create data from Table2
exports.createTable2Entry = async (req, res) => {
    try {
        // Extract data from the request body
        const { materialName, materialTypeSize, totalQuantity } = req.body;

        // Create a new entry in tabke 2
        const newTable2Entry = await StockTable2.create({
            materialName,
            materialTypeSize,
            totalQuantity,
        });
        res.json(newTable2Entry)
    } catch (error){
        console.error(error)
        res.status(500).json({error: "Server error"})
    }
}

// Controller function to update data from Table2
exports.updateTable2Entry = async (req, res) => {
    try{
        const updatedTable2Entry= await StockTable2.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: trusted}
        );

        if (!updatedTable2Entry){
            res.status(404).json({message: "Table 2 entry not found"})
        }
        res.json(updatedTable2Entry)
    } catch (error){
        console.error(error)
        res.status(500).json({error: "Server error"})
    }
}

// Controller function to delete data from table2
exports.deleteTable2Entry = async (req, res) => {
    try{
        const deletedTable2Entry = await StockTable2.findByIdAndDelete(req.params.id)

        if (!deletedTable2Entry){
            res.status(404).json({message: "Table 2 not found"})
        }
        res.json({message: "Table 2 entry deleted successfully"})
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Server error"})
    }
}

