const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");
const cors = require("./config/cors");
const { getLeads, addLead } = require("./controller");

// Initialize express
const app = express();
app.use(express.json());
app.use(cors);

// Connect to database
connectDB();

//Routes
app.get("/", (req, res) => res.send("server is running"));
app.get("/favicon.ico", (req, res) => res.status(204).end());
app.get("/leads", getLeads);
app.post("/leads", addLead);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
