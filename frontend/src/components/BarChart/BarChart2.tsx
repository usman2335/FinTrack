import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import type { ApexOptions } from "apexcharts";

const WeeklySpendingChart = ({ week = 1, month = 6, year = 2025 }) => {
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [loading, setLoading] = useState(true);

  const daysOrder = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/expenses/weekly-breakdown/${week}/${month}/${year}`,
          { withCredentials: true }
        );
        const data = res.data.data;
        console.log("datatata", res);

        const valuesInOrder = daysOrder.map((day) => data[day] || 0);
        setSeries([{ name: "Spending", data: valuesInOrder }]);
      } catch (error) {
        console.error("Error fetching weekly spending:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [week, month, year]);

  const options: ApexOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: daysOrder,
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `PKR${val}`,
    },
    yaxis: {
      title: {
        text: "Amount (PKR)",
      },
    },
    colors: ["#50C8E3"],
  };

  return (
    <>
      {loading ? (
        <p>Loading chart...</p>
      ) : (
        <Chart
          options={options}
          series={series}
          type="bar"
          height={350}
          width="100%"
        />
      )}
    </>
  );
};

export default WeeklySpendingChart;
