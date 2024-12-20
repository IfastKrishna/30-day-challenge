const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Expense = require("./models/Expense");

const app = express();

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/expenseDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Set EJS as the template engine
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Routes
app.get("/", async (req, res) => {
  const expenses = await Expense.find().sort({ date: -1 });
  const balance = expenses.reduce(
    (total, expense) => total - expense.amount,
    0
  );
  res.render("index", { expenses, totalAmount: balance });
});

app.get("/add-expense", (req, res) => {
  res.render("add-expense");
});

app.post("/add-expense", async (req, res) => {
  const { name, category, amount } = req.body;
  await Expense.create({
    name,
    category,
    amount,
    date: Date.now(),
  });
  res.redirect("/");
});

app.get("/delete-expense/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.redirect("/");
});
// Start Server
const PORT = 8000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
