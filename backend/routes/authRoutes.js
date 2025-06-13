const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  checkAuthHandler,
} = require("../controllers/userController");
const { checkAuth } = require("../middleware/authenticate");

router.post("/signup", signup);
router.post("/login", login);

router.get("/check", checkAuth, checkAuthHandler);

module.exports = router;
