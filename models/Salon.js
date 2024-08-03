const mongoose = require('mongoose');

const salonSchema = new mongoose.Schema({
    currentStep: { type: Number, default: 0 },
    step0: { type: mongoose.Schema.Types.ObjectId, ref: 'Step0' },
    step1: { type: mongoose.Schema.Types.ObjectId, ref: 'Step1' },
    step2: { type: mongoose.Schema.Types.ObjectId, ref: 'Step2' },
    step3: { type: mongoose.Schema.Types.ObjectId, ref: 'Step3' },
    step4: { type: mongoose.Schema.Types.ObjectId, ref: 'Step4' },
    step5: { type: mongoose.Schema.Types.ObjectId, ref: 'Step5' },
    step6: { type: mongoose.Schema.Types.ObjectId, ref: 'Step6' },
});

const Salon = mongoose.model('Salon', salonSchema);

module.exports = Salon;
