// MonthlyTrendChart.tsx
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import getTransactions from "../../data/transactions";

const MonthlyTrendChart = () => {
  const [series, setSeries] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchMonthlyTrend = async () => {
      const data = await getTransactions();
      const expenses = data?.filter((t: any) => t.amount && t.date);

      // 🗓️ Assuming you're getting current month expenses
      const daysMap: Record<number, number> = {};
      for (let i = 1; i <= 31; i++) {
        daysMap[i] = 0;
      }

      expenses.forEach((t: any) => {
        const date = new Date(t.date);
        const day = date.getDate(); // Get day of the month
        daysMap[day] += t.amount;
      });

      const dailyTotals = Object.values(daysMap); // e.g., [100, 0, 50, 20, ...]
      const dayLabels = Object.keys(daysMap); // e.g., ["1", "2", "3", ...]

      setSeries([{ name: "Total Spent", data: dailyTotals }]);
      setCategories(dayLabels);
    };

    fetchMonthlyTrend();
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "line",
      zoom: { enabled: false },
    },
    xaxis: {
      categories: categories,
      title: { text: "Day" },
    },
    yaxis: {
      title: { text: "Amount Spent (PKR)" },
    },
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 4,
    },
    tooltip: {
      y: {
        formatter: (val) => `PKR ${val}`,
      },
    },
    colors: ["#50C8E3"],
  };

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      width="100%"
      height={350}
    />
  );
};

export default MonthlyTrendChart;
