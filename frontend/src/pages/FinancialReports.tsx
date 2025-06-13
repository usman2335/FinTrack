import BudgetVsActualChart from "../components/BarChart/BarChart";
import WeeklySpendingChart from "../components/BarChart/BarChart2";
import MonthlyTrendChart from "../components/LineChart/LineChart";
import { motion } from "framer-motion";

const FinancialReports = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.3 }}
      className="md:p-6 flex flex-col gap-4"
    >
      <h1 className="text-2xl font-bold">Financial Reports</h1>
      <p className="text-gray-500">
        A visual overview of your spending, budgets, and financial trends.
      </p>
      <h2 className="text-xl font-bold text-primary-blue">
        Monthly Expense Trend
      </h2>
      <MonthlyTrendChart />
      <h2 className="text-xl font-bold text-primary-blue">
        Budget vs Actual Spending
      </h2>
      <BudgetVsActualChart monthProp={5} />
      <h2 className="text-xl font-bold text-primary-blue">
        Spending by Day (This Week)
      </h2>

      <WeeklySpendingChart />
    </motion.div>
  );
};

export default FinancialReports;
