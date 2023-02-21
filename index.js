const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
require('./db.js')();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.originalUrl + "=>");
    next();
});
app.use("/api", require("./Routes"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server listening on port " + PORT));
