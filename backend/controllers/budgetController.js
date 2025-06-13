const UserBudget = require("../models/UserBudget");

exports.createOrUpdateBudget = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("request:", req.body);
    const { month, year, totalBudget, budgetType, week, weeklyBudgets } =
      req.body;

    if (!month || !year || totalBudget == null) {
      return res
        .status(400)
        .json({ message: "Month, year and total budget are required" });
    }
    let userBudget = await UserBudget.findOne({ userId });
    if (!userBudget) {
      userBudget = new UserBudget({
        userId,
        budgets: [{ month, year, totalBudget, weeklyBudgets }],
      });
    } else {
      if (!userBudget.budgets) {
        userBudget.budgets = [];
      }
    }
    const monthIndex = userBudget.budgets.findIndex(
      (b) => b.month == month && b.year == year
    );
    if (budgetType === "Weekly") {
      if (monthIndex === -1) {
        // If month budget does not exist, create it with empty weeklyBudgets array
        userBudget.budgets.push({
          month,
          year,
          totalBudget: 0, // or null if you prefer
          weeklyBudgets: [{ week, amount: totalBudget }],
        });
      } else {
        // Make sure weeklyBudgets array exists
        if (!userBudget.budgets[monthIndex].weeklyBudgets) {
          userBudget.budgets[monthIndex].weeklyBudgets = [];
        }
        // Find the week index in weeklyBudgets
        const weekIndex = userBudget.budgets[
          monthIndex
        ].weeklyBudgets.findIndex((w) => w.week == week);

        if (weekIndex !== -1) {
          // Update existing week amount
          userBudget.budgets[monthIndex].weeklyBudgets[weekIndex].amount =
            totalBudget;
        } else {
          // Add new weekly budget
          userBudget.budgets[monthIndex].weeklyBudgets.push({
            week,
            amount: totalBudget,
          });
        }
      }

      await userBudget.save();
      console.log("Weekly budget updated:", userBudget);
      return res.json({
        success: true,
        message: "Weekly budget updated",
        data: userBudget,
      });
    }
    if (monthIndex != -1) {
      userBudget.budgets[monthIndex].totalBudget = totalBudget;
      userBudget.budgets[monthIndex].weeklyBudgets = weeklyBudgets;
    } else {
      userBudget.budgets.push({ month, year, totalBudget, weeklyBudgets });
    }
    await userBudget.save();
    res.json({ success: true, message: "Budget saved", data: userBudget });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAllBudgets = async (req, res) => {
  try {
    const userId = req.user.id;
    const userBudget = await UserBudget.findOne({ userId });
    if (!userBudget) {
      return res.json({ success: false, data: [] });
    }
    return res.json({ success: true, data: userBudget.budgets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getBudgetByMonthYear = async (req, res) => {
  try {
    const userId = req.user.id;
    const month = parseInt(req.params.month);
    const year = parseInt(req.params.year);

    const userBudget = await UserBudget.findOne({ userId });
    if (!userBudget)
      return res
        .status(404)
        .json({ success: false, message: "No budgets found" });

    const monthBudget = userBudget.budgets.find(
      (b) => b.month === month && b.year === year
    );

    if (!monthBudget)
      return res
        .status(404)
        .json({ success: false, message: "Budget not found" });

    res.json({ success: true, data: monthBudget });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getBudgetByWeek = async (req, res) => {
  try {
    const userId = req.user.id;
    const month = parseInt(req.params.month);
    const year = parseInt(req.params.year);
    const week = parseInt(req.params.week);

    const userBudget = await UserBudget.findOne({ userId });
    if (!userBudget)
      return res
        .status(404)
        .json({ success: false, message: "No budgets found" });

    const monthBudget = userBudget.budgets.find(
      (b) => b.month === month && b.year === year
    );

    if (!monthBudget || !monthBudget.weeklyBudgets)
      return res
        .status(404)
        .json({ success: false, message: "Budget for this month not found" });

    const weekBudget = monthBudget.weeklyBudgets.find((w) => w.week === week);

    if (!weekBudget)
      return res
        .status(404)
        .json({ success: false, message: "Weekly budget not found" });

    res.json({
      success: true,
      data: {
        month,
        year,
        week,
        budget: weekBudget,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update budget for specific month/year
exports.updateBudgetByMonthYear = async (req, res) => {
  try {
    const userId = req.userId;
    const month = parseInt(req.params.month);
    const year = parseInt(req.params.year);
    const { totalBudget, weeklyBudgets } = req.body;

    const userBudget = await UserBudget.findOne({ userId });
    if (!userBudget)
      return res
        .status(404)
        .json({ success: false, message: "No budgets found" });

    const monthIndex = userBudget.budgets.findIndex(
      (b) => b.month === month && b.year === year
    );

    if (monthIndex === -1)
      return res
        .status(404)
        .json({ success: false, message: "Budget not found" });

    userBudget.budgets[monthIndex].totalBudget =
      totalBudget ?? userBudget.budgets[monthIndex].totalBudget;
    userBudget.budgets[monthIndex].weeklyBudgets =
      weeklyBudgets ?? userBudget.budgets[monthIndex].weeklyBudgets;

    await userBudget.save();

    res.json({ success: true, data: userBudget.budgets[monthIndex] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete budget for specific month/year
exports.deleteBudgetByMonthYear = async (req, res) => {
  try {
    const userId = req.userId;
    const month = parseInt(req.params.month);
    const year = parseInt(req.params.year);

    const userBudget = await UserBudget.findOne({ userId });
    if (!userBudget)
      return res
        .status(404)
        .json({ success: false, message: "No budgets found" });

    userBudget.budgets = userBudget.budgets.filter(
      (b) => !(b.month === month && b.year === year)
    );

    await userBudget.save();

    res.json({ success: true, message: "Budget deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
