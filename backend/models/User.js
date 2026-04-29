// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   hasVoted: { type: Boolean, default: false }
// });

// module.exports = mongoose.model("User", userSchema);



const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  fatherName: String,
  dob: String,
  userid: String,
  password: String,
  voted: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);