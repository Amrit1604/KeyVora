// Test if MongoDB connection is the issue
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/keyvora';

console.log('Attempting to connect to MongoDB...');
console.log('URI pattern:', mongoURI.substring(0, 20) + '...');

mongoose.connect(mongoURI, { 
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 5000,
})
  .then(() => {
    console.log('✓ MongoDB connection successful!');
    mongoose.connection.close();
    process.exit(0);
  })
  .catch(err => {
    console.error('✗ MongoDB connection failed:', err.message);
    console.error('This is why pad creation is failing.');
    process.exit(1);
  });
