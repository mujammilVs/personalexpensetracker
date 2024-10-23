const express = require("express");
require("dotenv").config()
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {addNewtransaction,getAllTrasactions,getTransactionById,updatedTransactionById,deleteTransactionById,transactionSummary} = require("./controllers/TransactionsControllers")
const { Transaction, Category } = require("./models/userModel");
app.use(express.json());
app.use(bodyParser.json())
mongoose.connect(
  "mongodb+srv://muzammilvs23:3bNTDncZJmCMqAjZ@expensetracker.ysab6.mongodb.net/?retryWrites=true&w=majority&appName=expensetracker"
);
const port =  process.env.PORT || 4000;


async function insert() {
  const category = await Category.create({
    name: "Food",
    type: "Food expenses",
  });

  await Transaction.create({
    type: "income",
    category: category.name,
    amount: 500,
    date: new Date("2023-02-10"),
    description: "Payment for food",
  });
}

insert();

const JWT_SECRET = process.env.JWT_SECRET

//API Endpoints
// add a new transactions
app.post("/transactions",addNewtransaction )
// get all transactions
app.get("/transactions", getAllTrasactions)
// get ransaction by id
app.get("/transactions/:id", getTransactionById) 
// Update a transaction by ID
app.put("/transactions/:id", updatedTransactionById)
// Delete a transaction by ID
app.delete("/transactions/:id", deleteTransactionById)
// Get summary of transactions 
app.get("/summary",transactionSummary );



  
http.listen(port, function () {
  console.log(`server is running on port  ${port}`);
});
