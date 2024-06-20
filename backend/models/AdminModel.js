const mongoose = require('mongoose');
mongoose.connect("urlofmongodb");
const Admin = new mongoose.Schema({
    
})
module.exports = mongoose.model('Admin', Admin);