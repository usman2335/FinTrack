import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import { ConfigProvider } from "antd";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />}></Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

const themeConfig = {
  token: {
    colorPrimary: "#112d4e",
    borderRadius: 6,
    colorBgContainer: "#ffffff",
    fontFamily: "Poppins",
  },
};

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
