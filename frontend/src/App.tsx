import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import { ConfigProvider } from "antd";
import AddExpensePage from "./pages/AddExpense";
import AddBudgetPage from "./pages/AddBudget";
import TransactionsPage from "./pages/TransactionsPage";

const themeConfig = {
  token: {
    colorPrimary: "#183e6a",
    borderRadius: 6,
    colorBgContainer: "#ffffff",
    fontFamily: "Poppins",
  },
  components: {
    Table: {
      headerBg: "#fff",
    },
  },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="finances/add-expense" element={<AddExpensePage />} />
          <Route path="finances/add-budget" element={<AddBudgetPage />} />
          <Route index element={<DashboardHome />}></Route>
          <Route
            path="/dashboard/transactions"
            element={<TransactionsPage />}
          ></Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={themeConfig}>
        <AnimatedRoutes />
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
