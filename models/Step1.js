const mongoose = require('mongoose');

const step1Schema = new mongoose.Schema({
    "Aesthetic medicine": { type: Boolean, default: false },
    Barbershop: { type: Boolean, default: false },
    "Briads & Locs": { type: Boolean, default: false },
    "Dental & Orthodontics": { type: Boolean, default: false },
    "Hair removal": { type: Boolean, default: false },
    "Hair Salon": { type: Boolean, default: false },
    "health & Fitness": { type: Boolean, default: false },
    "Home services": { type: Boolean, default: false },
    Makeup: { type: Boolean, default: false },
});

const Step1 = mongoose.model('Step1', step1Schema);

module.exports = Step1;
