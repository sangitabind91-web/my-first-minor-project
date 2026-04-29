// const mongoose = require("mongoose");

// const electionSchema = new mongoose.Schema({
//   position: String,
//   candidates: [
//     {
//       name: String,
//       description: String,
//       symbol: String,
//       votes: { type: Number, default: 0 }
//     }
//   ]
// });

// module.exports = mongoose.model("Election", electionSchema);



const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: String,
  party: String,
  votes: { type: Number, default: 0 }
});

module.exports = mongoose.model("Candidate", candidateSchema);