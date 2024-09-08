const mongoose = require("mongoose");

const salonSchema = new mongoose.Schema({
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    businessName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  businessType: {
    "Aesthetic medicine": { type: Boolean, default: false },
    Barbershop: { type: Boolean, default: false },
    "Briads & Locs": { type: Boolean, default: false },
    "Dental & Orthodontics": { type: Boolean, default: false },
    "Hair removal": { type: Boolean, default: false },
    "Hair Salon": { type: Boolean, default: false },
    "health & Fitness": { type: Boolean, default: false },
    "Home services": { type: Boolean, default: false },
    Makeup: { type: Boolean, default: false },
  },
  businessImages: {
    businessImages: { type: [String], default: [] },
    menuImages: { type: [String], default: [] },
    certImages: { type: [String], default: [] },
    serviceFor: {
      male: { type: Boolean, default: false },
      female: { type: Boolean, default: false },
      unisex: { type: Boolean, default: false },
    },
    aboutText: { type: String, default: "" },
  },
  siteOfService: {
    "At my place": { type: Boolean, default: false },
    "At client's location": { type: Boolean, default: false },
  },
  address: {
    address: { type: String, default: "" },
    street: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    zip_postal: { type: String, default: "" },
    country: { type: String, default: "" },
  },
  timings: {
    sunday: {
      type: [mongoose.Schema.Types.Mixed],
      default: [false, "00", "00", "00", "00", "am"],
    },
    monday: {
      type: [mongoose.Schema.Types.Mixed],
      default: [false, "00", "00", "00", "00", "am"],
    },
    tuesday: {
      type: [mongoose.Schema.Types.Mixed],
      default: [false, "00", "00", "00", "00", "am"],
    },
    wednesday: {
      type: [mongoose.Schema.Types.Mixed],
      default: [false, "00", "00", "00", "00", "am"],
    },
    thrusday: {
      type: [mongoose.Schema.Types.Mixed],
      default: [false, "00", "00", "00", "00", "am"],
    },
    friday: {
      type: [mongoose.Schema.Types.Mixed],
      default: [false, "00", "00", "00", "00", "am"],
    },
    saturday: {
      type: [mongoose.Schema.Types.Mixed],
      default: [false, "00", "00", "00", "00", "am"],
    },
  },

  servicesOffered: {
    type: [[String]],
    // [serviceName, hrs, mins, fees] => all string elements
    default: undefined, // No default value; the field will not be set if no data is provided
  },
  staff: {
    type: [[String]],
    // [imageurl, firstName, lastName, email, phoneNumber, position] => all string elements
    default: undefined, // No default value; the field will not be set if no data is provided
  },
});

module.exports = mongoose.model("Salon", salonSchema);
