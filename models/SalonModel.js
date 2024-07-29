const mongoose = require('mongoose');

const serviceForSchema = new mongoose.Schema({
    male: { type: Boolean, default: false },
    female: { type: Boolean, default: false },
    unisex: { type: Boolean, default: false },
});

const step1Schema = new mongoose.Schema({
    "Aesthetic medicine": { type: Boolean, default: false },
   "Barbershop": { type: Boolean, default: false },
    "Briads & Locs": { type: Boolean, default: false },
    "Dental & Orthodontics": { type: Boolean, default: false },
    "Hair removal": { type: Boolean, default: false },
    "Hair Salon": { type: Boolean, default: false },
    "health & Fitness": { type: Boolean, default: false },
    "Home services": { type: Boolean, default: false },
    Makeup: { type: Boolean, default: false },
});

const step2Schema = new mongoose.Schema({
    businessImages: { type: String, default: null },
    menuImages: { type: String, default: null },
    certImages: { type: String, default: null },
    serviceFor: serviceForSchema,
    aboutText: { type: String, default: "" },
});

const step3Schema = new mongoose.Schema({
    "At my place": { type: Boolean, default: false },
    "At client's location": { type: Boolean, default: false },
});

const step4Schema = new mongoose.Schema({
    address: { type: String, default: "" },
    street: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    zip_postal: { type: String, default: "" },
    country: { type: String, default: "" },
});

const step5Schema = new mongoose.Schema({
    sunday: { type: [String], default: [false, "00", "00", "00", "00", "am"] },
    monday: { type: [String], default: [false, "00", "00", "00", "00", "am"] },
    tuesday: { type: [String], default: [false, "00", "00", "00", "00", "am"] },
    wednesday: { type: [String], default: [false, "00", "00", "00", "00", "am"] },
    thrusday: { type: [String], default: [false, "00", "00", "00", "00", "am"] },
    friday: { type: [String], default: [false, "00", "00", "00", "00", "am"] },
    saturday: { type: [String], default: [false, "00", "00", "00", "00", "am"] },
});

const salonSchema = new mongoose.Schema({
    currentStep: { type: Number, default: 0 },
    step0: {
        firstName: { type: String, default: "" },
        lastName: { type: String, default: "" },
        email: { type: String, default: "" },
        businessName: { type: String, default: "" },
        phone: { type: String, default: "" },
        password: { type: String, default: "" },
    },
    step1: step1Schema,
    step2: step2Schema,
    step3: step3Schema,
    step4: step4Schema,
    step5: step5Schema,
    step6: { type: [String], default: [] },
});

const SalonModel = mongoose.model('Salon', salonSchema);

module.exports = SalonModel;
