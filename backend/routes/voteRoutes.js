const express = require("express");
const Vote = require("../models/Vote");
const User = require("../models/User");
const Candidate = require("../models/Candidate");

const router = express.Router();

router.post("/cast", async (req, res) => {
  const { userid, candidateName } = req.body;

  const user = await User.findOne({ userid });

  if (user.voted) {
    return res.json({ message: "Already voted" });
  }

  await Vote.create({ userid, candidateName });

  await Candidate.findOneAndUpdate(
    { name: candidateName },
    { $inc: { votes: 1 } }
  );

  user.voted = true;
  await user.save();

  res.json({ message: "Vote successful" });
});

module.exports = router;