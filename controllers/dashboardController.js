const WorkDone = require('../models/WorkDone');

// Function to calculate overall progress
exports.getOverallProgress = async (req, res) => {
  try {
    const totalRecords = await WorkDone.countDocuments({});
    const completedRecords = await WorkDone.countDocuments({ status: 'Completed' });

    const overallProgress = (completedRecords / totalRecords) * 100;

    res.json({ overallProgress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Function to calculate progress by each item
exports.getProgressByItem = async (req, res) => {
  try {
    const progressByItem = await WorkDone.aggregate([
      {
        $group: {
          _id: '$itemNumber', // Group by itemNumber
          total: { $sum: 1 },
          completed: {
            $sum: {
              $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          itemNumber: '$_id',
          progress: { $multiply: [{ $divide: ['$completed', '$total'] }, 100] },
        },
      },
    ]);

    res.json(progressByItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
