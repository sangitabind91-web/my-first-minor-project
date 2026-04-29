const express = require("express");
const Candidate = require("../models/Candidate");

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await Candidate.find();
  res.json(data);
});

module.exports = router;