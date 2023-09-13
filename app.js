// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/database');
const contractRoutes = require('./routes/contractRoutes');
const stockRoutes = require('./routes/stockRoutes'); 

const app = express();

// Body parser middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(config.uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Routes
app.use('/api/contracts', contractRoutes);
app.use('/api/stocks', stockRoutes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
