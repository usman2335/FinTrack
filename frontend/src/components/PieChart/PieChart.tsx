import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import getTransactions from "../../data/transactions";
// update path accordingly

const PieChart = () => {
  const [series, setSeries] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTransactions();
      const expenseData = data?.filter((t: any) => t.amount && t.category);
      console.log("Expense Data:", expenseData[0].amount);
      const categoryTotals: Record<string, number> = {};

      expenseData.forEach((t: any) => {
        categoryTotals[t.category] =
          (categoryTotals[t.category] || 0) + t.amount;
      });

      const categoryLabels = Object.keys(categoryTotals);
      const categorySeries = Object.values(categoryTotals);
      console.log("Category Labels:", categoryLabels);
      console.log("Category Series:", categorySeries);

      setLabels(categoryLabels);
      setSeries(categorySeries);
    };

    fetchData();
  }, []);

  const options: ApexOptions = {
    chart: {
      type: "pie",
    },
    labels: labels,
    legend: {
      position: "right",
    },
    colors: ["#50C8E3", "#112D4E", "#7EC4CF", "#FFE194", "#FF6B6B", "#8E44AD"],
  };

  return (
    <div className="min-h-[300px] flex justify-center items-center">
      <Chart options={options} series={series} type="donut" width={400} />
    </div>
  );
};

export default PieChart;
