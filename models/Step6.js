const mongoose = require('mongoose');

const step6Schema = new mongoose.Schema({
    data: { type: [String], default: [] },
});

const Step6 = mongoose.model('Step6', step6Schema);

module.exports = Step6;
