const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/database');
const Stocks = require('./models/Stock'); // Import Stock model
const path = require('path');
const connectFlash = require('connect-flash');
const session = require('express-session');

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './Templates/views/');
app.use(connectFlash());

// Express session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));
// Connect to MongoDB
mongoose.connect(config.uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {
  app.listen(3000);
  console.log('Server started on port 3000');
})
.catch(err => console.log(err));

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

app.get('/signup', (req, res) => {
  res.render('users/signup');
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
  Stocks.find().sort({ createdAt: -1})
  .then(result => {
  res.render('dashboard/stocks', {stocks: result, title: 'Stocks'})
})
  .catch(err => console.log(err))
});

app.get('/stock/addStock', (req, res) => {
  res.render('dashboard/add/addstock', {title: 'Add Stock', req});
});

app.post('/stocks', (req, res) => {
  const stocks = [];

  if (req.body.itemNo) {
    for (let i = 0; i < req.body.itemNo.length; i++) {
      const stock = new Stocks({
        itemNumber: req.body.itemNumber[i],
        materialName: req.body.materialName[i],
        materialTypeSize: req.body.materialTypeSize[i],
        unit: req.body.unit[i],
        quantity: req.body.quantity[i]
      });

      stocks.push(stock.save());
    }
  }

  Promise.all(stocks)
    .then(() => {
      // Set a success message in the session
      req.flash('success', 'The stocks have been saved successfully.');

      // Redirect the user to the stocks page
      res.redirect('/stocks');
    })
    .catch(err => {
      // Set an error message in the session
      req.flash('error', err.message);

      // Redirect the user to the stocks page
      res.redirect('/stocks');
    });
});
// // Define a route for the stocks page
// app.get('/contract/addContract', (req, res) => {
//   res.render('dashboard/add/addcontract');
  
// });


// // Define a route for the stocks page

// // Define a route for the stocks page
// app.get('/employee/addEmployee', (req, res) => {
//   res.render('dashboard/add/addemployee');
// });

// // Define a route for the stocks page
// app.get('/works/addWorks', (req, res) => {
//   res.render('dashboard/add/addworks');
// });

// // Routes 
// app.use('/api/contracts', contractRoutes);
// app.use('/api/stocks', stockRoutes);
// app.use('/api/materials', materialRoutes);
// app.use('/api/employees', employeeRoutes);

// // app.use('/api/dashboard', dashboardRoutes);



// // // Serve static HTML files from the 'Template' directory
// // app.use(express.static(path.join(__dirname, 'Templates' )));



// // Serve static files from the 'Templates/public' directory
// // app.use(express.static(path.join(__dirname, 'Templates', 'views')));
  
// // Serve HTML files directly from the 'views' directory
