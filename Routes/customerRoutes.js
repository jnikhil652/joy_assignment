const {
    addCustomer,
    editCustomer,
    getCustomer,
    getCustomers,
    deleteCustomer,
} = require('../Controller/customerController');
const express = require('express');
const router = express.Router();

router.post("/", addCustomer);
router.patch("/:id", editCustomer);
router.delete("/:id", deleteCustomer);
router.get("/", getCustomers);
router.get("/:id", getCustomer);

module.exports = router;
