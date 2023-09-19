const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/database');
const contractRoutes = require('./routes/contractRoutes');
const stockRoutes = require('./routes/stockRoutes'); 
const materialRoutes = require('./routes/materialRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes')
const contractController = require('./controllers/contractController');

const path = require('path')
const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './Templates/views/');

// Connect to MongoDB
mongoose.connect(config.uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

app.use(express.static(path.join(__dirname, 'Templates')));

// Define a route for the landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Templates', 'views', 'landing', 'landing.html'));
});

// Define a route for the dashboard page
app.get('/dashboard', (req, res) => {
  res.render('dashboard/dashboard');
});

// Define a route for the contract page
app.get('/contracts', async (req, res) => {
  const contractRecords = await contractController.getAllContracts(req, res);
});

// Define a route for the employees page
app.get('/employee', (req, res) => {
  res.render( 'dashboard/employee');
});

// Define a route for the stocks page
app.get('/stocks', (req, res) => {
  res.render('dashboard/stocks');
});

// Define a route for the stocks page
app.get('/contract/addContract', (req, res) => {
  res.render('dashboard/add/addcontract');
  
});

// Define a route for the stocks page
app.get('/stock/addStock', (req, res) => {
  res.render('dashboard/add/addstock');
});

// Define a route for the stocks page
app.get('/employee/addEmployee', (req, res) => {
  res.render('dashboard/add/addemployee');
});

// Define a route for the stocks page
app.get('/works/addWorks', (req, res) => {
  res.render('dashboard/add/addworks');
});

// Routes 
app.use('/api/contracts', contractRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/employees', employeeRoutes);

// app.use('/api/dashboard', dashboardRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// // Serve static HTML files from the 'Template' directory
// app.use(express.static(path.join(__dirname, 'Templates' )));



// Serve static files from the 'Templates/public' directory
// app.use(express.static(path.join(__dirname, 'Templates', 'views')));
  
// Serve HTML files directly from the 'views' directory
