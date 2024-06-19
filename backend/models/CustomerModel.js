const mongoose = require('mongoose');
mongoose.connect("mongodburl");
const CustomerSchema = new mongoose.Schema({ 
    firstname: {
        type: String,
        required: true
    }, 
    lastname: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})
const CustomerModel = mongoose.model('customer', CustomerSchema);
module.exports = {CustomerModel};