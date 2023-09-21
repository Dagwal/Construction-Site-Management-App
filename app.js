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
const stockController = require('./controllers/stockController');
const users = require('./models/user');

const path = require('path')
const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
  res.render('landing/landing');
});
app.get('/login', (req, res) => {
  res.render('users/login');
});

app.post('/login', async(req, res) => {
  try {
    const check = await users.findOne({ email: req.body.email});
    console.log(check);
    if (check.password === req.body.password) {
      console.log('Login Successful');
      res.redirect('/dashboard', { message: 'Login Successful' }, 200);
    }
    else {
      console.log('Invalid Credentials');
      res.redirect('/login', { message: 'Invalid Credentials' }, 401);
    }
  } catch (error) {
    console.log(error);
    res.redirect('/login', { message: 'Invalid Credentials' }, 401);
  }
  
});
app.get('/signup', (req, res) => {
  res.render('users/signup', { title: 'Sign Up' });
});

app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validate the sign up form
  const errors = {};
  if (!firstName) {
    errors.firstName = 'First name is required.';
  }
  if (!lastName) {
    errors.lastName = 'Last name is required.';
  }
  if (!email) {
    errors.email = 'Email is required.';
  }
  // if (!phoneNumber) {
  //   errors.phoneNumber = 'Phone number is required.';
  // }
  if (!password) {
    errors.password = 'Password is required.';
  }

  // If there are any errors, return them to the user
  if (Object.keys(errors).length > 0) {
    return res.status(400).send(errors);
  }

  // Create a new user
  const user = new users({
    firstName,
    lastName,
    email,
    password
  });

  // Save the user to the database
  await user.save();

  // Redirect the user to the login page
  res.redirect('/login', );
});
// Define a route for the dashboard page
app.get('/dashboard',  (req, res) => {
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
app.get('/stocks', async (req, res) => {
  const stockRecords = await stockController.getAllStocks(req, res);
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

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}