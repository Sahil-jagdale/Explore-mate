const express = require("express");

const app = express();

// Middlewares
app.use(express.json());


// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/itinerary", require("./routes/itineraryRoutes"));
app.use("/api/questions", require("./routes/questionRoutes"));

module.exports = app;