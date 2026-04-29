const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const SECRET = "secret123";

// REGISTER
router.post("/register", async (req, res) => {
  const { username, fatherName, dob, userid, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    fatherName,
    dob,
    userid,
    password: hash
  });

  await user.save();
  res.json({ message: "Registered successfully" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, fatherName, dob, password } = req.body;

  const user = await User.findOne({ username, fatherName });
  if (!user) return res.status(400).json({ message: "User not found" });

  // DOB match check
  if (user.dob !== dob) {
    return res.status(400).json({ message: "Wrong Date of Birth" });
  }

  // AGE check
  const age = new Date().getFullYear() - new Date(dob).getFullYear();
  if (age < 18) {
    return res.status(400).json({ message: "Not eligible" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id }, SECRET);

  res.json({ token, user });
});

module.exports = router;