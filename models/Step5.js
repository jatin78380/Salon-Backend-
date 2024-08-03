const mongoose = require('mongoose');

const step5Schema = new mongoose.Schema({
    sunday: { type: [String], default: [false, "00", "00", "00", "00", "am"] },
    monday: { type: [String], default: [false, "00", "00", "00", "00", "am"] },
    tuesday: { type: [String], default: [false, "00", "00", "00", "00", "am"] },
    wednesday: { type: [String], default: [false, "00", "00", "00", "00", "am"] },
    thrusday: { type: [String], default: [false, "00", "00", "00", "00", "am"] },
    friday: { type: [String], default: [false, "00", "00", "00", "00", "am"] },
    saturday: { type: [String], default: [false, "00", "00", "00", "00", "am"] },
});

const Step5 = mongoose.model('Step5', step5Schema);

module.exports = Step5;
