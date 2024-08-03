const mongoose = require('mongoose');

const serviceForSchema = new mongoose.Schema({
    male: { type: Boolean, default: false },
    female: { type: Boolean, default: false },
    unisex: { type: Boolean, default: false },
});

const step2Schema = new mongoose.Schema({
    businessImages: { type: String, default: null },
    menuImages: { type: String, default: null },
    certImages: { type: String, default: null },
    serviceFor: serviceForSchema,
    aboutText: { type: String, default: "" },
});

const Step2 = mongoose.model('Step2', step2Schema);

module.exports = Step2;
