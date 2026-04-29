// const mongoose = require("mongoose");

// const voteSchema = new mongoose.Schema({
//   voter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   election: { type: mongoose.Schema.Types.ObjectId, ref: "Election" },
//   candidate: String
// });

// module.exports = mongoose.model("Vote", voteSchema);



const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  userid: String,
  candidateName: String,
  time: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Vote", voteSchema);