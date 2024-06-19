const mongoose = require('mongoose');
mongoose.connect("mongodburl");
const Admin = new mongoose.Schema({
    
})
module.exports = mongoose.model('Admin', Admin);