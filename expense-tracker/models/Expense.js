const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this expense."],
    },
    category: {
      type: String,
      enum: ["Food", "Transportation", "Housing", "Education", "Other"],
      required: [true, "Please provide a category for this expense."],
    },
    amount: {
      type: Number,
      required: [true, "Please provide an amount for this expense."],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["default", "trash"],
      default: "default",
    },
  },
  { timestamps: true }
);

const ExpenseModel = mongoose.model("Expense", ExpenseSchema);
module.exports = ExpenseModel;
