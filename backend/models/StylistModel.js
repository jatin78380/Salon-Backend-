const mongoose = require('mongoose');
mongoose.connect("mongo");
const Admin = new mongoose.Schema({
    
})
module.exports = mongoose.model('Admin', Admin);