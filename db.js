const mongoose = require("mongoose");
require("dotenv").config();
module.exports = connect = async () => {
    let uri = process.env.URL;
    try {
        console.log("connection created ");
        const response = await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
    } catch (error) {
        console.log(`error occured =>  ${error.message}`);
    }
};