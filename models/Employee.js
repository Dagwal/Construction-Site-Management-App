const mongoose = require('mongoose');

// const workDaySchema = new mongoose.Schema({
//   date: {
//     type: Date,
//     required: true,
//   },
//   hoursWorked: {
//     type: Number,
//     required: true,
//   },
//   attendanceStatus: {
//     type: String,
//     enum: ['Present', 'Absent'],
//     required : true,
//   },
// });

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  proficiency: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  Attendance: {
    type: String,
    required : true,
  },
  date: {
    type: Date,
    required: true,
  },
  
  // Array of workDay documents
});

const EmployeeTable = mongoose.model('Employee', employeeSchema);
module.exports = { EmployeeTable }  
