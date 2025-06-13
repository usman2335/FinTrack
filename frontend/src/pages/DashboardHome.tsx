import { Card, Radio, type StatisticProps, Statistic } from "antd";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import axios from "axios";
import dayjs from "dayjs";

import { TransactionsTable } from "../components/TransactionsTable/TransactionsTable";
import PieChart from "../components/PieChart/PieChart";

const formatter: StatisticProps["formatter"] = (value) => (
  <CountUp end={value as number} separator="," />
);

const options = [
  {
    value: "Monthly",
    label: "Monthly",
  },
  {
    value: "Weekly",
    label: "Weekly",
  },
];

const DashboardHome = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    balance: "",
    currency: "PKR ",
    currentMonthBudget: "",
    currentWeekBudget: "",
    monthlyExpense: "",
    weeklyExpense: "",
    expenses: "",
  });

  const [timePeriod, setTimePeriod] = useState("Monthly");

  useEffect(() => {
    const getUserDetails = async () => {
      const month = dayjs().month() + 1;
      const dayOfMonth = dayjs().date();
      const weekOfMonth = Math.ceil(dayOfMonth / 7);

      const fullName = localStorage.getItem("fullName") || "User";
      const balance = localStorage.getItem("balance") || "0.00";

      let currentMonthBudget = "0.00";
      let currentWeekBudget = "0.00";
      let expenses = "0.00";
      let monthlyExpense = "0.00";
      let weeklyExpense = "0.00";
      console.log("Date today:", dayjs().month(), dayjs().year(), weekOfMonth);

      try {
        const resMonth = await axios.get(
          `http://localhost:5000/api/budget/${month}/${dayjs().year()}`,
          { withCredentials: true }
        );

        currentMonthBudget = resMonth.data.data?.totalBudget || "0.00";
        expenses = resMonth.data.data?.expenses || "0.00";
      } catch (err) {
        console.error("Monthly budget fetch failed:", err);
      }

      try {
        const resWeek = await axios.get(
          `http://localhost:5000/api/budget/${month}/${dayjs().year()}/${weekOfMonth}`,
          { withCredentials: true }
        );

        currentWeekBudget = resWeek.data.data?.budget?.amount || "0.00";
      } catch (err) {
        console.error("Weekly budget fetch failed:", err);
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/expenses/${month}/${dayjs().year()}`,
          { withCredentials: true }
        );
        console.log("Monthly expense:", response.data.total);
        monthlyExpense = response.data.total || "0.00";
      } catch (error) {
        console.error("Error fetching monthly expenses:", error);
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/expenses/${month}/${dayjs().year()}/${weekOfMonth}`,
          { withCredentials: true }
        );
        console.log("Weekly expense:", response.data.total);
        weeklyExpense = response.data.total || "0.00";
      } catch (error) {
        console.error("Error fetching weekly expenses:", error);
      }

      setUserDetails({
        name: fullName,
        balance,
        currency: "PKR ",
        currentMonthBudget,
        currentWeekBudget,
        expenses,
        monthlyExpense,
        weeklyExpense,
      });
    };

    getUserDetails();
  }, []);

  const onPeriodChange = (e: any) => {
    setTimePeriod(e.target.value);
  };

  const calculateSavings = () => {
    const budget = parseFloat(
      timePeriod === "Monthly"
        ? userDetails.currentMonthBudget
        : userDetails.currentWeekBudget
    );
    const monthlyExpense = parseFloat(userDetails.monthlyExpense || "0");
    return (budget - monthlyExpense).toFixed(2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.3 }}
      className="md:p-6 flex flex-col gap-4"
    >
      <h1 className="text-2xl font-bold">{`Welcome, ${userDetails.name} 👋`}</h1>

      <div className="w-full rounded bg-[image:var(--background-gradient)] text-white flex flex-col gap-3 justify-center items-start p-4">
        <span className="text-lg">Balance</span>
        <span className="text-3xl font-bold ">
          {userDetails.currency}
          {userDetails.balance}
        </span>
      </div>

      <div className="flex items-center justify-center md:justify-between">
        <Radio.Group
          onChange={onPeriodChange}
          value={timePeriod}
          block
          options={options}
          defaultValue="Monthly"
          optionType="button"
          buttonStyle="solid"
          className="w-full md:w-1/5"
        />
        <span className="hidden md:block text-text-grey">
          {timePeriod === "Monthly"
            ? "Showing data for current month"
            : "Showing data for current week"}
        </span>
      </div>

      <div className="flex flex-col items-center md:flex-row w-full gap-4 ">
        <Card variant="borderless" className="w-full md:w-4/5">
          <Statistic
            prefix={userDetails.currency}
            title="Total Budget"
            value={
              timePeriod === "Monthly"
                ? parseFloat(userDetails.currentMonthBudget)
                : parseFloat(userDetails.currentWeekBudget)
            }
            formatter={formatter}
            valueStyle={{
              fontWeight: "600",
              fontFamily: "Poppins",
            }}
          />
        </Card>

        <Card variant="borderless" className="w-full md:w-4/5">
          <Statistic
            prefix={userDetails.currency}
            title="Total Expenses"
            valueStyle={{
              color: "#cf1322",
              fontWeight: "600",
              fontFamily: "Poppins",
            }}
            value={
              timePeriod === "Monthly"
                ? parseFloat(userDetails.monthlyExpense || "0")
                : parseFloat(userDetails.weeklyExpense || "0")
            }
            formatter={formatter}
            suffix={<ArrowDownOutlined />}
          />
        </Card>

        <Card variant="borderless" className="w-full md:w-4/5">
          <Statistic
            prefix={userDetails.currency}
            title="Total Savings"
            value={parseFloat(calculateSavings())}
            valueStyle={{
              color: "#3f8600",
              fontWeight: "600",
              fontFamily: "Poppins",
            }}
            formatter={formatter}
            suffix={<ArrowUpOutlined />}
          />
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="w-full md:w-4/6 h-full flex flex-col gap-4">
          <h1 className="text-xl font-bold text-primary-blue">
            Recent Transactions
          </h1>
          <TransactionsTable rowLimit={5} pagination={false} />
        </div>

        <div className="w-full md:w-2/6 h-full flex flex-col gap-4">
          <h1 className="text-xl font-bold text-primary-blue">
            Expense Categories
          </h1>
          <div className="flex items-center justify-center w-full bg-white rounded p-6 shadow-md">
            <PieChart />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHome;
