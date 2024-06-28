const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://jatin8612:Jatin%40rkblbrrk!12@cluster0.nkvwqm9.mongodb.net/saloninternship");
const Admin = new mongoose.Schema({
    
})
module.exports = mongoose.model('Admin', Admin);