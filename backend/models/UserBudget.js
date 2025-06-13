const mongoose = require("mongoose");

const weeklyBudgetSchema = new mongoose.Schema({
  week: Number,
  amount: {
    type: Number,
    required: true,
  },
});

const monthlyBudgetSchema = new mongoose.Schema({
  month: Number, // e.g. "May"
  year: Number,
  totalBudget: Number,
  weeklyBudgets: [weeklyBudgetSchema],
});

const userBudgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  budgets: [monthlyBudgetSchema],
});

module.exports = mongoose.model("UserBudget", userBudgetSchema);
