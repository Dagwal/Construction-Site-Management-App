const { EmployeeTable } = require('../models/Employee');
// Controller functions for CRUD operations on employees

// Controller function to get all Employee in EmployeeTable
exports.getAllEmployees = async (req, res) => {
    try {
        const employeesRecord = await EmployeeTable.find();
        return res.render('dashboard/employee', { employees: employeesRecord});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" })
    }
};

// Controller function to create Employee in EmployeeTable by id
exports.getEmployeeById = async (req, res) => {
    try {
      const employee = await EmployeeTable.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.json(employee);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

// Controller function to create Employee in EmployeeTable
exports.createEmployee = async (req, res) => {
    try {
        // Extract data from the request body
        const { name, proficiency, salary, Attendance, date } = req.body;
        // Create a new Employee in Employeetable
        const newEmployee = await EmployeeTable.create({
            name,  proficiency, salary, Attendance, date
        });
        res.redirect('/employee')
    } catch (err) {
        console.error(err);
        res.render('dashboard/add/addemployee', { error: "Server error" });
    }
};

// Controller function to update Employees in EmployeeTable by thier ID 
exports.updateEmployeeById = async (req, res) => {
    try {
        const updatedEmployee = await EmployeeTable.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true },
        ); 

        if (!updatedEmployee) {
            return res.status(404).json({ error: "Employee not found" })
        }
        res.json(updatedEmployee);
    } catch (err){
        console.error(err);
        res.status(500).json({error: "Server error"});
    }
};


// Controller function to update Employees in EmployeeTable by thier ID 
exports.deleteEmployeeById= async (req, res) => {
    try{
        const deletedEmployee = await EmployeeTable.findByIdAndDelete(req.params.id);
        if (!deletedEmployee){
            return res.status(404).json({error: "Employee not found"});
        }
        res.json({message: "Employee removed successfully!!"})
    } catch (err){
        console.error(err);
        res.json(500).json({error: "Server error"})
    }
};