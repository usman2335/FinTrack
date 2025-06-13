import axios from "axios";
import dayjs from "dayjs";

export const transactions = [
  {
    id: 1,
    title: "Salary Payment",
    date: "2025-05-01",
    amount: 100000.0,
    type: "income",
    category: "Salary",
  },
  {
    id: 2,
    title: "Grocery Shopping",
    date: "2025-05-02",
    amount: 15000.0,
    type: "expense",
    category: "Groceries",
  },
  {
    id: 3,
    title: "Freelance Project",
    date: "2025-05-05",
    amount: 25000.0,
    type: "income",
    category: "Freelancing",
  },
  {
    id: 4,
    title: "Electricity Bill",
    date: "2025-05-07",
    amount: 8000.0,
    type: "expense",
    category: "Utilities",
  },
  {
    id: 5,
    title: "Gym Membership",
    date: "2025-05-10",
    amount: 3000.0,
    type: "expense",
    category: "Health",
  },
  {
    id: 6,
    title: "Sold Old Furniture",
    date: "2025-05-12",
    amount: 12000.0,
    type: "income",
    category: "Miscellaneous",
  },
  {
    id: 7,
    title: "Dining Out",
    date: "2025-05-15",
    amount: 7000.0,
    type: "expense",
    category: "Food & Dining",
  },
  {
    id: 8,
    title: "Stock Dividend",
    date: "2025-05-18",
    amount: 5000.0,
    type: "income",
    category: "Investments",
  },
  {
    id: 9,
    title: "Internet Bill",
    date: "2025-05-20",
    amount: 3500.0,
    type: "expense",
    category: "Utilities",
  },
  {
    id: 10,
    title: "Car Maintenance",
    date: "2025-05-22",
    amount: 10000.0,
    type: "expense",
    category: "Transportation",
  },
];

const getTransactions = async () => {
  try {
    const transactions = await axios.get("http://localhost:5000/api/expenses", {
      withCredentials: true,
    });
    return transactions.data.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};

export const calculateMonthlyExpenses = async (month: Number, year: Number) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/expenses/${month}/${year}`,
      { withCredentials: true }
    );
    console.log("Monthly expense:", response);
  } catch (error) {
    console.error("Error fetching monthly expenses:", error);
    return [];
  }
};

export const getMonthlyBudget = async (month: Number) => {
  try {
    const resMonth = await axios.get(
      `http://localhost:5000/api/budget/${month}/${dayjs().year()}`,
      { withCredentials: true }
    );

    return resMonth.data.data?.totalBudget || "0.00";
  } catch (error) {
    console.error("Error fetching monthly budget:", error);
    return [];
  }
};

export default getTransactions;
