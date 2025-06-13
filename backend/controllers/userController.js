const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exsists" });
    }
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashPassword,
    });
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(user.password, password);
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 3600000, // 1 hour
      })
      .json({
        success: true,
        name: user.fullName,
        email: user.email,
        balance: user.balance,
      });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const setBalance = async (req, res) => {
  const { balance } = req.body;
  if (typeof balance !== "number") {
    return res.status(400).json({ message: "Balance must be a number" });
  }
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.balance = balance;
    await user.save();
    res.json({ success: true, message: "Balance updated successfully" });
  } catch (error) {
    console.error("Error updating balance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const checkAuthHandler = (req, res) => {
  res.json({ message: "Authenticated" });
};

module.exports = {
  signup,
  login,
  checkAuthHandler,
  setBalance,
};
