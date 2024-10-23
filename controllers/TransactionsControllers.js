


// add a new transactions
const addNewtransaction = async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    const savedTransaction = await newTransaction.save();
    res.status(201).send(savedTransaction);
  } catch (error) {
    res.status(500).send("Error creating transaction");
  }
}

// get all transactions
const getAllTrasactions = async (req, res) => {
    try {
      const transactions = await Transaction.find();
      res.send(transactions);
    } catch (error) {
      res.status(500).send("Error fetching transations");
    }
  };
  // get ransaction by id
const getTransactionById = async (req, res) => {
    try {
      const transaction = await Transaction.findById(req.params.id);
      if (!transaction) {
        return res.status(404).send("Transaction not found");
      }
      res.send(transaction);
    } catch (error) {
      res.status(500).send("Error fetching transaction ");
    }
  };

  
  const updatedTransactionById =  async (req, res) => {
    try {
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedTransaction) {
        return res.status(404).send("Transaction not found");
      }
      res.send(updatedTransaction);
    } catch (error) {
      res.status(500).send("Error updating transaction");
    }
  }

  const deleteTransactionById =  async (req, res) => {
    try {
      const deletedTransaction = await Transaction.findByIdAndDelete(
        req.params.id
      );
      if (!deletedTransaction) {
        return res.status(404).send("Transaction not found");
      }
      res.send("Transaction deleted");
    } catch (error) {
      res.status(500).send("Error deleting transaction");
    }
  };

  const transactionSummary = async (req, res) => {
    try {
      const transactions = await Transaction.find();
  
      const summary = transactions.reduce(
        (acc, transaction) => {
          if (transaction.type === "income") {
            acc.totalIncome += transaction.amount;
          } else {
            acc.totalExpenses += transaction.amount;
          }
          return acc;
        },
        { totalIncome: 0, totalExpenses: 0 }
      );
  
      summary.balance = summary.totalIncome - summary.totalExpenses;
  
      res.send(summary);
    } catch (error) {
      res.status(500).send("Error fetching summary");
    }
  };
module.exports = {addNewtransaction,getAllTrasactions,getTransactionById, updatedTransactionById,deleteTransactionById,transactionSummary }