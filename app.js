const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const ejs = require('ejs');
const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const config = require('./config/database');
const contractRoutes = require('./routes/contractRoutes');
const stockRoutes = require('./routes/stockRoutes'); 
const materialRoutes = require('./routes/materialRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes')
const contractController = require('./controllers/contractController');
const stockController = require('./controllers/stockController');
const users = require('./models/user');
const Employee = require('./models/Employee');


const path = require('path')
const app = express();

const initializePassport = require('./passport-config')
initializePassport(passport)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', './Templates/views/');
app.use(flash())
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

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
app.get('/login', ensureNotAuthenticated, (req, res) => {
  res.render('users/login');
});

app.post('/login', ensureNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/signup', ensureNotAuthenticated,  (req, res) => {
  res.render('users/signup', { title: 'Sign Up' });
});

app.post('/signup', ensureNotAuthenticated, async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const existingUser = await users.findOne({ email });
  if (existingUser && password.length < 6) {
    return res.render('users/signup', { emailmessage: 'User already exists', passwordmessage: 'Password must be at least 6 characters', title: 'Sign Up' });
  }
  else if (password.length < 6) {
    return res.render('users/signup', { passwordmessage: 'Password must be at least 6 characters', title: 'Sign Up' });
  }
  else if (existingUser) {
    return res.render('users/signup', { emailmessage: 'Email already exists', title: 'Sign Up' });
  }

  // Create a new user
  const user = new users({
    firstName,
    lastName,
    email,
    password
  });

  // Save the user to the database
  try {
    await user.save();
    res.redirect('/login');
  } catch (error) {
    // Handle the error
    console.log(error);
    res.redirect('/signup', { message: 'Error creating user' }, 500);
    
  // Redirect the user to the login page
}});

app.get('/logout', (req, res) => {
  console.log('logout');
  req.session.destroy(function (err) {
    if (err) {
    console.log(err);
    res.status(500).send(err);
    } else {
      res.clearCookie('connect.sid');
      res.redirect('/');
    }
});
});

// Define a route for the dashboard page
app.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard/dashboard');
});

// Define a route for the contract page
app.get('/contracts',ensureAuthenticated, async (req, res) => {
  const contractRecords = await contractController.getAllContracts(req, res);
});

// Define a route for the employees page
app.get('/employee', ensureAuthenticated, (req, res) => {
  res.render( 'dashboard/employee');
});

// Define a route for the stocks page
app.get('/stocks', ensureAuthenticated, async (req, res) => {
  const stockRecords = await stockController.getAllStocks(req, res);
});

// Define a route for the stocks page
app.get('/contract/addContract', ensureAuthenticated, (req, res) => {
  res.render('dashboard/add/addcontract');
  
});

// Define a route for the stocks page
app.get('/stock/addStock', ensureAuthenticated, (req, res) => {
  res.render('dashboard/add/addstock');
});

// Define a route for the stocks page
app.get('/employee/addEmployee', ensureAuthenticated, (req, res) => {
  console.log(typeof Employee);
  res.render('dashboard/add/addemployee', { employees: Employee});
});

// Define a route for the stocks page
app.get('/works/addWorks', ensureAuthenticated, (req, res) => {
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
app.get('/logout', (req, res) => {
  console.log('logout');
  req.session.destroy(function (err) {
    if (err) {
    console.log(err);
    res.status(500).send(err);
    } else {
      res.clearCookie('connect.sid');
      res.redirect('/login');
    }
});
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function ensureNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  next();
}