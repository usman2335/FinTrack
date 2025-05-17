import Logo from "../components/logo";
import { Checkbox, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Button from "../components/Button/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState({ email: "", password: "" });
  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validate()) {
      alert("Please fill in all required fields.");
    } else {
      alert("Login successful!");
    }
  };

  const handleEmailChange = (e: any) => {
    const value = e.target.value;
    setEmail(value);
    if (/\S+@\S+\.\S+/.test(value)) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (e: any) => {
    const value = e.target.value;
    setPassword(value);
    if (value.trim() !== "") {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };
  return (
    <div className="flex h-screen justify-between">
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.4 }}
        className="w-1/2 bg-background pl-15"
      >
        <div className="flex flex-col  justify-center h-screen">
          <Logo />
          <div className="login-container mt-15 flex flex-col gap-4 w-3/4">
            <h1 className="text-3xl font-bold text-text-black ">
              Welcome back!
            </h1>
            <p className="text-gray-500">
              Login to take control of your finances.
            </p>
            <div className="email flex flex-col gap-1">
              <p>
                Email <span className="text-red-500">*</span>
              </p>
              <Input
                className="h-12"
                style={{ fontSize: "1em" }}
                placeholder="Enter your email address"
                prefix={
                  <MailOutlined
                    style={{ color: " #536E9F", paddingRight: "5px" }}
                  />
                }
                onChange={handleEmailChange}
                status={error.email ? "error" : ""}
              />
            </div>
            <div className="password flex flex-col gap-1">
              <p>
                Password <span className="text-red-500">*</span>
              </p>
              <Input.Password
                status={error.password ? "error" : ""}
                className="h-12 text-lg"
                placeholder="Enter your password"
                prefix={
                  <LockOutlined
                    style={{ color: " #536E9F", paddingRight: "5px" }}
                  />
                }
                style={{ fontSize: "1em" }}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <Checkbox>Remember me</Checkbox>
              <a
                href="#"
                className="text-secondary-blue float-right hover:text-blue-700 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <div onClick={handleSubmit}>
              <Button text="Login" />
            </div>
            <div className="flex align-center justify-center gap-2">
              <p>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-secondary-blue hover:underline cursor-pointer"
                >
                  Click here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="w-1/2 bg-primary-blue flex items-center justify-center">
        <img src="/art.svg" className=""></img>
      </div>
    </div>
  );
};

export default LoginPage;
