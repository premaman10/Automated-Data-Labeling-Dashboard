const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// Routes
app.use("/upload", require("./routes/uploadRoutes"));
app.use("/data", require("./routes/dataRoutes"));
app.use("/label", require("./routes/labelRoutes"));

// test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
