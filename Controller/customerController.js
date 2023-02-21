const Customer = require("../Model/Customer");
const fs = require('fs');
const path = require('path');


const addCustomer = async (req, res) => {
    try {
        const customer = await Customer.create(req.body);
        return res.status(200).send({ "status": 200, "data": customer, "message": "Customer added successfully", "error": true });
    } catch (error) {
        console.log(`error occured => ${req.originalUrl} : ${error.message}`);
        return res.status(500).send({ "status": 500, "data": null, "message": "Something went wrong!", "error": true });
    }
}
const editCustomer = async (req, res) => {
    try {
        const customer = await Customer.updateOne({ _id: req.params.id }, req.body);
        return res.status(200).send({ "status": 200, "data": customer, "message": "Customer updated successfully", "error": true });
    } catch (error) {
        console.log(`error occured => ${req.originalUrl} : ${error.message}`);
        return res.status(500).send({ "status": 500, "data": null, "message": "Something went wrong!", "error": true });
    }
}
const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findOne({ _id: req.params.id, is_delete: 0 });
        return res.status(200).send({ "status": 200, "data": customer, "message": "Customer fetched for " + req.params.id, "error": true });
    } catch (error) {
        console.log(`error occured => ${req.originalUrl} : ${error.message}`);
        return res.status(500).send({ "status": 500, "data": null, "message": "Something went wrong!", "error": true });
    }
}
const getCustomers = async (req, res) => {
    try {
        let term = "";
        if (req.query.term) {
            term = req.query.term;
        }
        let regex = new RegExp(`.*${term}.*`, "i");
        let obj = req.query;
        let condition = { is_delete: 0 };

        let limit = 0, page = 0;
        for (const key in obj) {
            if (key != "limit" && key != "page" && key != "term") {
                condition[key] = obj[key];
            }
        }
        const memberCount = await Customer.count(condition);
        if (req.query.page) {
            page = parseInt(req.query.page);
        }
        if (req.query.limit) {
            limit = parseInt(req.query.limit);
        }
        let pagesCount = 0;
        if (memberCount > limit) {
            pagesCount = memberCount / limit;
            pagesCount = Math.ceil(pagesCount);
        }
        console.log(condition);
        let customer = {};
        if (term != "") {
            customer = await Customer.find(condition).sort({ createdAt: 'descending' }).or([{ 'fullName': regex }, { 'emailId': regex }, { 'mobileNumber': regex }]).skip(limit * (page - 1)).limit(limit);
        } else {
            customer = await Customer.find(condition).sort({ createdAt: 'descending' }).skip(limit * (page - 1)).limit(limit);
        }
        return res.send({ "status": 200, "data": customer, "pagination": { pagesCount, memberCount }, "message": "Fetched all members successfully", "error": false });
    } catch (error) {
        console.log(`error occured => ${req.originalUrl} : ${error.message}`);
        return res.status(500).send({ "status": 500, "data": null, "message": "Something went wrong!", "error": true });
    }
}
const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.deleteOne({ _id: req.params.id, is_delete: 0 });
        return res.status(200).send({ "status": 200, "data": customer, "message": "Customer deleted successfully", "error": true });
    } catch (error) {
        console.log(`error occured => ${req.originalUrl} : ${error.message}`);
        return res.status(500).send({ "status": 500, "data": null, "message": "Something went wrong!", "error": true });
    }
}
module.exports = {
    addCustomer,
    editCustomer,
    getCustomer,
    getCustomers,
    deleteCustomer,
};
