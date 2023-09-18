const WorkTable = require('../models/WorkDone');

exports.createWorkRecord = async (req, res) => {
    try {
        const {itemNumber, unit, unitPrice, measurement} = req.body;

        const newWorkRecord = await WorkTable.create({
            itemNumber, unit, unitPrice, measurement
        });
        res.status(201).json(newWorkRecord)
    } catch (err){
        console.error(err);
        res.status(500).json({error: "Server error"})
    }
}