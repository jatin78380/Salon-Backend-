const mongoose = require('mongoose');
mongoose.connect("mongo");
const StylistSchema = new mongoose.Schema({
    firstName: "String",
    lastName: "String",
    emailAddress : "String",
    businessName: "String",
    phone: "Number",
    password: "String",
    
})
module.exports = mongoose.model('Admin', Admin);