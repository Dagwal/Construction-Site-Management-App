const {WorkDone} = require('../models/WorkDone');

// Controller function to get overall progress
exports.getOverallProgress = async (req, res) => {
  try {
    // Calculate overall progress logic goes here
    // You need to query the database and perform calculations as per your requirements
    
    // For example, let's say you want to calculate the total cost of all work records
    const totalCost = await WorkDone.aggregate([
      {
        $group: {
          _id: null,
          totalCost: { $sum: { $multiply: ['$unitPrice', '$measurement'] } },
        },
      },
    ]);

    if (totalCost.length > 0) {
      const overallProgress = totalCost[0].totalCost;
      res.json({ overallProgress });
    } else {
      res.json({ overallProgress: 0 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller function to get progress by each item
exports.getProgressByItem = async (req, res) => {
  try {
    // Calculate progress by item logic goes here
    // You need to query the database and perform calculations as per your requirements
    
    // For example, let's say you want to calculate the total cost for each item
    const progressByItem = await WorkDone.aggregate([
      {
        $group: {
          _id: '$itemNumber',
          totalCost: { $sum: { $multiply: ['$unitPrice', '$measurement'] } },
        },
      },
    ]);

    res.json(progressByItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
