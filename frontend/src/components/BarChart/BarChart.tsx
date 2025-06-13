// BudgetVsActualChart.tsx
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { getMonthlyBudget } from "../../data/transactions";
import getTransactions from "../../data/transactions";

const BudgetVsActualChart = ({ monthProp }: { monthProp: Number }) => {
  const [series, setSeries] = useState<any[]>([]);
  const [monthLabel, setMonthLabel] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const allExpenses = await getTransactions();
      const currentDate = new Date();
      const month = currentDate.getMonth(); // 0-indexed
      const year = currentDate.getFullYear();

      const monthName = currentDate.toLocaleString("default", {
        month: "long",
      });
      setMonthLabel(monthName);

      // Filter expenses for current month
      const currentMonthExpenses = allExpenses.filter((t: any) => {
        const d = new Date(t.date);
        return d.getMonth() === month && d.getFullYear() === year;
      });

      const totalSpent = currentMonthExpenses.reduce(
        (sum: number, t: any) => sum + t.amount,
        0
      );

      // Fetch monthly budget from backend
      const budgetData = await getMonthlyBudget(monthProp);
      console.log("Budget Data:", budgetData);
      const monthlyBudget = budgetData || 1000;

      setSeries([
        {
          name: "Budgeted",
          data: [monthlyBudget],
        },
        {
          name: "Actual Spent",
          data: [totalSpent],
        },
      ]);
    };

    fetchData();
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        // endingShape: "rounded",
      },
    },
    xaxis: {
      categories: [monthLabel],
    },
    yaxis: {
      title: {
        text: "Amount (PKR)",
      },
    },
    fill: {
      opacity: 1,
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `PKR${val}`,
    },
    colors: ["#7EC4CF", "#FF6B6B"],
  };

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      width="100%"
      height={350}
    />
  );
};

export default BudgetVsActualChart;
