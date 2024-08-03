const mongoose = require('mongoose');

const step0Schema = new mongoose.Schema({
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    email: { type: String, default: "" },
    businessName: { type: String, default: "" },
    phone: { type: String, default: "" },
    password: { type: String, default: "" },
});

const Step0 = mongoose.model('Step0', step0Schema);

module.exports = Step0;
