const mongoose = require('mongoose');

const step4Schema = new mongoose.Schema({
    address: { type: String, default: "" },
    street: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    zip_postal: { type: String, default: "" },
    country: { type: String, default: "" },
});

const Step4 = mongoose.model('Step4', step4Schema);

module.exports = Step4;
