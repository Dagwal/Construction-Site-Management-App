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
const employeeController = require('./controllers/employeeController');
const users = require('./models/user');
const materialController = require('./controllers/materialController');
const { EmployeeTable } = require('./models/Employee');
const { ContractTable, ContractArchiveTable } = require('./models/Contract');
const path = require('path')
const app = express();

const initializePassport = require('./passport-config');
const { MaterialTable } = require('./models/Material');
const { WorkDone, WorkDoneArchiveTable } = require('./models/WorkDone');
const { StockTable1, StockTable2 } = require('./models/Stock');
const {UsedMaterialTable, UsedMaterialArchiveTable} = require('./models/usedmaterial');

initializePassport(passport)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', './Templates/views/');
app.use(flash())
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
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

// app.get('/logout', (req, res) => {
//   console.log('logout');
//   req.session.destroy(function (err) {
//     if (err) {
//     console.log(err);
//     res.status(500).send(err);
//     } else {
//       res.clearCookie('connect.sid');
//       res.redirect('/');
//     }
// });
// });

// Define a route for the dashboard page
app.get('/dashboard', ensureAuthenticated, async (req, res) => {

    const workArchiveRecords = await WorkDoneArchiveTable.find();
    const ContractArchive = await ContractArchiveTable.find();
    res.render('dashboard/dashboard', { workArchiveRecords, ContractArchive });
});

// Define a route for the contract page
app.get('/contracts',ensureAuthenticated, async (req, res) => {
  await contractController.getAllContracts(req, res);
});

app.get('/contracts/editcontract/:id', ensureAuthenticated, async (req, res) => {
  const contractRecord = await ContractTable.findById(req.params.id);
  res.render('dashboard/updateanddelete/editcontract', { contractRecord });
});

app.post('/contracts/editcontract/:id', ensureAuthenticated, async (req, res) => {
  try {
    const updatedContract = await ContractTable.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false });
    console.log("Updated contract : ", updatedContract);
    res.redirect('/contracts');
  } catch (err) {
    console.log(err);
  }
});

app.get('/contracts/deletecontract/:id', ensureAuthenticated, async (req, res) => {
  try {
    const deletecontract = await ContractTable.findByIdAndDelete(req.params.id, req.body, { useFindAndModify: false });
    console.log("work deleted : ", deletecontract);
    res.redirect('/contracts');
  } catch (err) {
    console.log(err);
  }
});

// Define a route for the employees page
app.get('/employee', ensureAuthenticated, async (req, res) => {
  await employeeController.getAllEmployees(req, res);
});

app.get('/employee/editemployee/:id', ensureAuthenticated, async (req, res) => {
  try {
      const employeeRecord = await EmployeeTable.findById(req.params.id);
      res.render('dashboard/updateanddelete/editemployee', { employeeRecord });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
});

app.post('/employee/editemployee/:id', ensureAuthenticated, async (req, res) => {
  try {
    const updatedemployee = await EmployeeTable.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false });
    console.log("Updated employee : ", updatedemployee);
    res.redirect('/employee');
  } catch (err) {
    console.log(err);
  }
});

app.get('/employee/deleteemployee/:id', ensureAuthenticated, async (req, res) => {
  try {
    const updatedemployee = await EmployeeTable.findByIdAndDelete(req.params.id, req.body, { useFindAndModify: false });
    console.log("employee deleted : ", updatedemployee);
    res.redirect('/employee');
  } catch (err) {
    console.log(err);
  }
});

// Define a route for the stocks page
app.get('/materialinventory', ensureAuthenticated, async (req, res) => {
  const stockRecords = await stockController.getAllStocks(req, res);
});

app.get('/materialinventory/usedmaterials', ensureAuthenticated, async (req, res) => {
  const materialRecords = await MaterialTable.find();
  const usedMaterialRecords = await UsedMaterialTable.find();
  return res.render('dashboard/usedmaterials', { materials: materialRecords, usedMaterialRecords});
})

app.post('/materialinventory/usedmaterials', ensureAuthenticated, async (req, res) => {
  try {
    // Extract data from the request body
    const {itemNumber, materialName, materialTypeSize, quantity, unitMesurment, price} = req.body

    // Create a new stock entry in Table 1
    const newUsedMaterial = await UsedMaterialTable({
        itemNumber,
        materialName,
        materialTypeSize,
        quantity,
        unitMesurment,
        price
    });

    await newUsedMaterial.save();
    const newUsedMaterialArchive = new UsedMaterialArchiveTable({
        itemNumber: newUsedMaterial.itemNumber,
        materialName: newUsedMaterial.materialName,
        materialTypeSize: newUsedMaterial.materialTypeSize,
        quantity: newUsedMaterial.quantity,
        unitMesurment: newUsedMaterial.unitMesurment,
        price: newUsedMaterial.price,
      });
      newUsedMaterialArchive.save();
      // Update the quantity of the existing contract archive schema object, or create a new one if it does not exist.
      const usedMaterialArchive = await StockTable2.findOne({materialName: newUsedMaterialArchive.materialName, 
        materialTypeSize: newUsedMaterialArchive.materialTypeSize});
        console.log("usedMaterialArchive", usedMaterialArchive.quantity);
        console.log("newUsedMaterialArchive", newUsedMaterialArchive.quantity);
      if (usedMaterialArchive.quantity > newUsedMaterialArchive.quantity) {
        console.log("working")
        await StockTable2.findOneAndUpdate(
          { itemNumber: newUsedMaterialArchive.itemNumber, materialName: newUsedMaterialArchive.materialName, materialTypeSize: newUsedMaterialArchive.materialTypeSize,
            unitMesurment: newUsedMaterialArchive.unitMesurment, price: newUsedMaterialArchive.price},
          { $inc: { quantity: -newUsedMaterialArchive.quantity } },
          { upsert: true, new: true },
        );
        res.redirect('/materialinventory/usedmaterials');
          } else {
            // The contract quantity is less than zero.
            const materialRecords = await MaterialTable.find();
            const usedMaterialRecords = await UsedMaterialTable.find();
            res.render('dashboard/usedmaterials', { message: 'Material quantity is less than zero',  materials: materialRecords, usedMaterialRecords });
    } 
} catch (error) {
    console.error(error);
    res.status(500).json({error: "Server error"})
}
})

app.get('/materialinventory/editmaterialinventory/:id', ensureAuthenticated, async (req, res) => {
  const materialRecords = await MaterialTable.find();
  const materialRecord = await StockTable1.findById(req.params.id);
  res.render('dashboard/updateanddelete/editmaterial', { materialRecord, materials: materialRecords });
});

app.post('/materialinventory/editmaterialinventory/:id', ensureAuthenticated, async (req, res) => {
  try {
    const updatedMaterialInventory = await StockTable1.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false });
    console.log("Updated contract : ", updatedMaterialInventory);
    res.redirect('/materialinventory');
  } catch (err) {
    console.log(err);
  }
});

app.get('/materialinventory/deletematerialinventory/:id', ensureAuthenticated, async (req, res) => {
  try {
    const deleteMaterial = await StockTable1.findByIdAndDelete(req.params.id, req.body, { useFindAndModify: false });
    console.log("work deleted : ", deleteMaterial);
    res.redirect('/materialinventory');
  } catch (err) {
    console.log(err);
  }
});

app.get('/materialinventory/usedmaterials/editusedmaterial/:id', ensureAuthenticated, async (req, res) => {
  const materialRecords = await MaterialTable.find();
  const usedMaterialRecords = await UsedMaterialTable.findById(req.params.id);
  res.render('dashboard/updateanddelete/editusedmaterial', { usedMaterialRecords, materials: materialRecords });
});

app.post('/materialinventory/usedmaterials/editusedmaterial/:id', ensureAuthenticated, async (req, res) => {
  try {
    const updatedUsedMaterial = await UsedMaterialTable.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false });
    console.log("Updated used material : ", updatedUsedMaterial);
    res.redirect('/materialinventory/usedmaterials');
  } catch (err) {
    console.log(err);
  }
});

app.get('/materialinventory/usedmaterials/deleteusedmaterial/:id', ensureAuthenticated, async (req, res) => {
  try {
    const deleteUsedMaterial = await UsedMaterialTable.findByIdAndDelete(req.params.id, req.body, { useFindAndModify: false });
    console.log("work deleted : ", deleteUsedMaterial);
    res.redirect('/materialinventory/usedmaterials');
  } catch (err) {
    console.log(err);
  }
});

app.get('/works', ensureAuthenticated, async (req, res) => {
  const workRecords = await WorkDone.find();
  const ContractArchive = await ContractArchiveTable.find();
  res.render('dashboard/workDone', { works: workRecords, ContractArchive});
});

app.get('/works/editworks/:id', ensureAuthenticated, async (req, res) => {
  try {
      const workRecord = await WorkDone.findById(req.params.id);
      res.render('dashboard/updateanddelete/editworkdone', { work: workRecord });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
});

app.post('/works/editworks/:id', ensureAuthenticated, async (req, res) => {
  try {
    const updatedWork = await WorkDone.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false });
    console.log("Updated User : ", updatedWork);
    res.redirect('/works');
  } catch (err) {
    console.log(err);
  }
});

app.get('/works/deleteworks/:id', ensureAuthenticated, async (req, res) => {
  try {
    const updatedWork = await WorkDone.findByIdAndDelete(req.params.id, req.body, { useFindAndModify: false });
    console.log("work deleted : ", updatedWork);
    res.redirect('/works');
  } catch (err) {
    console.log(err);
  }
});

// Define a route for the stocks page
app.get('/contract/addContract', ensureAuthenticated, async (req, res) => {

  const comulitiveContract = await ContractArchiveTable.find();
  res.render('dashboard/add/addcontract', {comulitiveContract});
  
});

// Define a route for the stocks page
app.get('/stock/addStock', ensureAuthenticated, async (req, res) => {

  // const materialRecords = await materialController.getAllMaterials(req, res);
  const materialRecords = await StockTable2.find();
  return res.render('dashboard/add/addstock', { stockTable1Records: materialRecords});
});

app.get('/materialinventory/usedmaterials/totalusedmaterials', ensureAuthenticated, async (req, res) => {

  // const materialRecords = await materialController.getAllMaterials(req, res);
  const materialRecords = await UsedMaterialTable.find();
  return res.render('dashboard/add/totalusedmaterials', { stockTable1Records: materialRecords});
});

// Define a route for the stocks page
app.get('/employee/addEmployee', ensureAuthenticated, async (req, res) => {
  console.log(typeof EmployeeTable);
  const employees = await EmployeeTable.find();
   return res.render('dashboard/add/addemployee', { employees });
});

// Define a route for the stocks page
app.get('/works/addWorks', ensureAuthenticated, async (req, res) => {
  const cumulativework = await WorkDone.find();
  res.render('dashboard/add/addworks', {cumulativework});
});

app.post('/works/addWorks', ensureAuthenticated, async (req, res) => {
  try {
    // Extract the data from the request body
    const { itemNumber, buildingComponent, itemName, unit, quantity, unitPrice } = req.body;

    // Create a new contract entry in ContractTable
    const newWorkRecord = new WorkDone({
      itemNumber,
      buildingComponent,
      itemName,
      unit,
      quantity,
      unitPrice,
    });

    await newWorkRecord.save();

    const newWorkArchive = new WorkDoneArchiveTable({
      itemNumber: newWorkRecord.itemNumber,
      buildingComponent: newWorkRecord.buildingComponent,
      itemName: newWorkRecord.itemName,
      unit: newWorkRecord.unit,
      quantity: newWorkRecord.quantity,
      unitPrice: newWorkRecord.unitPrice,
    });
        newWorkArchive.save();
    // Update the quantity of the existing contract archive schema object, or create a new one if it does not exist.
    const ContractArchive = await ContractArchiveTable.findOne({buildingComponent: newWorkArchive.buildingComponent, 
      itemName: newWorkArchive.itemName});
    if (ContractArchive.quantity > newWorkArchive.quantity) {
      await ContractArchiveTable.findOneAndUpdate(
        { itemNumber: newWorkArchive.itemNumber, buildingComponent: newWorkArchive.buildingComponent, itemName: newWorkArchive.itemName,
          unit: newWorkArchive.unit, unitPrice: newWorkArchive.unitPrice},
        { $inc: { quantity: -newWorkArchive.quantity } },
        { upsert: true, new: false },
      );
      res.redirect('/works');
        } else {
          // The contract quantity is less than zero.
          const workRecords = await WorkDone.find();
          const ContractArchive = await ContractArchiveTable.find();
          res.render('dashboard/workDone', { message: 'Contract quantity is less than zero', works: workRecords, ContractArchive });
  } 
}catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
// Routes 
app.use('/api/contracts', contractRoutes);
app.use('/api/materialinventory', stockRoutes);
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