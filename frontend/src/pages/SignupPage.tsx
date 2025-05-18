import Logo from "../components/logo";
import { Input } from "antd";
import { motion } from "framer-motion";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import Button from "../components/Button/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
const SignupPage = () => {
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
        className="w-full md:w-1/2 bg-background"
      >
        <div className="flex flex-col  justify-center items-center md:items-start h-screen md:pl-15">
          <Logo className="text-5xl" />
          <div className="login-container mt-15 flex flex-col gap-4 w-3/4">
            <h1 className="text-center md:text-left text-3xl font-bold text-text-black ">
              Create your account
            </h1>
            <p className="text-center md:text-left text-gray-500">
              Sign up and start mastering your money.
            </p>
            <div className="name flex flex-col gap-1">
              <p>
                Full Name <span className="text-red-500">*</span>
              </p>
              <Input
                className="h-12"
                style={{ fontSize: "1em" }}
                placeholder="Enter your full name"
                prefix={
                  <UserOutlined
                    style={{ color: " #536E9F", paddingRight: "5px" }}
                  />
                }
                onChange={handleEmailChange}
                status={error.email ? "error" : ""}
              />
            </div>
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
                placeholder="Create password"
                prefix={
                  <LockOutlined
                    style={{ color: " #536E9F", paddingRight: "5px" }}
                  />
                }
                style={{ fontSize: "1em" }}
                onChange={handlePasswordChange}
              />
            </div>
            <div onClick={handleSubmit}>
              <Button text="Create Account" />
            </div>
            <div className="flex align-center justify-center gap-2">
              <p>
                Don't have an account?{" "}
                <Link
                  to="/"
                  className="text-secondary-blue hover:text-blue-700 underline cursor-pointer"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="hidden md:flex w-1/2 bg-primary-blue items-center justify-center">
        <img src="/art.svg" className=""></img>
      </div>
    </div>
  );
};

export default SignupPage;
