const mongoose = require('mongoose');

// User Schema
const categoriesSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    type: { type: String, required: true } 
});

const transactionsSchema = new mongoose.Schema({
    type: { type: String, required: true }, 
    category: { type: String, required: true }, 
    amount: { type: Number, required: true }, 
    date: { type: Date, default: Date.now }, 
    description: { type: String },
});


   
// Model creation
const Category = mongoose.model('Categories', categoriesSchema);
const Transaction = mongoose.model('Transactions', transactionsSchema);

module.exports = {Category, Transaction}
