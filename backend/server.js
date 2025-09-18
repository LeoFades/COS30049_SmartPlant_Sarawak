const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Routes
const userRoutes = require('./routes/userRoutes');


app.use('/users', userRoutes);


app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});
