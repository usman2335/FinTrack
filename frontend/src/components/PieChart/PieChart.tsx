import Chart from "react-apexcharts";
import transactions from "../../data/transactions";
import type { ApexOptions } from "apexcharts";

const PieChart = () => {
  const incomeTotal = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenseTotal = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const series = [incomeTotal, expenseTotal];

  const options: ApexOptions = {
    chart: {
      type: "pie" as const, // 👈 FIX: assert as literal
    },
    labels: ["Income", "Expense"],
    legend: {
      position: "right",
    },
    colors: ["#112D4E", "#50C8E3"],
  };

  return (
    <div>
      <Chart options={options} series={series} type="donut" width={400} />
    </div>
  );
};

export default PieChart;
