const mongoose = require('mongoose');

const step3Schema = new mongoose.Schema({
    "At my place": { type: Boolean, default: false },
    "At client's location": { type: Boolean, default: false },
});

const Step3 = mongoose.model('Step3', step3Schema);

module.exports = Step3;
