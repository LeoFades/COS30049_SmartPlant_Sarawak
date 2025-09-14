const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // allow frontend requests
app.use(bodyParser.json());

// route
app.get("/api/hello", (req, res) => {
    res.json({ message: "backend hello" });
});

app.post("/api/data", (req, res) => {
    console.log("Received:", req.body);
    res.json({ success: true, data: req.body });
});

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});
