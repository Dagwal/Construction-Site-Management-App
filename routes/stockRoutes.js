const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

// Define routes for retrieving and inserting data for stocks in Table 1
router.get('/', stockController.getAllStocks); // GET all stocks from Table 1
router.post('/', stockController.createStock); // POST a new stock entry to Table 1
router.put('/:id', stockController.updateStock); // PUT (update) a stock entry in Table 1 by ID
router.delete('/:id', stockController.deleteStock); // DELETE a stock entry in Table 1 by ID


// Define routes for retrieving, inserting, updating, and deleting data for Table 2
router.get('/table2', stockController.getTable2Data); // GET all data from Table 2
// router.post('/table2', stockController.createTable2Entry); // POST a new entry to Table 2
// router.put('/table2/:id', stockController.updateTable2Entry); // PUT (update) an entry in Table 2 by ID
// router.delete('/table2/:id', stockController.deleteTable2Entry); // DELETE an entry in Table 2 by ID

module.exports = router;































// // Import necessary modules and Stock model
// const express = require('express');
// const router = express.Router();
// const Stock = require('../models/Stock');

// // POST: Create a new stock item
// router.post('/', async (req, res) => {
//   try {
//     const { itemNumber, materialName, materialTypeSize, quantity } = req.body;

//     // Create a new stock item object
//     const newStockItem = new Stock({
//       itemNumber,
//       materialName,
//       materialTypeSize,
//       quantity,
//     });

//     // Save the new stock item to the database
//     await newStockItem.save();

//     res.status(201).json(newStockItem);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // GET: Get all stock items
// router.get('/', async (req, res) => {
//     try {
//       const stockItems = await Stock.find();
//       res.json(stockItems);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Server error' });
//     }
// });

// // PUT: Update a stock item by ID
// router.put('/:id', async (req, res) => {
//     try {
//       const { itemNumber, materialName, materialTypeSize, quantity } = req.body;
//       const updatedStockItem = await Stock.findByIdAndUpdate(
//         req.params.id,
//         { itemNumber, materialName, materialTypeSize, quantity },
//         { new: true }
//       );
//       if (!updatedStockItem) {
//         return res.status(404).json({ error: 'Stock item not found' });
//       }
//       res.json(updatedStockItem);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Server error' });
//     }
// });
  
// // DELETE: Delete a stock item by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const deletedStockItem = await Stock.findByIdAndRemove(req.params.id);
//     if (!deletedStockItem) {
//       return res.status(404).json({ error: 'Stock item not found' });
//     }
//     res.json(deletedStockItem);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;
