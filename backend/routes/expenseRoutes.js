const express = require("express");
const app = express();
const router = express.Router();
const {
  addExpense,
  getExpenses,
  calculateMonthlyExpense,
  calculateWeeklyExpense,
  getWeeklyBreakdown,
} = require("../controllers/expenseController");
const { authenticate } = require("../middleware/authenticate");

router.post("/", authenticate, addExpense);
router.get("/", authenticate, getExpenses);
router.get("/:month/:year", authenticate, calculateMonthlyExpense);
router.get("/:month/:year/:week", authenticate, calculateWeeklyExpense);
router.get(
  "/weekly-breakdown/:week/:month/:year",
  authenticate,
  getWeeklyBreakdown
);

module.exports = router;
