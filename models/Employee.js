const mongoose = require('mongoose');

const workDaySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  hoursWorked: {
    type: Number,
    required: true,
  },
  attendanceStatus: {
    type: String,
    enum: ['Present', 'Leave'],
    required : true,
  },
});

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  proficiency: {
    type: String,
    enum: ['Formal', 'Site Engineer', 'Office Engineer', 'Data Collector', 'Deliver'],
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  workDays: [workDaySchema], // Array of workDay documents
});

const EmployeeTable = mongoose.model('Employee', employeeSchema);
module.exports = { EmployeeTable }  
