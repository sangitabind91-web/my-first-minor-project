// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const authRoutes = require("./routes/authRoutes");
// const electionRoutes = require("./routes/electionRoutes");
// const voteRoutes = require("./routes/voteRoutes");

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/elections", electionRoutes);
// app.use("/api/votes", voteRoutes);

// // MongoDB Connect (direct value, no dotenv)
// mongoose
//   .connect("mongodb://127.0.0.1:27017/votingDB")
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB error:", err));

// // Server Start
// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


const express = require("express");
const cors = require("cors");
require("./db");

const authRoutes = require("./routes/authRoutes");
const voteRoutes = require("./routes/voteRoutes");
const resultRoutes = require("./routes/resultRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/vote", voteRoutes);
app.use("/api/result", resultRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});