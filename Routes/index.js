const express = require('express');
const router = express.Router();


router.use("/customer", require('./customerRoutes'));

module.exports = router;