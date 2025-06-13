const express = require("express");
const {
  createOrUpdateBudget,
  getAllBudgets,
  getBudgetByMonthYear,
  getBudgetByWeek,
} = require("../controllers/budgetController");
const { authenticate } = require("../middleware/authenticate");
const { setBalance } = require("../controllers/userController");
const router = express.Router();

router.post("/", authenticate, createOrUpdateBudget);
router.get("/", authenticate, getAllBudgets);
router.get("/:month/:year", authenticate, getBudgetByMonthYear);
router.get("/:month/:year/:week", authenticate, getBudgetByWeek);

router.post("/balance", authenticate, setBalance);

module.exports = router;
