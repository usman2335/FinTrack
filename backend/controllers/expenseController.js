const Expense = require("../models/Expense");

const getExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    if (!expenses || expenses.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No expenses found" });
    }
    res.json({ success: true, data: expenses });
  } catch (error) {
    console.error("Error fetching expenses: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const addExpense = async (req, res) => {
  const userId = req.user.id;
  const { amount, title, category, date } = req.body;

  if (!amount || !category) {
    return res
      .status(400)
      .json({ success: false, message: "Amount and category are required" });
  }
  try {
    const newExpense = new Expense({
      userId,
      title,
      amount,
      category,
      date: date ? new Date(date) : new Date(),
    });
    await newExpense.save();
    res.status(201).json({ success: true, data: newExpense });
  } catch (error) {
    console.error("Error adding expense: ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const calculateMonthlyExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const { month, year } = req.params;
    if (!month || !year) {
      return res
        .status(400)
        .json({ success: false, message: "Month and year are required" });
    }
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);
    const expenses = await Expense.find({
      userId,
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    });
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    res.json({ success: true, total });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error calculating monthly expense",
    });
  }
};

const calculateWeeklyExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const { week, month, year } = req.params;
    if (!week || !month || !year) {
      return res.status(400).json({
        success: false,
        message: "Week, month, and year are required",
      });
    }
    const startDate = new Date(year, month - 1, (week - 1) * 7 + 1);
    const endDate = new Date(year, month - 1, week * 7 + 1);
    const expenses = await Expense.find({
      userId,
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    });
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    res.json({ success: true, total });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error calculating weekly expense",
    });
  }
};

const getWeeklyBreakdown = async (req, res) => {
  try {
    const userId = req.user.id;
    const { week, month, year } = req.params;
    if (!week || !month || !year) {
      return res.status(400).json({
        success: false,
        message: "Week, month, and year are required",
      });
    }

    const startDate = new Date(year, month - 1, (week - 1) * 7 + 1);
    const endDate = new Date(year, month - 1, week * 7 + 1);

    const expenses = await Expense.find({
      userId,
      date: { $gte: startDate, $lt: endDate },
    });

    const dailyTotals = {
      Sunday: 0,
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
    };

    expenses.forEach((expense) => {
      const day = new Date(expense.date).toLocaleString("en-US", {
        weekday: "long",
      });
      dailyTotals[day] += expense.amount;
    });

    res.json({ success: true, data: dailyTotals });
  } catch (error) {
    console.error("Error in getWeeklyBreakdown:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getExpenses,
  addExpense,
  calculateMonthlyExpense,
  calculateWeeklyExpense,
  getWeeklyBreakdown,
};
